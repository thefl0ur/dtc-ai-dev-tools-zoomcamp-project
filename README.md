## Postmodern Neurosplop App "Vsacía"

### Data Talks Club [AI Dev Tools Zoomcamp 2025](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) Project

Main goal of the project is to build working web app using modern AI-tools capabilities with little to none handwork.

The _project idea_ can be stupid, and we will be 100% focused on using AI-tooling instead of manual work.

Because of that idea is simple and brilliant - build a professional, containerized web application where the frontend triggers a backend event that stores a timestamped "message from the void" in database.

**Why?**

_Why not?_

We will try to respect all [criteria](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp/tree/main/project#criteria)!

For implementation I used [QWEN-code](https://github.com/QwenLM/qwen-code) and its specialized agents, specifically using [subagents](https://qwenlm.github.io/qwen-code-docs/en/users/features/sub-agents/) for specific tasks like frontend and backend development. The project was built using AI-assisted development workflows, with detailed prompts and guidance documented in [QWEN.md](./QWEN.md) to ensure systematic implementation of all components.

Also, I configured:
* Github MCP server, but later found out it was unusable - agents don't have access to workflows and action logs, so it does not help with debugging.
* Render MCP server to help my with deploying processes.

File [QWEN.md](./QWEN.md) contains initial targets for agents, describing what and how I want to achieve. Later I fix, correct and implement using sending prompts into agents.

In the end, the only thing I wrote by hand is [this](#) file.

In general, I don't like that _vibe_ experiment - it was slow and nerve-wracking.

## Problem Description

The "Vsacía" application is a web application designed to demonstrate modern development practices using AI-assisted tools. The core functionality allows users to send messages into a "void" - essentially a timestamped record that is stored in a database. The application tracks how many messages have been sent and when the last message was sent.

The system consists of:
- A frontend interface with a button to send messages into the void
- A backend API that receives the requests and stores timestamped records
- A database that persists the count and timestamps
- Real-time display of the current count and last update time

This simple functionality demonstrates a complete web application stack with proper separation of concerns between frontend, backend, and database layers.

### Used technologies

 **Frontend**
   - Vue 3: Progressive JavaScript framework for building the user interface
   - Vite: Fast build tool and development server that provides hot module replacement
   - Tailwind CSS: Utility-first CSS framework for styling
   - Axios: Promise-based HTTP client for API communication
   - Vitest: Unit testing framework for Vue components
   - Playwright: End-to-end testing framework for integration tests

  **Frontend Implementation**

  The frontend is built with Vue 3 and follows a well-structured component-based architecture. Backend communication is handled through direct axios calls in the App component. The application includes comprehensive unit tests using Vitest that verify core functionality, with clear instructions on how to run them.

  **Key Features:**
  - Component-based architecture
  - Direct API communication using axios
  - Environment-specific configuration for development and production
  - Comprehensive unit testing with Vitest
  - Responsive UI with Tailwind CSS

  **Backend**
   - Python 3.12: Programming language for server-side logic
   - FastAPI: Modern, fast web framework for building APIs with automatic validation
   - Motor: Asynchronous MongoDB driver for Python
   - Pydantic: Data validation and parsing library
   - Uvicorn: ASGI server for running the FastAPI application
   - Pytest: Testing framework for backend API tests

  **Backend Implementation**

  The backend is built with FastAPI and follows a well-structured, modular architecture that adheres to the OpenAPI specifications. It includes comprehensive tests covering core functionality, with clear documentation on how to run them. The implementation properly integrates with the MongoDB database through the Motor driver, following asynchronous programming patterns for optimal performance.

  **Database**
   - MongoDB: NoSQL document database for storing application data
   - PyMongo/Motor: Python drivers for interacting with MongoDB

  **Database Integration**

  MongoDB serves as the persistence layer for the application, storing the count and timestamps of messages sent to the void. The Motor driver enables asynchronous operations, preventing blocking operations that could affect performance. The database configuration supports different environments through environment variables, allowing seamless transitions between development, testing, and production environments.

  **Containerization**
   - Docker: Platform for containerizing applications
   - Docker Compose: Tool for defining and running multi-container Docker applications

  **CI/CD**
   - GitHub Actions: Continuous integration and deployment platform
   - Ruff: Python linter for code quality checks
   - ESLint: JavaScript/TypeScript linter for frontend code quality
   - Swagger/OpenAPI: API specification and validation tools

  **System Architecture**

  The system follows a modern microservices architecture with clear separation of concerns:

  **Frontend Layer**
  The Vue 3 frontend serves as the presentation layer, providing a responsive user interface that
  communicates with the backend via HTTP requests. It uses Vite for fast development and build
  processes, and Tailwind CSS for consistent styling. The frontend handles user interactions and
  displays data received from the backend API.

  **Backend Layer**
  The FastAPI backend serves as the business logic layer, exposing RESTful API endpoints that the
  frontend consumes. It manages data validation, business rules, and communication with the database.
  The asynchronous nature of FastAPI and Motor allows for efficient handling of concurrent requests.

  **Database Layer**
  MongoDB serves as the persistence layer, storing application data in flexible document format. The
  Motor driver enables asynchronous operations, preventing blocking operations that could affect
  performance.

  **Containerization Layer**
  Docker containers encapsulate both the frontend and backend applications, ensuring consistent
  environments across development, testing, and production. Docker Compose orchestrates the
  multi-container setup, including the applications and the MongoDB database.

  The frontend Docker configuration uses a multi-stage build process:
  - Build stage: Compiles the Vue.js application with environment variables baked in
  - Production stage: Serves the built static files via nginx, with API requests proxied to the backend service

  This setup mirrors the production deployment on Render, where the frontend is built into static files
  and served by a web server with API proxying configured.

  **CI/CD Pipeline**
  GitHub Actions automates the entire development lifecycle:
   1. Code changes trigger automated testing (both backend and frontend)
   2. Code quality checks are performed using Ruff and ESLint
   3. OpenAPI specification validation ensures API compliance
   4. Successful tests trigger Docker image builds (backend only)
   5. Validated backend images are pushed to DockerHub
   6. Deployment to production environments is handled through deployment hooks

  The CI/CD pipeline ensures that all tests pass before deploying the application, providing continuous integration and deployment capabilities.

  Note: The frontend is deployed as a static site on Render and does not require Docker image building. The deployment is triggered via webhook to Render.

  This architecture promotes scalability, maintainability, and separation of concerns, with each
  technology chosen for its specific strengths in the overall system.

## API Documentation

The API follows the OpenAPI 3.0 specification defined in [`openapi.yaml`](./openapi.yaml).

The OpenAPI specification serves as the contract between the frontend and backend, ensuring both sides adhere to the same API interface. The CI/CD pipeline includes a validation step to ensure the specification remains compliant with the implementation.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dtc-ai-dev-tools-zoomcamp-project
   ```

2. For local development and testing, start the services:
   ```bash
   docker-compose up --build
   ```
3. The services will be available at:
   - Frontend: `http://localhost:3001` (production build served via nginx)
   - Backend API: `http://localhost:8001`
   - MongoDB: `http://localhost:27017`

4. The Docker setup uses a multi-stage approach:
   - Build stage: Compiles the Vue.js application with environment variables
   - Production stage: Serves the built application via nginx with API proxying to the backend

## Frontend Development

The frontend is built with Vue 3, Vite, and Tailwind CSS. Key features include:

- **Component Architecture**: The main application logic resides in `frontend/src/App.vue`
- **Service Layer**: API communication is handled by `frontend/src/services/voidService.js`
- **Environment Configuration**: Different configurations for development and production environments
- **Error Handling**: Comprehensive error handling for API calls and network issues
- **Testing**: Unit tests using Vitest and component testing with Vue Test Utils

### Frontend Commands

From the `frontend/` directory:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm run test:run

# Lint code
npm run lint
```

## Tests

### Frontend Tests

```bash
cd frontend
npm install
npm run test:run
```

### Backend Tests

Run backend tests with pytest:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m pytest tests/
```

## E2E Tests

Run Playwright E2E tests:

#### Prerequisites
Before running the E2E tests, ensure all project dependencies are installed:

```bash
# In the project root directory
npm install
```

#### Running the Tests

The E2E tests validate the complete application workflow including database interactions. First, start all services:

```bash
docker-compose up -d
```

Then run the tests:

```bash
npx playwright test e2e/void.spec.js
```

The integration tests cover key workflows including:
- Initial count display
- Button click functionality
- Count increment verification
- Database persistence validation

Note: The application now uses a production-like build in the Docker setup, where the frontend is built into static files and served via nginx with API requests proxied to the backend service.

## CI/CD Pipeline

CI Pipeline

  This pipeline runs automatically on:
   - Pushes to the master branch
   - Pull requests to the master branch
   - Manual triggers (workflow_dispatch)

  The pipeline has two main jobs:

  Test Job
   - Sets up Python 3.12 and Node.js 18
   - Installs backend dependencies from requirements.txt
   - Lints backend code using Ruff
   - Runs backend tests with pytest
   - Installs frontend dependencies and linting tools
   - Lints frontend code using ESLint
   - Runs frontend unit tests with Vitest
   - Validates the OpenAPI specification

  Build Job
   - Runs only after the test job succeeds
   - Sets up Docker Buildx
   - Logs into DockerHub using stored secrets
   - Builds and pushes Docker images for both backend and frontend
   - Tags images as 'latest' and with SHA prefixes

  Manual Deployment Pipeline

  This pipeline runs only when manually triggered and offers the following functionality:

  Deployment Options
   - Option to deploy backend service (boolean)
   - Option to deploy frontend service (boolean)
   - Input for backend API URL that frontend will connect to
   - Optional custom Docker image tag

  Deployment Process
   - Builds and pushes Docker images to DockerHub (for backend only, conditionally based on user input)
   - Makes HTTP POST requests to Render deployment hooks (for both backend and frontend, conditionally)
   - Provides a summary of the deployment actions taken

  Both pipelines use Docker for containerization and require credentials stored as GitHub Secrets for
  DockerHub login and Render deployment hooks. The CI pipeline ensures code quality before allowing
  builds, while the manual deployment pipeline gives fine-grained control over production deployments.

## Frontend Deployment

The frontend is configured for deployment as a static site on Render. The deployment configuration is defined in `render.yaml`:

- The build process installs dependencies and runs `npm run build`
- The output is published from the `dist` directory
- A rewrite rule is configured to handle client-side routing
- Environment variables can be configured as needed

To deploy manually:
1. Connect your GitHub/GitLab repository to Render
2. Select the `render.yaml` file for configuration
3. Set any required environment variables
4. Deploy the service.

## Reproducibility

The project provides complete instructions for setting up, running, testing, and deploying the system end-to-end:

1. **Setup**: Complete instructions for cloning and building the project
2. **Development**: Docker Compose configuration for local development with hot reloading
3. **Testing**: Separate instructions for running backend, frontend, and E2E tests
4. **Deployment**: CI/CD pipeline that automates testing, building, and deployment
5. **Documentation**: Comprehensive README covering all aspects of the system

All components are containerized with Docker, ensuring consistent environments across development, testing, and production.