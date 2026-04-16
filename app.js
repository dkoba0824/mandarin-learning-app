'use strict';

// ─── Pinyin normalisation ────────────────────────────────────────────────────
// Strip tone diacritics and punctuation so we can softly compare user input
// against the stored pinyin even when tones or punctuation are omitted.
const TONE_MAP = [
  [/[āáǎà]/g, 'a'],
  [/[ēéěè]/g, 'e'],
  [/[īíǐì]/g, 'i'],
  [/[ōóǒò]/g, 'o'],
  [/[ūúǔù]/g, 'u'],
  [/[ǖǘǚǜü]/g, 'u'],
];

function normalizePinyin(str) {
  let s = str.toLowerCase();
  for (const [re, ch] of TONE_MAP) s = s.replace(re, ch);
  // Remove punctuation and collapse whitespace
  s = s.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  return s;
}

function normalizeChars(str) {
  // Strip Common CJK punctuation for comparison
  return str.replace(/[。，？！、：；""''【】《》]/g, '').trim();
}

// Returns 'pinyin' | 'chars' | null
function checkMatch(userInput, card) {
  const u = userInput.trim();
  if (!u) return null;

  // Characters match
  if (normalizeChars(u) === normalizeChars(card.characters)) return 'chars';

  // Pinyin match (with or without tones)
  if (normalizePinyin(u) === normalizePinyin(card.pinyin)) return 'pinyin';

  return null;
}

// ─── App ─────────────────────────────────────────────────────────────────────
class FlashcardApp {
  constructor() {
    this.allCards     = SENTENCES.slice(); // from data.js
    this.deck         = [];
    this.index        = 0;
    this.correct      = 0;
    this.wrong        = 0;
    this.missedCards  = [];
    this.currentCat   = 'All';
    this.currentLevel = null;
    this.hintCount    = 0; // how many times hint shown for current card
    this.reverseMode  = false; // Chinese → English when true
    this.speakMode    = false; // Azure pronunciation assessment mode

    this._bindElements();
    this._bindLevelEvents();
    this._bindEvents();
    // deck is built after the user selects a level on the level screen
  }

