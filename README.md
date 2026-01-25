## Postmodern Neurosplop App "Vsacía"

### Data Talks Club [AI Dev Tools Zoomcamp 2025](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) Project

Main goal of the project is to build working web app using modern AI-tools capabilities with little to none handwork.

The _project idea_ can be stupid, and we will be 100% focused on using AI-tooling instead of manual work.

Because of that idea is simple and brilliant - build a professional, containerized web application where the frontend triggers a backend event that stores a timestamped "message from the void" in database.

**Why?**

_Why not?_

We will try to respect all [criterias](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp/tree/main/project#criteria)!

For implimentation I will use [QWEN-code](https://github.com/QwenLM/qwen-code) and its agents, specifically using pregenerated [subagents](https://qwenlm.github.io/qwen-code-docs/en/users/features/sub-agents/).

Also, I configure Github MCP server, but later find out it unusable - agent fon't have access to workflows and action logs, so it does not help with debug.

### Used technologies

Backend: FastAPI (Python 3.11+) with Motor (Async MongoDB).
Frontend: Vue 3 (Vite) + Tailwind CSS + Axios.
Database: MongoDB.
Contract: OpenAPI 3.0 (must match implementation exactly).
Testing: Pytest (Backend), Vitest (Frontend), Playwright (E2E Integration).
Ops: Docker, Docker Compose, GitHub Actions.

#### Frontend

#### Backend

#### Infrastructure

#### CI/CD

### Instructions