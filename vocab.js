'use strict';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TONE_MAP_V = [
  [/[āáǎà]/g, 'a'], [/[ēéěè]/g, 'e'], [/[īíǐì]/g, 'i'],
  [/[ōóǒò]/g, 'o'], [/[ūúǔù]/g, 'u'], [/[ǖǘǚǜü]/g, 'u'],
];

function normPin(str) {
  let s = str.toLowerCase();
  for (const [re, ch] of TONE_MAP_V) s = s.replace(re, ch);
  return s.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}
function normChars(str) {
  return str.replace(/[。，？！、：；""''【】《》]/g, '').trim();
}
function checkVocabMatch(input, entry) {
  const u = input.trim();
  if (!u) return null;
  if (normChars(u) === normChars(entry.word))   return 'chars';
  if (normPin(u)   === normPin(entry.pinyin))   return 'pinyin';
  return null;
}

// ─── Vocab App ────────────────────────────────────────────────────────────────
class VocabApp {
  constructor() {
    // Determine level from URL query (?level=HSK1 or ?level=HSK2)
    const params = new URLSearchParams(window.location.search);
    this.level   = params.get('level') || 'HSK1';
    this.allWords = this.level === 'HSK2' ? HSK2_VOCAB : HSK1_VOCAB;
    this.deckKey  = `${this.level}_vocab`;

    this.deck        = [];
    this.index       = 0;
    this.correct     = 0;
    this.wrong       = 0;
    this.missedCards = [];
    this.currentType = 'All';
    this.hintCount   = 0;
    this.reverseMode = false; // word → English when true
    this.speakMode   = false; // Azure pronunciation assessment mode

    this._bindElements();
    this._bindEvents();
    this._setLevelUI();
    this._buildDeck();
    this._loadCard();
  }

  // ── DOM ───────────────────────────────────────────────────────────────────
  _bindElements() {
    this.elPromptWord  = document.getElementById('prompt-word');
    this.elWordType    = document.getElementById('word-type');
    this.elInput       = document.getElementById('vocab-input');
    this.elHintText    = document.getElementById('vocab-hint');
    this.elInputPhase  = document.getElementById('vocab-input-phase');
    this.elAnswerPhase = document.getElementById('vocab-answer-phase');
    this.elYaText      = document.getElementById('vocab-ya-text');
    this.elMatchBadge  = document.getElementById('vocab-match-badge');
    this.elAnsWord     = document.getElementById('ans-word');
    this.elAnsPinyin   = document.getElementById('ans-pinyin');
    this.elProgressFill= document.getElementById('progress-fill');
    this.elProgressTxt = document.getElementById('progress-text');
    this.elScoreText   = document.getElementById('score-text');
    this.elModal       = document.getElementById('modal');
    this.elReviewBtn   = document.getElementById('review-btn');
    this.elLevelBadge  = document.getElementById('level-badge');
    this.elDrawBtn     = document.getElementById('draw-btn');
    this.elSpeakBtn    = document.getElementById('speak-btn');
    this.elReverseBtn  = document.getElementById('reverse-btn');
    this.elSpeakModeBtn = document.getElementById('speak-mode-btn');
    this.elMicRow      = document.getElementById('speak-mic-row');
    this.elMicBtn      = document.getElementById('mic-btn');
    this.elPronRow     = document.getElementById('pron-scores-row');
    this.elInputLabel  = document.querySelector('.input-label');
    this.elInputActions= document.querySelector('.input-actions');
  }

