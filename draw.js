'use strict';
/*  draw.js — HanziWriter stroke-order quiz modal
    Shared by index.html and vocab.html.
    Exposes:  DrawModal.open(charString)  — launch quiz for every CJK char in charString
              DrawModal.close()           — close the modal programmatically          */

const DrawModal = (() => {

  const CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf]/;

  // ── local state ──────────────────────────────────────────────────────────
  let modal, elTitle, elCanvas, elStatus, elPrev, elNext, elClose;
  let chars        = [];
  let charIndex    = 0;
  let activeWriter = null;

  // ── wire DOM (called once on DOMContentLoaded) ────────────────────────────
  function buildModal() {
    modal    = document.getElementById('draw-modal');
    elTitle  = document.getElementById('draw-title');
    elCanvas = document.getElementById('draw-canvas');
    elStatus = document.getElementById('draw-status');
    elPrev   = document.getElementById('draw-prev');
    elNext   = document.getElementById('draw-next');
    elClose  = document.getElementById('draw-close');

    elClose.addEventListener('click', close);
    modal  .addEventListener('click', e => { if (e.target === modal) close(); });
    elPrev .addEventListener('click', () => { if (charIndex > 0)              { charIndex--; _startChar(); } });
    elNext .addEventListener('click', () => { if (charIndex < chars.length - 1) { charIndex++; _startChar(); } });

    document.addEventListener('keydown', e => {
      if (modal && !modal.classList.contains('hidden') && e.key === 'Escape') close();
    });
  }

  // ── public: open ─────────────────────────────────────────────────────────
  function open(charString) {
    chars = [...charString].filter(ch => CJK_RE.test(ch));
    if (!chars.length) return;
    charIndex = 0;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    _startChar();
  }

  // ── public: close ─────────────────────────────────────────────────────────
  function close() {
    activeWriter = null;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    elCanvas.innerHTML    = '';
    elStatus.textContent  = '';
    elStatus.className    = 'draw-status';
  }

  // ── internal: render one character quiz ──────────────────────────────────
  function _startChar() {
    elCanvas.innerHTML   = '';
    elStatus.textContent = '';
    elStatus.className   = 'draw-status';

    const char = chars[charIndex];
    elTitle.innerHTML =
      `Draw: <span class="draw-char-big">${char}</span>` +
      ` <span class="draw-counter">${charIndex + 1}\u202f/\u202f${chars.length}</span>`;

    elPrev.disabled    = charIndex === 0;
    elNext.disabled    = charIndex >= chars.length - 1;
    elNext.textContent = charIndex < chars.length - 1
      ? `${chars[charIndex + 1]} \u2192`
      : 'Done';

    // HanziWriter canvas div
    const wrap = document.createElement('div');
    wrap.id = '_draw_hw_canvas';
    elCanvas.appendChild(wrap);

    try {
      if (typeof HanziWriter === 'undefined') throw new Error('HanziWriter not loaded');

      activeWriter = HanziWriter.create('_draw_hw_canvas', char, {
        width:        280,
        height:       280,
        padding:      22,
        showOutline:  true,
        strokeColor:  '#2c2c2c',
        outlineColor: '#d0d0d0',
        drawingColor: '#c0392b',
        drawingWidth: 5,
      });

      let mistakes = 0;

      activeWriter.quiz({
        leniency: 1.2,
        onMistake() {
          mistakes++;
          elStatus.textContent = `\u2717 Wrong stroke\u2009\u2014\u2009${mistakes} mistake${mistakes !== 1 ? 's' : ''} so far`;
          elStatus.className   = 'draw-status miss';
        },
        onCorrectStroke() {
          elStatus.textContent = '\u2713 Correct stroke!';
          elStatus.className   = 'draw-status hit';
        },
        onComplete(summary) {
          const m = summary.totalMistakes;
          elStatus.innerHTML = m === 0
            ? '\uD83C\uDF89 Perfect \u2014 no mistakes!'
            : `\u2713 Done! ${m} mistake${m !== 1 ? 's' : ''}`;
          elStatus.className = 'draw-status done';
          // Auto-advance to next character after 1.4 s
          if (charIndex < chars.length - 1) {
            setTimeout(() => { charIndex++; _startChar(); }, 1400);
          }
        },
      });

    } catch (_) {
      elStatus.textContent = 'Stroke data unavailable for this character.';
      elStatus.className   = 'draw-status miss';
    }
  }

  document.addEventListener('DOMContentLoaded', buildModal);

  return { open, close };

})();
