# Postmodern Neurosplop App "Vsacía"

## Specialized Agents Available

The project leverages several specialized AI agents located in `.qwen/agents/`:

1. **Frontend Expert** (`frontend-expert.md`):
   - Specializes in frontend applications with focus on reliable, clean, and testable code
   - Expertise in creating maintainable UI components and modern frontend architecture patterns
   - Implements proper testing strategies and follows best practices for frontend development

2. **Python Backend Developer** (`python-backend-dev.md`):
   - Focuses on Python backend development with database interactions
   - Emphasizes clean, testable, and reliable code solutions
   - Follows Python best practices, PEP 8 standards, and proper error handling

3. **Project Planner** (`project-planner.md`):
   - Helps plan projects and break down complex work into manageable tasks
   - Creates structured plans with clear, actionable tasks
   - Identifies risks, dependencies, and success criteria

4. **DevOps Engineer** (`devops-engineer.md`):
   - Manages infrastructure, CI/CD pipelines, and deployment processes
   - Implements Infrastructure as Code and security best practices
   - Focuses on system reliability, scalability, and automation

## Development Approach

The project follows an AI-assisted development methodology using Qwen-code's subagents to:
- Generate frontend components and architecture
- Implement backend services and APIs
- Plan project tasks and milestones
- Configure infrastructure and deployment pipelines

## Current Status

The project is in early stage with:
- README.md outlining the project concept and goals
- Agent configurations set up for different development areas
- Empty QWEN.md file (this document) to serve as comprehensive project context

## Technical Stack

Backend: FastAPI (Python 3.12) with Motor (Async MongoDB).
Frontend: Vue 3 (Vite) + Tailwind CSS + Axios.
Database: MongoDB.
Contract: OpenAPI 3.0 (must match implementation exactly).
Testing: Pytest (Backend), Vitest (Frontend), Playwright (E2E Integration).
Ops: Docker, Docker Compose, GitHub Actions.

## Functional Requirements

Backend:
* POST /void: Backend generates an datetime, saves it to Mongo incrementing counter, returns updated numbers of counter and update time.

* GET /void: Returns a JSON object: { "message": "", "count": <int>, "timestamp": <datetime>}, where count is value of counter and timestamp is its modification time.

Frontend UI:

* A "Send messate into the void" button that calls the POST route.

* A display showing the current "Count" and a last update time.

Both apps should support configuration via envirement

## Architecture

## Testing & Quality
Backend Unit: Tests must use httpx.AsyncClient and a mock/test database.

Frontend Unit: Tests must verify the UI handles the "Empty Message" string correctly without crashing.

Integration (E2E): Playwright must spin up the full environment, click the button, and verify the count increments in the UI by querying the actual backend.


Backend code linting: ruff via uvx

Frontend code linting

CI Pipeline: Must lint the OpenAPI spec against the code, lint both backend and frontend and run all test suites before allowing a Docker build.

## Docker Orchestration
Profiles: Provide a docker-compose.yml.

Persistence: Use a named volume (mongo_data) to ensure the void history is persistent across restarts.

## Suggested layout

root/
├── .qwen
│   └── agents
│       ├── devops-engineer.md
│       ├── frontend-expert.md
│       ├── project-planner.md
│       └── python-backend-dev.md
├── QWEN.md
├── README.md
├── .github/workflows/ci.yml   # CI pipeline (Test -> Build)
├── openapi.yaml               # The Source of Truth
├── docker-compose.yml         # Local orchestration (App + DB)
├── e2e/                       # Playwright integration tests
│   └── void.spec.ts
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI + Lifespan events for DB
│   │   ├── database.py        # Motor client connection
│   │   └── schemas.py         # Pydantic (VoidResponse, VoidCreate)
│   ├── tests/
│   │   └── test_api.py        # Pytest (Mocking MongoDB)
│   └── Dockerfile
└── frontend/
    ├── src/
    │   ├── App.vue            # Fetch logic & UI
    │   └── api.js             # Axios instance
    ├── tests/
    │   └── unit.spec.ts       # Vitest for component rendering
    └── Dockerfile             # Multi-stage Nginx build