  // ── Events ────────────────────────────────────────────────────────────────
  _bindEvents() {
    document.getElementById('check-btn') .addEventListener('click', () => this._check());
    document.getElementById('hint-btn')  .addEventListener('click', () => this._hint());
    document.getElementById('skip-btn')  .addEventListener('click', () => this._skip());
    document.getElementById('got-it-btn').addEventListener('click', () => this._grade(true));
    document.getElementById('missed-btn').addEventListener('click', () => this._grade(false));
    document.getElementById('shuffle-btn').addEventListener('click', () => this._shuffle());
    document.getElementById('restart-btn').addEventListener('click', () => this._restart());
    document.getElementById('review-btn') .addEventListener('click', () => this._reviewMissed());
    document.getElementById('back-btn')   .addEventListener('click', () => { window.location.href = 'index.html'; });
    document.getElementById('draw-btn')   .addEventListener('click', () => {
      const entry = this.deck[this.index];
      if (entry) DrawModal.open(entry.word);
    });
    document.getElementById('speak-btn')  .addEventListener('click', () => {
      const entry = this.deck[this.index];
      if (entry) Audio.speakChinese(entry.word);
    });
    document.getElementById('reverse-btn').addEventListener('click', () => this._toggleReverse());
    document.getElementById('speak-mode-btn').addEventListener('click', () => this._toggleSpeakMode());
    document.getElementById('mic-btn').addEventListener('click', () => this._startListening());

    document.getElementById('type-nav').addEventListener('click', e => {
      const btn = e.target.closest('.cat-btn');
      if (btn) this._filterType(btn.dataset.type);
    });

    document.addEventListener('keydown', e => {
      const inInput = document.activeElement === this.elInput;
      if (inInput && e.key === 'Enter') { this._check(); return; }
      if (!inInput) {
        if (e.key === 'k' || e.key === 'K') this._grade(true);
        if (e.key === 'j' || e.key === 'J') this._grade(false);
        if (e.key === 'h' || e.key === 'H') this._hint();
        if (e.key === ' ')  { e.preventDefault(); this._skip(); }
      }
    });
  }

  _toggleReverse() {
    this.reverseMode = !this.reverseMode;
    this.elReverseBtn.classList.toggle('active', this.reverseMode);
    this.elReverseBtn.title = this.reverseMode ? 'Mode: Chinese → English (click to flip)' : 'Mode: English → Chinese (click to flip)';
    this._buildDeck();
    this._loadCard();
    this._updateStats();
  }

  _toggleSpeakMode() {
    if (typeof window.SpeechSDK === 'undefined') {
      this.elSpeakModeBtn.textContent = '⏳ Loading…';
      this.elSpeakModeBtn.disabled = true;
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js';
      s.onload = () => {
        this.elSpeakModeBtn.textContent = '🎙 Speak';
        this.elSpeakModeBtn.disabled = false;
        this._toggleSpeakMode();
      };
      s.onerror = () => {
        this.elSpeakModeBtn.textContent = '🎙 Speak';
        this.elSpeakModeBtn.disabled = false;
        alert('Could not load Azure Speech SDK. Check your internet connection.');
      };
      document.head.appendChild(s);
      return;
    }
    this.speakMode = !this.speakMode;
    this.elSpeakModeBtn.classList.toggle('active', this.speakMode);
    this._loadCard();
  }

  async _startListening() {
    const entry = this.deck[this.index];
    if (!entry) return;
    this.elMicBtn.textContent = '🔴 Listening…';
    this.elMicBtn.disabled = true;
    try {
      const result = await SpeakMode.assess(entry.word);
      this.elMicBtn.textContent = '🎤 Tap to Speak';
      this.elMicBtn.disabled = false;

      this.elYaText.textContent   = result.heard || '(nothing heard)';
      this.elAnsWord.textContent  = entry.word;
      this.elAnsPinyin.textContent = entry.pinyin;

      if (result.success) {
        const pct = result.scores.pronunciation;
        this.elMatchBadge.textContent = pct >= 80 ? `✓ ${pct}/100` : pct >= 55 ? `≈ ${pct}/100` : `✗ ${pct}/100`;
        this.elMatchBadge.className   = `match-badge ${pct >= 80 ? 'match' : pct >= 55 ? 'partial' : 'no-match'}`;
        this.elMatchBadge.classList.remove('hidden');

        document.getElementById('ps-pron').textContent = result.scores.pronunciation;
        document.getElementById('ps-acc').textContent  = result.scores.accuracy;
        document.getElementById('ps-flu').textContent  = result.scores.fluency;
        this.elPronRow.classList.remove('hidden');

        const tf = document.getElementById('tone-feedback');
        if (result.toneErrors.length > 0) {
          const words = [...new Set(result.toneErrors.map(e => e.word))].join('、');
          tf.textContent = `⚠ Check tones on: ${words}`;
          tf.className = 'tone-feedback tone-warn';
        } else {
          tf.textContent = '✓ Tones sound good!';
          tf.className = 'tone-feedback tone-ok';
        }
      } else {
        this.elMatchBadge.textContent = '— Nothing heard, try again';
        this.elMatchBadge.className   = 'match-badge no-match';
        this.elMatchBadge.classList.remove('hidden');
      }

      Audio.speakChinese(entry.word);
      this.elInputPhase.classList.add('hidden');
      this.elAnswerPhase.classList.remove('hidden');
      this.elSpeakBtn.classList.remove('hidden');
      this.elDrawBtn.classList.remove('hidden');
    } catch (err) {
      this.elMicBtn.textContent = '🎤 Tap to Speak';
      this.elMicBtn.disabled = false;
      alert(`Microphone error: ${err.message}`);
    }
  }

