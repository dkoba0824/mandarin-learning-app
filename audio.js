'use strict';
/*  audio.js — Web Speech API TTS helper
    Exposes:  Audio.speak(text, lang)  — speak text in given language
              Audio.speakChinese(text) — shorthand for zh-CN
              Audio.speakEnglish(text) — shorthand for en-US
              Audio.supported         — boolean                          */

const Audio = (() => {
  const synth   = window.speechSynthesis;
  const support = !!synth;

  // Pick the best available Chinese voice, cache the result
  let zhVoice = null;
  let enVoice = null;

  function _initVoices() {
    if (!support) return;
    const voices = synth.getVoices();

    zhVoice = voices.find(v => v.lang === 'zh-CN')
           || voices.find(v => v.lang.startsWith('zh'))
           || null;

    enVoice = voices.find(v => v.lang === 'en-US')
           || voices.find(v => v.lang.startsWith('en'))
           || null;
  }

  // Voices load asynchronously in some browsers
  if (support) {
    _initVoices();
    synth.addEventListener?.('voiceschanged', _initVoices);
    // Fallback: retry once after a short delay
    setTimeout(_initVoices, 300);
  }

  function speak(text, lang = 'zh-CN') {
    if (!support || !text) return;
    synth.cancel(); // stop any ongoing speech

    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = lang;
    utt.rate   = 0.85;  // slightly slower – helps for tonal languages
    utt.pitch  = 1;
    utt.volume = 1;

    if (lang.startsWith('zh') && zhVoice) utt.voice = zhVoice;
    if (lang.startsWith('en') && enVoice) utt.voice = enVoice;

    synth.speak(utt);
  }

  function speakChinese(text) { speak(text, 'zh-CN'); }
  function speakEnglish(text) { speak(text, 'en-US'); }

  return { speak, speakChinese, speakEnglish, supported: support };
})();
