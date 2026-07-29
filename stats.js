'use strict';
/*  stats.js — Stats dashboard for stats.html
    Reads from DB and the globally available SENTENCES, HSK1_VOCAB, HSK2_VOCAB */

document.addEventListener('DOMContentLoaded', () => {

  // ── Data ──────────────────────────────────────────────────────────────────
  const DECKS = [
    { key: 'HSK1_sentences', label: 'HSK 1 Sentences', total: () => (window.SENTENCES || []).filter(c => (c.level || 'HSK1') === 'HSK1').length },
    { key: 'HSK2_sentences', label: 'HSK 2 Sentences', total: () => (window.SENTENCES || []).filter(c => c.level === 'HSK2').length },
    { key: 'HSK3_sentences', label: 'HSK 3 Sentences', total: () => (window.SENTENCES || []).filter(c => c.level === 'HSK3').length },
    { key: 'HSK1_vocab',     label: 'HSK 1 Vocabulary', total: () => (window.HSK1_VOCAB || []).length },
    { key: 'HSK2_vocab',     label: 'HSK 2 Vocabulary', total: () => (window.HSK2_VOCAB || []).length },
  ];

  // ── Banner ────────────────────────────────────────────────────────────────
  const { streak } = DB.getStreak();
  document.getElementById('sb-streak').textContent = streak;
  document.getElementById('sb-due').textContent    = DB.getDueCount();

  let totalMastered = 0, totalCorrect = 0, totalAnswers = 0;

  for (const d of DECKS) {
    const stats = DB.getDeckStats(d.key, d.total());
    totalMastered += stats.mastered;
    const deck = DB._rawDeck(d.key); // helper added below
    for (const c of Object.values(deck)) {
      totalCorrect  += c.correct;
      totalAnswers  += c.correct + c.wrong;
    }
  }

  document.getElementById('sb-mastered').textContent =
    totalMastered;
  document.getElementById('sb-accuracy').textContent =
    totalAnswers > 0 ? `${Math.round((totalCorrect / totalAnswers) * 100)}%` : '—';

  // ── Deck grid ─────────────────────────────────────────────────────────────
  const grid = document.getElementById('deck-grid');
  for (const d of DECKS) {
    const t     = d.total();
    const stats = DB.getDeckStats(d.key, t);
    const pct   = t > 0 ? Math.round((stats.mastered / t) * 100) : 0;
    const accTxt = stats.accuracy !== null ? `${stats.accuracy}%` : '—';

    const card = document.createElement('div');
    card.className = 'deck-card';
    card.innerHTML = `
      <div class="dc-title">${d.label}</div>
      <div class="dc-stats">
        <div class="dc-row"><span>Cards</span><b>${t}</b></div>
        <div class="dc-row"><span>Seen</span><b>${stats.seen}</b></div>
        <div class="dc-row"><span>Mastered</span><b>${stats.mastered}</b></div>
        <div class="dc-row"><span>Accuracy</span><b>${accTxt}</b></div>
      </div>
      <div class="dc-bar-wrap">
        <div class="dc-bar" style="width:${pct}%"></div>
      </div>
      <div class="dc-pct">${pct}% mastered</div>
    `;
    grid.appendChild(card);
  }

  // ── Weakest cards ─────────────────────────────────────────────────────────
  const LABEL = {
    HSK1_sentences: 'HSK1 S',
    HSK2_sentences: 'HSK2 S',
    HSK3_sentences: 'HSK3 S',
    HSK1_vocab:     'HSK1 V',
    HSK2_vocab:     'HSK2 V',
  };

  const allWeak = [];
  for (const d of DECKS) {
    DB.getWeakCards(d.key).slice(0, 30).forEach(c =>
      allWeak.push({ ...c, deckKey: d.key, deckLabel: LABEL[d.key] })
    );
  }
  // Sort globally by worst accuracy, then by streak asc
  allWeak.sort((a, b) => {
    const accA = (a.correct + a.wrong) > 0 ? a.correct / (a.correct + a.wrong) : -1;
    const accB = (b.correct + b.wrong) > 0 ? b.correct / (b.correct + b.wrong) : -1;
    return accA - accB;
  });

  const tbody   = document.getElementById('weak-tbody');
  const now     = Date.now();
  const fmtDate = ts => {
    if (!ts) return 'now';
    if (ts <= now) return 'now';
    const diff = ts - now;
    const days = Math.ceil(diff / 86400000);
    return days === 1 ? 'tomorrow' : `${days}d`;
  };

  allWeak.slice(0, 15).forEach(c => {
    const total = c.correct + c.wrong;
    const acc   = total > 0 ? `${Math.round((c.correct / total) * 100)}%` : '—';
    const tr    = document.createElement('tr');
    tr.innerHTML = `
      <td class="wt-id">${c.id}</td>
      <td><span class="wt-deck">${c.deckLabel}</span></td>
      <td class="wt-green">${c.correct}</td>
      <td class="wt-red">${c.wrong}</td>
      <td>${acc}</td>
      <td>${c.streak}</td>
      <td>${fmtDate(c.dueDate)}</td>
    `;
    tbody.appendChild(tr);
  });

  if (allWeak.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#888;padding:20px">No cards studied yet.</td></tr>';
  }

  // ── Export / Import ───────────────────────────────────────────────────────
  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([DB.export()], { type: 'application/json' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `hsk-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('import-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const ok = DB.import(ev.target.result);
      if (ok) { alert('Progress imported! Refreshing…'); location.reload(); }
      else      alert('Import failed: invalid file format.');
    };
    reader.readAsText(file);
  });

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetModal   = document.getElementById('reset-modal');
  document.getElementById('reset-btn')    .addEventListener('click', () => resetModal.classList.remove('hidden'));
  document.getElementById('reset-cancel') .addEventListener('click', () => resetModal.classList.add('hidden'));
  document.getElementById('reset-confirm').addEventListener('click', () => {
    DB.resetProgress();
    location.reload();
  });

});
