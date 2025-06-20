# Flowstate MVP Roadmap

This document outlines the steps required to evolve the current repository into a usable minimum viable product. The focus is a drag‑and‑drop automation builder that converts natural language prompts into configurable workflows for small businesses.

## 1. Dev Environment
- Provide Docker Compose (PostgreSQL and Redis) for local setup.
- Document environment variables (`BACKEND_URL`, `DEEPSEEK_API_KEY`, `DATABASE_URL`, `JWT_SECRET`).
- Ensure `npm run lint` and backend `yarn test` pass in CI.

## 2. Backend API (`workflow-backend`)
- Persist users and workflows in PostgreSQL.
- JWT authentication endpoints (`/register`, `/login`).
- CRUD routes for workflows: create, list, read, update, delete.
- Endpoint to run a workflow and stream progress.
- Expose app metadata: list apps, actions, triggers, connections.
- Integrate connectors from `automat/packages/backend` for Shopify, Etsy, Gmail, etc.
- Unit tests for all routes.

## 3. Frontend (`src/`)
- Finalize React Flow nodes for triggers, actions, branches and transforms.
- Drag‑and‑drop sidebar with automatic connection detection.
- AI Workflow Generator node using `/api/deepseek`; handle errors gracefully.
- Pages for login, registration and onboarding.
- Views to list and open saved workflows; save edits via `/api/workflows`.
- UI to manage connected apps and credentials.
- "Run Workflow" button that shows progress from the backend.
- Real‑time collaboration on the canvas (e.g., using WebSockets or Yjs).
- Tooltips and clear error feedback for new users.

## 4. User Experience Improvements
- Expand integration catalog so common small‑business apps are covered.
- Provide starter templates and guided tutorials.
- Polish sidebar and context menus; allow editing node details in the side panel.

## 5. Deployment
- Production Docker setup for frontend and backend.
- Continuous deployment pipeline.

Completing these tasks will deliver a functional MVP that addresses the user pain points identified in interviews: eliminating manual data entry, connecting siloed apps and providing a simple way to automate processes.
