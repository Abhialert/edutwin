# EduTwin Interactive Demo

A single-page React + Tailwind CSS demo for EduTwin, an AI-powered education platform that creates a digital twin for every student.

## What is Included

- Separate Student Portal and Teacher Portal navigation
- Student Portal with profile, mastery ring, clickable knowledge graph nodes, career readiness, and AI tutor
- Teacher Portal with class stats, AI cohorts, intervention center, cohort action toast notifications, and student explorer
- Career Readiness with animated Role Readiness Index, skill gaps, role matches, and market sync banner
- AI Tutor chat UI with Anthropic `/v1/messages` integration and graceful fallback behavior

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal. The editable Vite entry is `index.source.html`.

## GitHub Pages

This repo is compatible with GitHub Pages set to deploy from `main` / repository root. `npm run build` creates the Vite production bundle and copies the static `index.html` plus `assets/` into the root so `https://abhialert.github.io/edutwin/` can serve it directly.

## AI Tutor API

The AI Tutor tab can run without an API key using its fallback response. For live Claude replies, paste an Anthropic API key into the optional key field in the chat panel.

The demo calls:

- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-6`

Browser-only API calls may be blocked by CORS or organization settings in some environments. In production, proxy this request through a small backend or serverless function so the API key is never exposed in the browser.
