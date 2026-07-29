# Mandarin Learning App

A web app for learning Mandarin by following the HSK sequence.

## Features
- Study Mandarin in HSK order
- Simple web-based interface
- Built with JavaScript, HTML, and CSS
- Sentence trainer with HSK1, HSK2, and HSK3 levels
- Expanded sentence drill bank (review variants included)
- Listening Lab with short dialogue playback and comprehension questions
- AI-assisted answer grading for listening practice (with fallback heuristic mode)

## Tech Stack
- JavaScript
- HTML
- CSS

## Getting Started
1. Clone the repository.
2. Open the project locally.
3. Run `npm run dev` and open `http://localhost:5173`.

## Listening Lab AI Grading (Optional)
- Set `OPENAI_API_KEY` in your Vercel/local environment to enable AI grading.
- Optional: set `OPENAI_MODEL` (default is `gpt-4o-mini`).
- If no API key is set, grading still works via a built-in heuristic fallback.

## Purpose
This project is designed to help me learn Mandarin more quickly by organizing study around the HSK sequence.
