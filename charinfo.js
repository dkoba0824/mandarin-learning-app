'use strict';
/*  charinfo.js — hover popover for CJK characters
    Shows: meaning (Wiktionary), radical, stroke count, IDS structure,
           HSK vocab words containing the character, stroke animation (HanziWriter) */

const CharInfo = (() => {

  // ── helpers ───────────────────────────────────────────────────────────────
  const CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const IDS_OPS = new Set([...'⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻']);
  function isCJK(ch)    { return CJK_RE.test(ch); }
  function isIDSOp(ch)  { return IDS_OPS.has(ch); }

  // ── state ─────────────────────────────────────────────────────────────────
  let pop, elChar, elMeaning, elRadical, elStrokes, elComp, elWords, elSents, elLink;
  let hideTimer   = null;
  let currentChar = null;

  // ── build popover DOM once ────────────────────────────────────────────────
  function buildPopover() {
    pop = document.createElement('div');
    pop.className = 'char-pop';
    pop.innerHTML = `
      <div class="cp-head">
        <span class="cp-char" id="cp-char"></span>
        <div class="cp-head-right">
          <div class="cp-canvas" id="cp-canvas"></div>
          <button class="cp-speak-btn" id="cp-speak" title="Hear pronunciation">🔊</button>
        </div>
      </div>
      <div class="cp-body">
        <div class="cp-row"><b class="cp-k">Meaning</b><span id="cp-meaning" class="cp-v">…</span></div>
        <div class="cp-row"><b class="cp-k">Radical</b><span id="cp-radical" class="cp-v">—</span></div>
        <div class="cp-row"><b class="cp-k">Strokes</b><span id="cp-strokes" class="cp-v">—</span></div>
        <div class="cp-row"><b class="cp-k">Structure</b><span id="cp-comp" class="cp-v">—</span></div>
        <div class="cp-words-wrap">
          <b class="cp-k">HSK words</b>
          <div class="cp-words" id="cp-words"></div>
        </div>
        <div class="cp-sents-wrap">
          <b class="cp-k">Example</b>
          <div class="cp-sents" id="cp-sents"></div>
        </div>
      </div>
      <a class="cp-link" id="cp-link" target="_blank" rel="noopener noreferrer">Wiktionary →</a>
    `;
    document.body.appendChild(pop);

    elChar    = document.getElementById('cp-char');
    elMeaning = document.getElementById('cp-meaning');
    elRadical = document.getElementById('cp-radical');
    elStrokes = document.getElementById('cp-strokes');
    elComp    = document.getElementById('cp-comp');
    elWords   = document.getElementById('cp-words');
    elSents   = document.getElementById('cp-sents');
    elLink    = document.getElementById('cp-link');

    document.getElementById('cp-speak').addEventListener('click', () => {
      if (currentChar) Audio.speakChinese(currentChar);
    });

    pop.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    pop.addEventListener('mouseleave', scheduleHide);
  }

  // ── position & visibility (fixed) ────────────────────────────────────────
  const POP_W = 272, POP_H = 440;

  function position(anchorEl) {
    const r  = anchorEl.getBoundingClientRect();
    const vw = window.innerWidth;
    let left = r.left + r.width / 2 - POP_W / 2;
    left = Math.max(8, Math.min(left, vw - POP_W - 8));
    const top = r.top > POP_H + 12 ? r.top - POP_H - 8 : r.bottom + 8;
    pop.style.left = `${left}px`;
    pop.style.top  = `${top}px`;
  }

  function show(el)       { position(el); pop.classList.add('cp-show'); }
  function scheduleHide() {
    hideTimer = setTimeout(() => {
      pop.classList.remove('cp-show');
      currentChar = null;
    }, 220);
  }

  // ── HanziWriter stroke animation ──────────────────────────────────────────
  function animate(char) {
    const wrap = document.getElementById('cp-canvas');
    wrap.innerHTML = '';
    if (typeof HanziWriter === 'undefined') return;

    const div = document.createElement('div');
    div.id = `_hw_${char.codePointAt(0)}`;
    wrap.appendChild(div);

    try {
      const w = HanziWriter.create(div.id, char, {
        width: 80, height: 80, padding: 6,
        showOutline: true,
        strokeColor: '#ffffff',
        outlineColor: 'rgba(255,255,255,0.3)',
        radicalColor: '#ffd700',
        delayBetweenStrokes: 80,
        strokeAnimationSpeed: 1.2,
      });
      w.loopCharacterAnimation();
    } catch (_) { wrap.innerHTML = ''; }
  }

  // ── local: example sentences from data.js (available on sentence page) ───
  function exampleSentences(char) {
    const pool = window.SENTENCES || [];
    const out  = [];
    for (const s of pool) {
      if (s.characters && s.characters.includes(char)) {
        out.push(s);
        if (out.length >= 2) break;
      }
    }
    return out;
  }

  // ── local HSK vocab search ────────────────────────────────────────────────
  function hskWords(char) {
    const out = [], seen = new Set();
    for (const arr of [window.HSK1_VOCAB || [], window.HSK2_VOCAB || []]) {
      for (const e of arr) {
        if (e.word.includes(char) && !seen.has(e.word)) {
          seen.add(e.word);
          out.push(e);
          if (out.length >= 6) return out;
        }
      }
    }
    return out;
  }

  // ── Wiktionary data fetch + parse ─────────────────────────────────────────
  async function fetchData(char) {
    const key = `ci3_${char}`;
    const hit = sessionStorage.getItem(key);
    if (hit) return JSON.parse(hit);

    const r = { meaning: null, radical: null, strokes: null, structure: null };

    const [sRes, wRes] = await Promise.allSettled([
      fetch(`https://en.wiktionary.org/api/rest_v1/page/summary/${encodeURIComponent(char)}`),
      fetch(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(char)}&prop=wikitext&format=json&origin=*`),
    ]);

    // Meaning from REST summary
    if (sRes.status === 'fulfilled' && sRes.value.ok) {
      const d   = await sRes.value.json();
      let   txt = (d.extract || '').trim();
      // Strip leading "X (pīnyīn) —" prefix Wiktionary sometimes prepends
      txt = txt.replace(/^.{1,12}[\u0028\uff08][\w\u0101-\u01d3\u00e0-\u00fc\s]+[\u0029\uff09]\s*[\u2013\u2014\-]?\s*/i, '').trim();
      r.meaning = txt.slice(0, 180) || null;
    }

    // Radical, strokes, structure from wikitext
    if (wRes.status === 'fulfilled' && wRes.value.ok) {
      const d  = await wRes.value.json();
      const wt = d.parse?.wikitext?.['*'] || '';

      // {{Han char|rn=9|rad=人|as=05|sn=7|...|ids=⿰亻尔}}
      const radM = wt.match(/\|rad\s*=\s*([^\|\n}{]+)/);
      const snM  = wt.match(/\|sn\s*=\s*(\d+)/);
      const idsM = wt.match(/\|ids\s*=\s*([^\|\n}{]+)/);

      if (radM) r.radical = radM[1].trim();
      if (snM)  r.strokes = parseInt(snM[1], 10);

      if (idsM) {
        // Clean wikitext templates inside ids (e.g., {{…}})
        const raw = idsM[1].replace(/\{\{[^}]*\}\}/g, '').replace(/[[\]{}]/g, '').trim();
        const hasChars = [...raw].some(c => isCJK(c));
        if (hasChars) {
          r.structure = raw; // e.g., ⿰亻尔  (IDS with operators for visual display)
        }
      }

      // Fallback: Han compound template  {{Han compound|亻|尔|c1=form|c2=sound}}
      if (!r.structure) {
        const cM = wt.match(/Han compound\|([^{}]+)/);
        if (cM) {
          const comps = cM[1].split('|')
            .map(s => s.trim())
            .filter(s => s && !s.includes('=') && [...s].every(c => isCJK(c)));
          if (comps.length) r.structure = comps.join(' + ');
        }
      }
    }

    sessionStorage.setItem(key, JSON.stringify(r));
    return r;
  }

  // ── render popover content ────────────────────────────────────────────────
  async function render(char, anchorEl) {
    currentChar = char;

    // Reset display
    elChar.textContent    = char;
    elMeaning.textContent = '…';
    elRadical.textContent = '—';
    elStrokes.textContent = '—';
    elComp.textContent    = '—';
    elWords.innerHTML     = '';
    elSents.innerHTML     = '';
    elLink.href = `https://en.wiktionary.org/wiki/${encodeURIComponent(char)}#Chinese`;

    show(anchorEl);
    animate(char);

    // Instant: local HSK words
    const words = hskWords(char);
    elWords.innerHTML = words.length
      ? words.map(w =>
          `<span class="cp-word" title="${w.english}">${w.word} <em>${w.pinyin}</em></span>`
        ).join('')
      : '<span class="cp-none">—</span>';

    // Instant: example sentences from data.js (sentence trainer page only)
    const sents = exampleSentences(char);
    elSents.innerHTML = sents.length
      ? sents.map(s =>
          `<div class="cp-sent">${s.characters} <em>— ${s.english}</em></div>`
        ).join('')
      : '<span class="cp-none">—</span>';

    // Async: Wiktionary
    try {
      const d = await fetchData(char);
      if (currentChar !== char) return; // user moved to another char

      elMeaning.textContent = d.meaning   || '(no definition found)';
      elRadical.textContent = d.radical   || '—';
      elStrokes.textContent = d.strokes   || '—';
      elComp.textContent    = d.structure || '—';
    } catch (_) {
      if (currentChar === char) elMeaning.textContent = '(unavailable offline)';
    }
  }

  // ── wrap CJK chars in a .chars element with hoverable spans ──────────────
  function wrap(el) {
    const text = el.textContent;
    if (![...text].some(isCJK)) return;

    el.innerHTML = '';
    for (const ch of text) {
      if (isCJK(ch)) {
        const s = document.createElement('span');
        s.className    = 'hz';
        s.dataset.char = ch;
        s.textContent  = ch;
        s.addEventListener('mouseenter', e => {
          clearTimeout(hideTimer);
          render(ch, e.currentTarget);
        });
        s.addEventListener('mouseleave', scheduleHide);
        el.appendChild(s);
      } else {
        el.appendChild(document.createTextNode(ch));
      }
    }
  }

  // ── MutationObserver: re-wrap when app.js updates .chars text ─────────────
  function observe() {
    const obs = new MutationObserver(muts => {
      for (const m of muts) {
        const el = m.target;
        // Guard: only act on .chars elements that have plain text (no .hz yet)
        // el.textContent.trim() ensures we don't react to innerHTML='' clearing
        if (
          el.classList?.contains('chars') &&
          !el.querySelector('.hz') &&
          el.textContent.trim()
        ) {
          wrap(el);
        }
      }
    });

    document.querySelectorAll('.chars').forEach(el => {
      obs.observe(el, { childList: true });
      if (el.textContent.trim()) wrap(el); // wrap any pre-existing text
    });
  }

  // ── init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    buildPopover();
    observe();
  });

})();
