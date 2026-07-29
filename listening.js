'use strict';

class ListeningLab {
  constructor() {
    this.level = new URLSearchParams(window.location.search).get('level') || 'HSK1';
    this.pool = [];
    this.index = 0;
    this.scores = [];
    this.currentDialogue = null;

    this.elLevelBadge = document.getElementById('ll-level-badge');
    this.elProgress = document.getElementById('ll-progress');
    this.elScore = document.getElementById('ll-score');
    this.elProgressFill = document.getElementById('ll-progress-fill');
    this.elTitle = document.getElementById('ll-title');
    this.elQuestion = document.getElementById('ll-question');
    this.elStatus = document.getElementById('ll-status');
    this.elAnswer = document.getElementById('ll-answer-input');
    this.elInputPhase = document.getElementById('ll-input-phase');
    this.elResultPhase = document.getElementById('ll-result-phase');
    this.elYaText = document.getElementById('ll-ya-text');
    this.elReference = document.getElementById('ll-reference');
    this.elFeedback = document.getElementById('ll-feedback');
    this.elTranscriptBox = document.getElementById('ll-transcript-box');
    this.elTranscriptText = document.getElementById('ll-transcript-text');

    this._bindEvents();
    this._switchLevel(this.level);
  }

  _bindEvents() {
    document.getElementById('ll-level-nav').addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;
      this._switchLevel(btn.dataset.level);
    });

    document.getElementById('ll-play-btn').addEventListener('click', () => this._playCurrentDialogue());
    document.getElementById('ll-replay-btn').addEventListener('click', () => this._playCurrentDialogue());
    document.getElementById('ll-grade-btn').addEventListener('click', () => this._gradeAnswer());
    document.getElementById('ll-next-btn').addEventListener('click', () => this._nextDialogue());
    document.getElementById('ll-show-transcript-btn').addEventListener('click', () => {
      this.elTranscriptBox.classList.toggle('hidden');
    });
  }

  _switchLevel(level) {
    this.level = level;
    this.pool = LISTENING_DIALOGUES.filter(d => d.level === level);
    this.index = 0;
    this.scores = [];

    document.querySelectorAll('#ll-level-nav .cat-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.level === level);
    });

    this.elLevelBadge.textContent = level.replace('HSK', 'HSK ');
    this._loadDialogue();
  }

  _loadDialogue() {
    if (!this.pool.length) return;
    if (this.index >= this.pool.length) this.index = 0;

    this.currentDialogue = this.pool[this.index];

    this.elTitle.textContent = this.currentDialogue.title;
    this.elQuestion.textContent = this.currentDialogue.question;
    this.elAnswer.value = '';
    this.elStatus.textContent = 'Ready. Press Play to begin.';
    this.elInputPhase.classList.remove('hidden');
    this.elResultPhase.classList.add('hidden');
    this.elTranscriptBox.classList.add('hidden');

    this._updateHeader();
  }

  _updateHeader() {
    const total = this.pool.length || 1;
    const current = Math.min(this.index + 1, total);
    this.elProgress.textContent = `Dialogue ${current} of ${total}`;
    this.elProgressFill.style.width = `${((current - 1) / total) * 100}%`;

    if (this.scores.length) {
      const avg = Math.round(this.scores.reduce((a, b) => a + b, 0) / this.scores.length);
      this.elScore.textContent = `Avg: ${avg}`;
    } else {
      this.elScore.textContent = 'Avg: —';
    }
  }

  async _playCurrentDialogue() {
    if (!this.currentDialogue) return;
    window.speechSynthesis.cancel();
    this.elStatus.textContent = 'Playing dialogue...';

    try {
      for (const turn of this.currentDialogue.turns) {
        await this._speakTurn(turn);
      }
      this.elStatus.textContent = 'Playback complete. Write your answer and press AI Grade.';
    } catch (_err) {
      this.elStatus.textContent = 'Audio playback failed in this browser. You can still answer and grade.';
    }
  }

  _speakTurn(turn) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(`${turn.speaker}：${turn.zh}`);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.84;
      utterance.onend = () => setTimeout(resolve, 320);
      utterance.onerror = () => setTimeout(resolve, 320);
      window.speechSynthesis.speak(utterance);
    });
  }

  async _gradeAnswer() {
    if (!this.currentDialogue) return;

    const answer = this.elAnswer.value.trim();
    if (!answer) {
      this.elStatus.textContent = 'Please type an answer before grading.';
      return;
    }

    this.elStatus.textContent = 'AI is grading your answer...';

    try {
      const response = await fetch('/api/grade-listening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dialogue: this.currentDialogue,
          userAnswer: answer
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      this.scores.push(result.score || 0);

      this.elYaText.textContent = answer;
      this.elReference.textContent = this.currentDialogue.expectedAnswer;
      this.elFeedback.textContent = `Score: ${result.score}/100. ${result.feedback}`;
      this.elTranscriptText.textContent = this.currentDialogue.turns
        .map(t => `${t.speaker}: ${t.zh} (${t.py}) - ${t.en}`)
        .join(' | ');

      this.elInputPhase.classList.add('hidden');
      this.elResultPhase.classList.remove('hidden');
      if (result.mode === 'heuristic') {
        const reason = result.aiError ? ` Reason: ${result.aiError}` : '';
        this.elStatus.textContent = `Graded with fallback mode (set OPENAI_API_KEY for full AI grading).${reason}`;
      } else {
        this.elStatus.textContent = 'Graded with AI.';
      }
      this._updateHeader();
    } catch (err) {
      this.elStatus.textContent = `Grading failed: ${err.message}`;
    }
  }

  _nextDialogue() {
    this.index++;
    if (this.index >= this.pool.length) this.index = 0;
    this._loadDialogue();
  }
}

document.addEventListener('DOMContentLoaded', () => new ListeningLab());
