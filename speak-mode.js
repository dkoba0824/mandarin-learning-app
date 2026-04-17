'use strict';

// speak-mode.js — Azure Pronunciation Assessment wrapper
// Requires the Azure Cognitive Services Speech SDK (loaded lazily by the app).
// Requires a running /api/token endpoint (Vercel deployment or `vercel dev`).

const SpeakMode = (() => {

  // ── Support check ──────────────────────────────────────────────────────
  function isSupported() {
    return typeof window.SpeechSDK !== 'undefined' &&
           typeof navigator.mediaDevices !== 'undefined';
  }

  // ── Fetch a short-lived auth token from the Vercel proxy ──────────────
  async function _getToken() {
    const res = await fetch('/api/token');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Token request failed (HTTP ${res.status})`);
    }
    return res.json(); // { token, region }
  }

  // ── Analyse phoneme-level data for tone errors ─────────────────────────
  // Azure returns Chinese phonemes with trailing tone numbers, e.g. "i3", "ao4".
  // A low accuracy score on such a phoneme signals a likely tone error.
  function _analyzeTones(words) {
    const errors = [];
    for (const w of (words || [])) {
      for (const ph of (w.Phonemes || [])) {
        const score    = ph.PronunciationAssessment?.AccuracyScore ?? 100;
        const phoneme  = ph.Phoneme ?? '';
        const hasTone  = /[1-4]$/.test(phoneme); // ends with tone digit?
        if (hasTone && score < 60) {
          errors.push({ word: w.Word, phoneme, accuracy: score });
        }
      }
    }
    return errors;
  }

  // ── Main assessment function ───────────────────────────────────────────
  // referenceText  — the expected Chinese characters (e.g. "你好")
  // onListening    — optional callback fired once the mic is active
  //
  // Returns a Promise that resolves to:
  //   { success: true,  heard, scores: { pronunciation, accuracy, fluency, completeness }, toneErrors, rawWords }
  //   { success: false, reason: 'no_match' | 'error' | 'cancelled', heard: '' }
  async function assess(referenceText, { onListening } = {}) {
    if (!isSupported()) throw new Error('Azure Speech SDK is not loaded.');

    const { token, region } = await _getToken();

    const SDK = window.SpeechSDK;

    const speechConfig = SDK.SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'zh-CN';

    const pronConfig = new SDK.PronunciationAssessmentConfig(
      referenceText,
      SDK.PronunciationAssessmentGradingSystem.HundredMark,
      SDK.PronunciationAssessmentGranularity.Phoneme,
      true // enableMiscue — flag words not in the reference text
    );

    // Boost mic gain so quieter voices are picked up reliably.
    // getUserMedia with autoGainControl:false lets us apply our own gain.
    const rawStream = await navigator.mediaDevices.getUserMedia({
      audio: { autoGainControl: false, echoCancellation: true, noiseSuppression: true }
    });
    const audioCtx  = new AudioContext();
    const src       = audioCtx.createMediaStreamSource(rawStream);
    const gainNode  = audioCtx.createGain();
    gainNode.gain.value = 2.5;          // amplify quiet input ~2.5×
    const dest      = audioCtx.createMediaStreamDestination();
    src.connect(gainNode);
    gainNode.connect(dest);

    const audioConfig = SDK.AudioConfig.fromStreamInput(dest.stream);
    const recognizer  = new SDK.SpeechRecognizer(speechConfig, audioConfig);
    pronConfig.applyTo(recognizer);

    const _cleanup = () => {
      rawStream.getTracks().forEach(t => t.stop());
      audioCtx.close();
    };

    if (onListening) onListening();

    return new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        result => {
          recognizer.close();
          _cleanup();

          if (result.reason === SDK.ResultReason.RecognizedSpeech) {
            const pron  = SDK.PronunciationAssessmentResult.fromResult(result);
            const words = pron.detailResult?.Words ?? [];
            resolve({
              success: true,
              heard:   result.text,
              scores: {
                pronunciation: Math.round(pron.pronunciationScore),
                accuracy:      Math.round(pron.accuracyScore),
                fluency:       Math.round(pron.fluencyScore),
                completeness:  Math.round(pron.completenessScore),
              },
              toneErrors: _analyzeTones(words),
              rawWords:   words,
            });
          } else if (result.reason === SDK.ResultReason.NoMatch) {
            resolve({ success: false, reason: 'no_match', heard: '' });
          } else if (result.reason === SDK.ResultReason.Canceled) {
            const cancellation = SDK.CancellationDetails.fromResult(result);
            resolve({ success: false, reason: 'cancelled', heard: '', detail: cancellation.errorDetails });
          } else {
            resolve({ success: false, reason: 'error', heard: '' });
          }
        },
        err => {
          recognizer.close();
          _cleanup();
          reject(new Error(String(err)));
        }
      );
    });
  }

  return { isSupported, assess };
})();
