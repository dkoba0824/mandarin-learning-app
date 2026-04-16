'use strict';

/**
 * db.js  —  Lightweight data-access layer backed by localStorage.
 *
 * Designed to scale: every public method goes through this module so
 * the storage backend (localStorage → IndexedDB → REST API) can be
 * swapped in one place without touching the rest of the app.
 *
 * Schema stored under the key  "hsk_db"  as JSON:
 * {
 *   version: 2,
 *   progress: {
 *     "<level>_sentences": {          // e.g. "HSK1_sentences"
 *       "<cardId>": {
 *         correct: number,
 *         wrong:   number,
 *         streak:  number,            // consecutive correct
 *         lastSeen: ISO string | null
 *       }
 *     },
 *     "<level>_vocab": {              // e.g. "HSK1_vocab"
 *       "<word>": {
 *         correct: number,
 *         wrong:   number,
 *         streak:  number,
 *         lastSeen: ISO string | null
 *       }
 *     }
 *   },
 *   settings: {
 *     theme: "light" | "dark"         // reserved for future use
 *   }
 * }
 */

const DB_KEY     = 'hsk_db';
const DB_VERSION = 2;

// ── Internal helpers ──────────────────────────────────────────────────────────

function _load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === DB_VERSION) return parsed;
    }
  } catch (_) { /* corrupt data — reset */ }
  return _fresh();
}

function _fresh() {
  return { version: DB_VERSION, progress: {}, settings: {} };
}

function _save(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn('HSK DB: could not save to localStorage', e);
  }
}

function _ensureDeck(db, deckKey) {
  if (!db.progress[deckKey]) db.progress[deckKey] = {};
  return db.progress[deckKey];
}

function _ensureCard(deck, cardId) {
  if (!deck[cardId]) {
    deck[cardId] = {
      correct: 0, wrong: 0, streak: 0, lastSeen: null,
      repetitions: 0, easeFactor: 2.5, interval: 1, dueDate: null,
    };
  }
  // Migrate records that predate SM-2 fields
  const c = deck[cardId];
  if (c.repetitions === undefined) {
    Object.assign(c, { repetitions: 0, easeFactor: 2.5, interval: 1, dueDate: null });
  }
  return c;
}

