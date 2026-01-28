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

The project is complete with:
- Full-featured web application deployed on Render
- Backend service running on https://dtc-ai-tool-backend.onrender.com
- Frontend service running on https://dtc-ai-tool-frontend.onrender.com
- Proper CORS configuration implemented to allow cross-origin requests
- Updated CI/CD pipeline with simplified deployment workflow
- Comprehensive documentation in README.md

## Technical Stack

Backend: FastAPI (Python 3.12) with Motor (Async MongoDB).
Frontend: Vue 3 (Vite) + Tailwind CSS + Axios.
Database: MongoDB.
Contract: OpenAPI 3.0 (must match implementation exactly).
Testing: Pytest (Backend), Vitest (Frontend), Playwright (E2E Integration).
Ops: Docker, Docker Compose, GitHub Actions, Render.

## Functional Requirements

Backend:
* POST /void: Backend generates a datetime, saves it to Mongo incrementing counter, returns updated numbers of counter and update time.
* GET /void: Returns a JSON object: { "message": "", "count": <int>, "timestamp": <datetime>}, where count is value of counter and timestamp is its modification time.
* CORS: Backend allows requests from frontend domain to prevent CORS errors.

Frontend UI:
* A "Send message into the void" button that calls the POST route.
* A display showing the current "Count" and a last update time.
* Direct API calls to the backend service instead of relative paths.

Both apps support configuration via environment variables.

## Architecture

## Testing & Quality
Backend Unit: Tests must use httpx.AsyncClient and a mock/test database.
Frontend Unit: Tests must verify the UI handles the "Empty Message" string correctly without crashing.
Integration (E2E): Playwright must spin up the full environment, click the button, and verify the count increments in the UI by querying the actual backend.

Backend code linting: ruff via uvx
Frontend code linting: ESLint

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
├── .github/workflows/manual-deploy.yml   # Manual deployment pipeline (simplified)
├── openapi.yaml               # The Source of Truth
├── docker-compose.yml         # Local orchestration (App + DB)
├── e2e/                       # Playwright integration tests
│   └── void.spec.ts
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI + Lifespan events for DB + CORS middleware
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

## Recent Updates

### Backend Updates
- Added CORS middleware to allow requests from frontend domain
- Configuration allows all origins for development flexibility

### Frontend Updates
- Updated to make direct API calls to backend service instead of relative paths
- Properly handles API responses from the backend

### Deployment Updates
- Simplified GitHub Actions workflow in manual-deploy.yml
- Removed Docker image building from deployment process
- Now directly calls Render deployment hooks
- Pipeline fails properly if curl commands fail

### Documentation Updates
- Added section describing AI agents used in the project to README.md
- Updated README with comprehensive documentation of the system