  // ── Setup ───────────────────────────────────────────────────────────────
  _setLevelUI() { ─────────────────────────────────────────────────────────────────
  _setLevelUI() {
    this.elLevelBadge.textContent = this.level;
    document.title = `${this.level} Vocab Trainer`;
    document.getElementById('page-heading').textContent = `${this.level} Vocabulary`;
    document.getElementById('page-sub').textContent =
      this.level === 'HSK2'
        ? 'Type the Chinese characters or pinyin for each English word.'
        : 'Type the Chinese characters or pinyin for each English word.';
  }

  // ── Deck ──────────────────────────────────────────────────────────────────
  _buildDeck() {
    const pool = this.currentType === 'All'
      ? this.allWords.slice()
      : this.allWords.filter(w => w.type === this.currentType);

    // SM-2: sort overdue/new cards first, future cards last
    const now     = Date.now();
    const deckKey = `${this.level}_vocab`;
    pool.sort((a, b) => {
      const da  = DB.getSM2Due(deckKey, a.word) ?? 0;
      const db_ = DB.getSM2Due(deckKey, b.word) ?? 0;
      const aFuture = da  > now;
      const bFuture = db_ > now;
      if (aFuture && !bFuture) return  1;
      if (!aFuture && bFuture) return -1;
      return da - db_;
    });

    this.deck        = pool;
    this.index       = 0;
    this.correct     = 0;
    this.wrong       = 0;
    this.missedCards = [];
  }

  _shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    this.index = 0; this.correct = 0; this.wrong = 0; this.missedCards = [];
    this._loadCard(); this._updateStats();
  }