  // ── DOM refs ──────────────────────────────────────────────────────────────
  _bindElements() {
    this.elEnglish      = document.getElementById('english');
    this.elCardCat      = document.getElementById('card-cat');
    this.elPatternText  = document.getElementById('pattern-text');
    this.elInput        = document.getElementById('answer-input');
    this.elHintText     = document.getElementById('hint-text');
    this.elInputPhase   = document.getElementById('input-phase');
    this.elAnswerPhase  = document.getElementById('answer-phase');
    this.elYaText       = document.getElementById('ya-text');
    this.elMatchBadge   = document.getElementById('match-badge');
    this.elCorrectChars = document.getElementById('correct-chars');
    this.elCorrectPin   = document.getElementById('correct-pinyin');
    this.elProgressFill = document.getElementById('progress-fill');
    this.elProgressText = document.getElementById('progress-text');
    this.elScoreText    = document.getElementById('score-text');
    this.elModal        = document.getElementById('modal');
    this.elReviewBtn    = document.getElementById('review-btn');
    this.elLevelScreen  = document.getElementById('level-screen');
    this.elAppScreen    = document.getElementById('app-screen');
    this.elLevelBadge   = document.getElementById('level-badge');
    this.elDrawBtn      = document.getElementById('draw-btn');
    this.elSpeakBtn     = document.getElementById('speak-btn');
    this.elReverseBtn   = document.getElementById('reverse-btn');
    this.elSpeakModeBtn = document.getElementById('speak-mode-btn');
    this.elMicRow       = document.getElementById('speak-mic-row');
    this.elMicBtn       = document.getElementById('mic-btn');
    this.elPronRow      = document.getElementById('pron-scores-row');
    this.elInputLabel   = document.querySelector('.input-label');
    this.elInputActions = document.querySelector('.input-actions');
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
    document.getElementById('draw-btn')   .addEventListener('click', () => {
      const card = this.deck[this.index];
      if (card) DrawModal.open(card.characters);
    });
    document.getElementById('speak-btn')  .addEventListener('click', () => {
      const card = this.deck[this.index];
      if (card) Audio.speakChinese(card.characters);
    });
    document.getElementById('reverse-btn').addEventListener('click', () => this._toggleReverse());
    document.getElementById('speak-mode-btn').addEventListener('click', () => this._toggleSpeakMode());
    document.getElementById('mic-btn').addEventListener('click', () => this._startListening());

    // Category filter
    document.getElementById('category-nav').addEventListener('click', e => {
      const btn = e.target.closest('.cat-btn');
      if (btn) this._filterCat(btn.dataset.cat);
    });

    // Keyboard shortcuts
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
    // Lazy-load the Azure SDK on first use
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
    const card = this.deck[this.index];
    if (!card) return;
    this.elMicBtn.textContent = '🔴 Listening…';
    this.elMicBtn.disabled = true;
    try {
      const result = await SpeakMode.assess(card.characters);
      this.elMicBtn.textContent = '🎤 Tap to Speak';
      this.elMicBtn.disabled = false;

      this.elYaText.textContent       = result.heard || '(nothing heard)';
      this.elCorrectChars.textContent = card.characters;
      this.elCorrectPin.textContent   = card.pinyin;

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

      Audio.speakChinese(card.characters);
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

  // ── Level selection ───────────────────────────────────────────────────────
  _bindLevelEvents() {
    document.querySelectorAll('.lc-btn[data-level]').forEach(btn => {
      btn.addEventListener('click', () => this._selectLevel(btn.dataset.level));
    });
    document.getElementById('back-to-levels')
      .addEventListener('click', () => this._showLevelScreen());
  }

  _selectLevel(level) {
    this.currentLevel = level;
    this.currentCat   = 'All';
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === 'All');
    });
    this.elLevelBadge.textContent = level;
    this.elLevelScreen.classList.add('hidden');
    this.elAppScreen.classList.remove('hidden');
    this._buildDeck();
    this._loadCard();
    this._updateStats();
  }

  _showLevelScreen() {
    this.elModal.classList.add('hidden');
    this.elAppScreen.classList.add('hidden');
    this.elLevelScreen.classList.remove('hidden');
    this.currentLevel = null;
  }

  // ── Deck management ───────────────────────────────────────────────────────
  _buildDeck() {
    const lvl  = this.currentLevel;
    const cat  = this.currentCat;
    const pool = lvl
      ? this.allCards.filter(c => (c.level || 'HSK1') === lvl)
      : this.allCards;
    this.deck = cat === 'All' ? pool.slice() : pool.filter(c => c.category === cat);

    // SM-2: sort overdue/new cards first, future cards last
    const now     = Date.now();
    const deckKey = `${lvl}_sentences`;
    this.deck.sort((a, b) => {
      const da = DB.getSM2Due(deckKey, a.english) ?? 0;
      const db_ = DB.getSM2Due(deckKey, b.english) ?? 0;
      const aFuture = da > now;
      const bFuture = db_ > now;
      if (aFuture && !bFuture) return  1;
      if (!aFuture && bFuture) return -1;
      return da - db_;
    });

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
    this.index = 0;
    this.correct = 0;
    this.wrong   = 0;
    this.missedCards = [];
    this._loadCard();
    this._updateStats();
  }

  _filterCat(cat) {
    this.currentCat = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    this._buildDeck();
    this._loadCard();
    this._updateStats();
  }

  // ── Card rendering ────────────────────────────────────────────────────────
  _loadCard() {
    if (this.index >= this.deck.length) { this._showResults(); return; }

    const card = this.deck[this.index];
    this.hintCount = 0;

    if (this.reverseMode) {
      // Chinese → English: show characters + pinyin, answer in English
      this.elEnglish.textContent     = card.characters;
      this.elEnglish.classList.add('chinese-prompt');
      document.getElementById('prompt-pinyin').textContent = card.pinyin;
      document.getElementById('prompt-pinyin').classList.remove('hidden');
      document.getElementById('answer-input').placeholder = 'Type the English meaning…';
      document.querySelector('.input-label').textContent   = 'Type the English meaning:';
    } else {
      this.elEnglish.textContent     = card.english;
      this.elEnglish.classList.remove('chinese-prompt');
      document.getElementById('prompt-pinyin').classList.add('hidden');
      document.getElementById('answer-input').placeholder = 'e.g., Wǒ shì xuéshēng  or  我是学生';
      document.querySelector('.input-label').textContent   = 'Type the Chinese translation — pinyin or characters:';
    }
    this.elCardCat.textContent     = card.category;
    this.elPatternText.textContent = card.pattern;

    // Reset phases
    this.elInput.value = '';
    this.elHintText.classList.add('hidden');
    this.elHintText.textContent = '';
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
    const userInput = this.elInput.value.trim();
    const card = this.deck[this.index];

    this.elYaText.textContent = userInput || '(no answer)';

    if (this.reverseMode) {
      // Reverse: compare English answer (case-insensitive)
      const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      const match = norm(userInput) === norm(card.english);
      if (match) {
        this.elMatchBadge.textContent = '✓ Correct!';
        this.elMatchBadge.className   = 'match-badge match';
        this.elMatchBadge.classList.remove('hidden');
      } else if (userInput) {
        this.elMatchBadge.textContent = '✗ Not quite';
        this.elMatchBadge.className   = 'match-badge no-match';
        this.elMatchBadge.classList.remove('hidden');
      }
      // In reverse mode show both characters and English in answer box
      this.elCorrectChars.textContent = card.characters;
      this.elCorrectPin.textContent   = card.english;
    } else {
      const matchType = userInput ? checkMatch(userInput, card) : null;
      if (matchType) {
        this.elMatchBadge.textContent  = matchType === 'chars' ? '✓ Correct characters!' : '✓ Correct pinyin!';
        this.elMatchBadge.className    = 'match-badge match';
        this.elMatchBadge.classList.remove('hidden');
      } else if (userInput) {
        this.elMatchBadge.textContent  = '✗ Not quite';
        this.elMatchBadge.className    = 'match-badge no-match';
        this.elMatchBadge.classList.remove('hidden');
      }
      this.elCorrectChars.textContent = card.characters;
      this.elCorrectPin.textContent   = card.pinyin;
    }

    // Auto-speak Chinese answer
    Audio.speakChinese(card.characters);

    this.elInputPhase.classList.add('hidden');
    this.elAnswerPhase.classList.remove('hidden');
    this.elAnswerPhase.classList.add('slide-up');
    setTimeout(() => this.elAnswerPhase.classList.remove('slide-up'), 300);
    this.elDrawBtn.classList.remove('hidden');
    this.elSpeakBtn.classList.remove('hidden');
  }

  _hint() {
    const card = this.deck[this.index];
    this.hintCount++;

    let msg;
    if (this.hintCount === 1) {
      const firstChar = card.characters[0];
      const firstPin  = card.pinyin.split(' ')[0];
      msg = `💡 Starts with: "${firstChar}" (${firstPin})`;
    } else if (this.hintCount === 2) {
      // Show first half of the sentence
      const mid = Math.ceil(card.characters.length / 2);
      msg = `💡 First half: "${card.characters.slice(0, mid)}…"`;
    } else {
      msg = `💡 Full pinyin: ${card.pinyin}`;
    }

    this.elHintText.textContent = msg;
    this.elHintText.classList.remove('hidden');
  }

  _skip() {
    // Treat skip as "still learning" – put it back at the end
    const card = this.deck[this.index];
    this.deck.push(card); // re-queue
    this.wrong++;
    this.missedCards.push(card);
    this.index++;
    this._loadCard();
    this._updateStats();
  }

  _grade(gotIt) {
    // Only accept grade when we're in the answer phase
    if (this.elAnswerPhase.classList.contains('hidden')) return;

    const card = this.deck[this.index];
    if (gotIt) {
      this.correct++;
      DB.recordSentence(this.currentLevel, card.english, true);
    } else {
      this.wrong++;
      this.missedCards.push(card);
      DB.recordSentence(this.currentLevel, card.english, false);
    }
    DB.touchStreak();
    this.index++;
    this._updateStats();
    this._loadCard();
  }

  // ── Progress & stats ──────────────────────────────────────────────────────
  _updateProgress() {
    const total   = this.deck.length;
    const current = Math.min(this.index + 1, total);
    const pct     = total > 0 ? (this.index / total) * 100 : 0;
    this.elProgressFill.style.width  = `${pct}%`;
    this.elProgressText.textContent  = `Card ${current} of ${total}`;
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

    // Show "Review missed" only if there are missed cards
    this.elReviewBtn.style.visibility =
      this.missedCards.length > 0 ? 'visible' : 'hidden';

    this.elModal.classList.remove('hidden');
  }

  _restart() {
    this._buildDeck();
    this.elModal.classList.add('hidden');
    this._loadCard();
    this._updateStats();
    this._updateProgress();
  }

  _reviewMissed() {
    if (this.missedCards.length === 0) return;
    // De-duplicate (a card can appear twice if skipped then missed)
    const seen = new Set();
    this.deck = this.missedCards.filter(c => {
      if (seen.has(c.english)) return false;
      seen.add(c.english);
      return true;
    });
    this.index       = 0;
    this.correct     = 0;
    this.wrong       = 0;
    this.missedCards = [];
    this.elModal.classList.add('hidden');
    this._loadCard();
    this._updateStats();
    this._updateProgress();
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => new FlashcardApp());
