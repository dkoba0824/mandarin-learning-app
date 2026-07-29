// api/grade-listening.js
// AI grading endpoint for listening comprehension answers.

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function heuristicGrade(dialogue, userAnswer) {
  const keywords = (dialogue.keywords || []).map(normalize).filter(Boolean);
  const answer = normalize(userAnswer);
  if (!keywords.length || !answer) {
    return {
      score: 30,
      feedback: 'Answer was too short or missing key points.',
      keyPointsHit: [],
      missingPoints: keywords,
      mode: 'heuristic'
    };
  }

  const keyPointsHit = keywords.filter(k => answer.includes(k));
  const ratio = keyPointsHit.length / keywords.length;
  const lengthBonus = Math.min(15, Math.floor(answer.length / 18));
  const score = Math.max(0, Math.min(100, Math.round(35 + ratio * 50 + lengthBonus)));

  const missingPoints = keywords.filter(k => !keyPointsHit.includes(k));
  const feedback = score >= 85
    ? 'Great comprehension. You captured the main ideas clearly.'
    : score >= 65
      ? 'Good understanding, but include more specific details from the dialogue.'
      : 'Partial understanding. Focus on key facts (time, place, reason, action).';

  return { score, feedback, keyPointsHit, missingPoints, mode: 'heuristic' };
}

function parseJsonFromText(text) {
  const cleaned = String(text || '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch (_err) {
        return null;
      }
    }
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });

  const { dialogue, userAnswer } = req.body || {};
  if (!dialogue || !userAnswer) {
    return res.status(400).json({ error: 'Missing dialogue or userAnswer.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const fallback = heuristicGrade(dialogue, userAnswer);
    fallback.feedback = `AI unavailable, used fallback grading. ${fallback.feedback}`;
    fallback.aiError = 'OPENAI_API_KEY is missing in this deployment environment.';
    return res.status(200).json(fallback);
  }

  const systemPrompt = [
    'You are a strict but encouraging Mandarin listening evaluator.',
    'Grade a user answer to a dialogue comprehension question.',
    'Return ONLY valid JSON:',
    '{"score": number, "feedback": string, "keyPointsHit": string[], "missingPoints": string[], "mode": "ai"}'
  ].join(' ');

  const userPrompt = {
    dialogueTurns: dialogue.turns,
    question: dialogue.question,
    expectedAnswer: dialogue.expectedAnswer,
    keyHints: dialogue.keywords,
    userAnswer
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(userPrompt) }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      const fallback = heuristicGrade(dialogue, userAnswer);
      fallback.feedback = `AI unavailable, used fallback grading. ${fallback.feedback}`;
      fallback.aiError = `OpenAI HTTP ${response.status}: ${errText.slice(0, 140)}`;
      return res.status(200).json(fallback);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const parsed = parseJsonFromText(text);

    if (!parsed || typeof parsed.score !== 'number') {
      const fallback = heuristicGrade(dialogue, userAnswer);
      fallback.feedback = `AI returned unexpected format, used fallback grading. ${fallback.feedback}`;
      return res.status(200).json(fallback);
    }

    const score = Math.max(0, Math.min(100, Math.round(parsed.score)));

    return res.status(200).json({
      score,
      feedback: parsed.feedback || 'Review key details from the dialogue and try again.',
      keyPointsHit: Array.isArray(parsed.keyPointsHit) ? parsed.keyPointsHit : [],
      missingPoints: Array.isArray(parsed.missingPoints) ? parsed.missingPoints : [],
      mode: 'ai'
    });
  } catch (err) {
    const fallback = heuristicGrade(dialogue, userAnswer);
    fallback.feedback = `AI request failed, used fallback grading. ${fallback.feedback}`;
    fallback.aiError = err.message;
    return res.status(200).json(fallback);
  }
}
