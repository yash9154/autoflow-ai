# AutoFlow AI 🚀

> AI-Powered Task Prioritization using Motia Workflows

**Hackathon**: MotiaHack25 by WeMakeDevs

---

## Problem

Organizations receive tasks from multiple sources. Without proper prioritization:
- Urgent issues get delayed
- Resources are misallocated
- Response times suffer

## Solution

AutoFlow AI uses **LLM-powered intelligence** to automatically classify and route tasks based on urgency. Built on **Motia's event-driven workflow architecture**, it demonstrates:

- 🤖 **AI Agent as a Workflow Step**
- 📡 **Event-Driven Architecture**
- ⏰ **Scheduled System Audits**
- 🎯 **Explainable AI Decisions**

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          AutoFlow AI                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────────┐      │
│  │  POST /task │───▶│ ReceiveTask  │───▶│  ValidateTask     │      │
│  └─────────────┘    └──────────────┘    └───────────────────┘      │
│                            │                      │                 │
│                     task.received          task.validated          │
│                                                   │                 │
│                                                   ▼                 │
│                                      ┌────────────────────────┐    │
│                                      │   🤖 AIAgentDecision   │    │
│                                      │   (Gemini LLM)         │    │
│                                      └────────────────────────┘    │
│                                         │              │           │
│                                  task.urgent      task.normal      │
│                                         │              │           │
│                                         ▼              ▼           │
│                              ┌──────────────┐ ┌──────────────┐    │
│                              │UrgentHandler │ │NormalHandler │    │
│                              └──────────────┘ └──────────────┘    │
│                                         │              │           │
│                                         └──────┬───────┘           │
│                                          task.completed            │
│                                                │                   │
│                                                ▼                   │
│                                      ┌──────────────────┐          │
│                                      │CompletionLogger  │          │
│                                      └──────────────────┘          │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Scheduled Flow                             │  │
│  │  ┌────────────────┐    ┌─────────────────┐    ┌───────────┐  │  │
│  │  │ SystemAudit    │───▶│ SystemAudit     │───▶│  Audit    │  │  │
│  │  │ Scheduler      │    │ Handler         │    │  Logger   │  │  │
│  │  │ (*/2 * * * *)  │    └─────────────────┘    └───────────┘  │  │
│  │  └────────────────┘                                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## AI Decision Output

```json
{
  "decision": "urgent",
  "priority": "high",
  "reason": "Production database outage requires immediate attention",
  "confidence": "high",
  "keywords_detected": ["down", "production", "database"]
}
```

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd autoflow-ai
npm install --legacy-peer-deps
```

### 2. Configure Environment

```bash
# Create .env file
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
```

Get your API key: https://aistudio.google.com/apikey

### 3. Run

```bash
npx motia dev
```

### 4. Access

- **Demo UI**: http://localhost:3000
- **API**: POST http://localhost:3000/task
- **Workbench**: Check console for URL

---

## Test Commands

```bash
# Urgent task (AI detects urgency)
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"message": "Production server is down!"}'

# Normal task
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"message": "Please review the quarterly report"}'
```

---

## Steps Overview

| Step | Type | Description |
|------|------|-------------|
| ReceiveTask | API | Entry point (POST /task) |
| ValidateTask | Event | Validates task messages |
| AIAgentDecision | Event | LLM-powered priority classification |
| UrgentTaskHandler | Event | Handles high-priority tasks |
| NormalTaskHandler | Event | Handles standard tasks |
| CompletionLogger | Event | Logs final workflow result |
| SystemAuditScheduler | Cron | Scheduled system monitoring |
| SystemAuditHandler | Event | Processes audit events |

---

## Why Motia?

1. **Event-Driven**: Clean separation of concerns
2. **Unified Flows**: APIs, events, and schedules in one framework
3. **Observability**: Built-in workbench for visualization
4. **AI-Native**: LLMs as first-class workflow steps

---

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Motia
- **AI**: Google Gemini API
- **UI**: Vanilla HTML/CSS/JS

---

## License

MIT