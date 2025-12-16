# AutoFlow AI - Demo Script 🎬

> 2-3 minute hackathon demo walkthrough

---

## Opening (15 seconds)

**Say:**
> "Hi, I'm presenting AutoFlow AI - an AI-powered task prioritization system built entirely on Motia's event-driven workflow architecture."

---

## Problem Statement (20 seconds)

**Say:**
> "Every organization receives tasks from multiple sources - support tickets, alerts, requests. The challenge is: how do you automatically prioritize what's urgent vs what can wait?"

---

## Solution Demo (90 seconds)

### 1. Show the Demo UI

**Action:** Open http://localhost:3000 in browser

**Say:**
> "AutoFlow AI solves this with an LLM-powered decision agent. Let me show you."

### 2. Submit an Urgent Task

**Action:** Type: "Production server is completely down!"

**Say:**
> "I'll submit an urgent message about a server outage."

**Action:** Click Submit

### 3. Show Server Logs

**Action:** Switch to terminal with server running

**Say:**
> "Watch the workflow execute. The AI Agent analyzes the message and classifies it as URGENT with high confidence. Notice the explainable output - it tells us WHY it made that decision."

**Point out:**
- AI Decision: URGENT
- Reason explanation
- Confidence level
- Keywords detected

### 4. Submit a Normal Task

**Action:** Back to UI, type: "Please review the quarterly report"

**Say:**
> "Now let's try a regular task."

**Action:** Submit and show logs

**Say:**
> "The AI correctly classifies this as NORMAL priority. Same workflow, different routing based on AI intelligence."

---

## Architecture Highlight (30 seconds)

**Say:**
> "What makes this Motia-native is the architecture:
> - Events flow through dedicated steps
> - The AI is just another event step - not a monolith
> - We also have a scheduled audit that runs every 2 minutes
> - Everything is observable in the Motia Workbench"

**Action:** Point to the workflow visualization if visible

---

## Technical Highlights (15 seconds)

**Say:**
> "Key features:
> 1. AI decision with explainable output
> 2. Event-driven with proper separation
> 3. Fallback handling if AI fails
> 4. Scheduled system audits
> 5. Clean, polished logs for observability"

---

## Closing (10 seconds)

**Say:**
> "AutoFlow AI demonstrates that Motia isn't just for CRUD APIs - it's a powerful workflow orchestrator where AI agents are first-class citizens. Thank you!"

---

## Quick Reference

| Demo Action | What to Show |
|-------------|--------------|
| UI form | Beautiful, minimal interface |
| Urgent task | AI decision = URGENT, high confidence |
| Normal task | AI decision = NORMAL |
| Server logs | Structured, readable output |
| Scheduler | Runs every 2 min automatically |

---

## Backup Plan

If Gemini API has issues (503 overload):
- The system gracefully falls back to "normal" priority
- Mention: "The fallback handling ensures the workflow never breaks"
- Retry the request - 503 errors are temporary

---

## Key Sentences for Judges

1. "AI as a workflow step, not a monolith"
2. "Explainable AI - we show WHY, not just WHAT"
3. "Event-driven architecture with clean separation"
4. "Unified flows: APIs, events, AND schedules in one project"
5. "Built for observability with structured logging"