  _filterType(type) {
    this.currentType = type;
    document.querySelectorAll('#type-nav .cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === type);
    });
    this._buildDeck();
    this._loadCard();
    this._updateStats();
  }

  // ── Card ──────────────────────────────────────────────────────────────────
  _loadCard() {
    if (this.index >= this.deck.length) { this._showResults(); return; }
    const entry = this.deck[this.index];
    this.hintCount = 0;

    if (this.reverseMode) {
      this.elPromptWord.textContent = entry.word;
      this.elPromptWord.classList.add('chinese-prompt');
      document.getElementById('vocab-input').placeholder = 'Type the English meaning…';
      document.querySelector('#vocab-input-phase .input-label').textContent = 'Type the English meaning:';
    } else {
      this.elPromptWord.textContent = entry.english;
      this.elPromptWord.classList.remove('chinese-prompt');
      document.getElementById('vocab-input').placeholder = 'e.g., nǐ hǎo  or  你好';
      document.querySelector('#vocab-input-phase .input-label').textContent = 'Type the Chinese translation — pinyin or characters:';
    }
    this.elWordType.textContent = entry.type;

    this.elInput.value = '';
    this.elHintText.classList.add('hidden');
    this.elInputPhase.classList.remove('hidden');
    this.elAnswerPhase.classList.add('hidden');
    this.elMatchBadge.classList.add('hidden');
    this.elDrawBtn.classList.add('hidden');
    this.elSpeakBtn.classList.add('hidden');

    // Speak mode vs type mode (speak mode disabled in reverse)
    const useSpeakMode = this.speakMode && !this.reverseMode;
    this.elInput.classList.toggle('hidden', useSpeakMode);
    this.elInputLabel.classList.toggle('hidden', useSpeakMode);
    this.elInputActions.classList.toggle('hidden', useSpeakMode);
    this.elMicRow.classList.toggle('hidden', !useSpeakMode);
    this.elPronRow.classList.add('hidden');

    this._updateProgress();
    if (!useSpeakMode) setTimeout(() => this.elInput.focus(), 60);
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  _check() {
    const input = this.elInput.value.trim();
    const entry = this.deck[this.index];

    this.elYaText.textContent = input || '(no answer)';

    if (this.reverseMode) {
      const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      const match = norm(input) === norm(entry.english);
      if (match) {
        this.elMatchBadge.textContent = '✓ Correct!';
        this.elMatchBadge.className   = 'match-badge match';
        this.elMatchBadge.classList.remove('hidden');
      } else if (input) {
        this.elMatchBadge.textContent = '✗ Not quite';
        this.elMatchBadge.className   = 'match-badge no-match';
        this.elMatchBadge.classList.remove('hidden');
      }
      this.elAnsWord.textContent   = entry.word;
      this.elAnsPinyin.textContent = entry.english;
    } else {
      const mt = input ? checkVocabMatch(input, entry) : null;
      if (mt) {
        this.elMatchBadge.textContent = mt === 'chars' ? '✓ Correct characters!' : '✓ Correct pinyin!';
        this.elMatchBadge.className   = 'match-badge match';
        this.elMatchBadge.classList.remove('hidden');
      } else if (input) {
        this.elMatchBadge.textContent = '✗ Not quite';
        this.elMatchBadge.className   = 'match-badge no-match';
        this.elMatchBadge.classList.remove('hidden');
      }
      this.elAnsWord.textContent   = entry.word;
      this.elAnsPinyin.textContent = entry.pinyin;
    }

    // Auto-speak the Chinese word
    Audio.speakChinese(entry.word);

    this.elInputPhase.classList.add('hidden');
    this.elAnswerPhase.classList.remove('hidden');
    this.elAnswerPhase.classList.add('slide-up');
    setTimeout(() => this.elAnswerPhase.classList.remove('slide-up'), 300);
    this.elDrawBtn.classList.remove('hidden');
    this.elSpeakBtn.classList.remove('hidden');
  }

  _hint() {
    const entry = this.deck[this.index];
    this.hintCount++;
    let msg;
    if (this.hintCount === 1) {
      msg = `💡 First character: "${entry.word[0]}"`;
    } else if (this.hintCount === 2) {
      msg = `💡 Pinyin starts with: "${entry.pinyin.split(' ')[0]}"`;
    } else {
      msg = `💡 Full pinyin: ${entry.pinyin}`;
    }
    this.elHintText.textContent = msg;
    this.elHintText.classList.remove('hidden');
  }

  _skip() {
    const entry = this.deck[this.index];
    this.deck.push(entry);
    this.wrong++;
    this.missedCards.push(entry);
    this.index++;
    this._loadCard(); this._updateStats();
  }

  _grade(gotIt) {
    if (this.elAnswerPhase.classList.contains('hidden')) return;
    const entry = this.deck[this.index];
    if (gotIt) {
      this.correct++;
      DB.recordVocab(this.level, entry.word, true);
    } else {
      this.wrong++;
      this.missedCards.push(entry);
      DB.recordVocab(this.level, entry.word, false);
    }
    DB.touchStreak();
    this.index++;
    this._updateStats();
    this._loadCard();
  }

  // ── Stats / progress ──────────────────────────────────────────────────────
  _updateProgress() {
    const total = this.deck.length;
    const pct   = total > 0 ? (this.index / total) * 100 : 0;
    this.elProgressFill.style.width = `${pct}%`;
    this.elProgressTxt.textContent  = `Word ${Math.min(this.index + 1, total)} of ${total}`;
  }

  _updateStats() {
    this.elScoreText.innerHTML = `✓ ${this.correct} &nbsp; ✗ ${this.wrong}`;
  }

  // ── Results ───────────────────────────────────────────────────────────────
  _showResults() {
    const total = this.correct + this.wrong;
    const pct   = total > 0 ? Math.round((this.correct / total) * 100) : 0;
    document.getElementById('r-correct').textContent = this.correct;
    document.getElementById('r-wrong').textContent   = this.wrong;
    document.getElementById('r-pct').textContent     = `${pct}%`;
    this.elReviewBtn.style.visibility = this.missedCards.length > 0 ? 'visible' : 'hidden';
    this.elModal.classList.remove('hidden');
  }

  _restart() {
    this._buildDeck();
    this.elModal.classList.add('hidden');
    this._loadCard(); this._updateStats(); this._updateProgress();
  }

  _reviewMissed() {
    if (!this.missedCards.length) return;
    const seen = new Set();
    this.deck = this.missedCards.filter(e => {
      if (seen.has(e.word)) return false;
      seen.add(e.word);
      return true;
    });
    this.index = 0; this.correct = 0; this.wrong = 0; this.missedCards = [];
    this.elModal.classList.add('hidden');
    this._loadCard(); this._updateStats(); this._updateProgress();
  }
}

document.addEventListener('DOMContentLoaded', () => new VocabApp());