// ── SM-2 Spaced-Repetition Algorithm ──────────────────────────────────────
//  quality: 4 = correct (got it), 1 = incorrect (still learning)
function _sm2(card, quality) {
  let { repetitions = 0, easeFactor = 2.5, interval = 1 } = card;
  if (quality >= 3) {
    if      (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else                        interval = Math.round(interval * easeFactor);
    repetitions++;
    easeFactor = Math.max(1.3,
      easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    repetitions = 0;
    interval    = 1;
  }
  return { repetitions, easeFactor, interval, dueDate: Date.now() + interval * 86400000 };
}

// ── Public API ────────────────────────────────────────────────────────────────

const DB = {

  /**
   * Record a result for a sentence card.
   * @param {string} level   - "HSK1" | "HSK2" | …
   * @param {string} cardId  - unique id for the sentence (english text used as id)
   * @param {boolean} correct
   */
  recordSentence(level, cardId, correct) {
    const db   = _load();
    const deck = _ensureDeck(db, `${level}_sentences`);
    const card = _ensureCard(deck, cardId);
    card.lastSeen = new Date().toISOString();
    if (correct) { card.correct++; card.streak++; }
    else         { card.wrong++;   card.streak = 0; }
    Object.assign(card, _sm2(card, correct ? 4 : 1));
    _save(db);
  },

  /**
   * Record a result for a vocabulary card.
   * @param {string} level   - "HSK1" | "HSK2" | …
   * @param {string} word    - the Chinese character(s) used as id
   * @param {boolean} correct
   */
  recordVocab(level, word, correct) {
    const db   = _load();
    const deck = _ensureDeck(db, `${level}_vocab`);
    const card = _ensureCard(deck, word);
    card.lastSeen = new Date().toISOString();
    if (correct) { card.correct++; card.streak++; }
    else         { card.wrong++;   card.streak = 0; }
    Object.assign(card, _sm2(card, correct ? 4 : 1));
    _save(db);
  },

  /**
   * Get progress stats for a single deck.
   * Returns: { total, seen, mastered (streak >= 3), accuracy }
   */
  getDeckStats(deckKey, totalCards) {
    const db   = _load();
    const deck = _ensureDeck(db, deckKey);
    const entries = Object.values(deck);
    const seen     = entries.length;
    const mastered = entries.filter(c => c.streak >= 3).length;
    const totalAnswers = entries.reduce((s, c) => s + c.correct + c.wrong, 0);
    const totalCorrect = entries.reduce((s, c) => s + c.correct, 0);
    return {
      total:    totalCards,
      seen,
      mastered,
      accuracy: totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : null
    };
  },

  /**
   * Get the SM-2 next-review timestamp for a card, or null if never seen.
   */
  getSM2Due(deckKey, cardId) {
    const db   = _load();
    const deck = db.progress[deckKey];
    return (deck && deck[cardId]) ? (deck[cardId].dueDate || null) : null;
  },

  /**
   * Get the raw progress record for a single card (or null if unseen).
   */
  getCard(deckKey, cardId) {
    const db   = _load();
    const deck = db.progress[deckKey];
    return deck ? (deck[cardId] || null) : null;
  },

  /** Internal: return raw deck object (for stats.js bulk reads). */
  _rawDeck(deckKey) {
    const db = _load();
    return db.progress[deckKey] || {};
  },

  /**
   * Return all cards in a deck sorted by "most in need of review":
   * wrong-heavy and stale cards come first.
   */
  getWeakCards(deckKey) {
    const db    = _load();
    const deck  = db.progress[deckKey] || {};
    return Object.entries(deck)
      .map(([id, c]) => ({ id, ...c }))
      .sort((a, b) => {
        // Lower streak = higher priority; break ties by wrong count
        if (a.streak !== b.streak) return a.streak - b.streak;
        return b.wrong - a.wrong;
      });
  },

  /** Wipe all progress (keeps settings). */
  resetProgress() {
    const db = _load();
    db.progress = {};
    _save(db);
  },

  // ── Streak & daily tracking ───────────────────────────────────────────────

  /**
   * Call once per session when the user completes at least one card.
   * Increments the daily streak (resets if >1 day since last study).
   * Returns the new streak count.
   */
  touchStreak() {
    const db      = _load();
    const today   = new Date().toDateString();
    const s       = db.settings;
    if (s.streakDate === today) return s.streak || 1; // already counted today
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (s.streakDate === yesterday) {
      s.streak = (s.streak || 1) + 1;
    } else {
      s.streak = 1; // gap in study — reset
    }
    s.streakDate = today;
    _save(db);
    return s.streak;
  },

  /** Return { streak, streakDate } */
  getStreak() {
    const db = _load();
    return { streak: db.settings.streak || 0, streakDate: db.settings.streakDate || null };
  },

  /**
   * Count cards due today (dueDate <= now) across all decks.
   * Returns a number.
   */
  getDueCount() {
    const db  = _load();
    const now = Date.now();
    let count = 0;
    for (const deck of Object.values(db.progress)) {
      for (const card of Object.values(deck)) {
        if (!card.dueDate || card.dueDate <= now) count++;
      }
    }
    return count;
  },

  /** Export a plain JSON string (for backup). */
  export() {
    return JSON.stringify(_load(), null, 2);
  },

  /** Import from a JSON string previously exported. */
  import(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && data.version && data.progress) {
        data.version = DB_VERSION; // always bring up to current version
        _save(data);
        return true;
      }
    } catch (_) {}
    return false;
  }
};
