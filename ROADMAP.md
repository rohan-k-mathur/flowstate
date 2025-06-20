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

## Expanded Roadmap

### 1. Objectives & Success Criteria
| Objective | Success Metric (MVP) |
| --- | --- |
| Demonstrate that non-technical small-business owners can build and run at least one useful automation in their first session | ≥ 75% of pilot users complete onboarding task unaided; SUS ≥ 70 |
| Validate willingness to pay for streamlined automation | ≥ 50% of pilot users indicate intent to pay in post-test survey |
| Prove technical reliability of workflow execution | 95%+ scheduled runs succeed over 2-week pilot |
| Generate actionable product feedback | ≥ 20 prioritized issues/insights logged from pilot |

### 2. Scope Guardrails
| In | Out (post-MVP) |
| --- | --- |
| Single-workspace SaaS (no multi-tenant org hierarchy) | White-label / on-prem |
| OAuth + API-key integrations for Shopify, Etsy, Amazon MWS, QuickBooks, Gmail, Mailchimp, Google Sheets | ERP integrations, custom SQL, RPA |
| 1-step approval & dry-run modes | Multi-stage approvals, audit export |
| Basic collaboration (comment & view/edit share link) | Real-time multiplayer cursors |
| Usage-based freemium billing | Marketplace revenue share |

### 3. Feature Epics, Stories & Acceptance Criteria
#### EPIC A — Authentication & Account
- **Story A1 – Email/Password Sign-up**
  - *AC:* Email verified; tokens via JWT; reset flow.
- **Story A2 – OAuth Provider Login (Google)**
  - *AC:* One-click Google Sign-In; duplicates merge.

#### EPIC B — Integration Layer
- **Story B1 – OAuth Connection Wizard**
  - *AC:* Connect Shopify in <2 min; token stored encrypted; test API call succeeds.
- **Story B2 – Generic REST Connector (beta)**
  - *AC:* User enters base URL, headers, JSON body; send test request; parse response for later nodes.

#### EPIC C — AI Prompt-to-Workflow
- **Story C1 – Prompt Box + Parsing Service**
  - *AC:* User enters >50 characters; service returns JSON schema (nodes, edges); 90% of happy-path prompts parsed without error.
- **Story C2 – Post-Generation Explainer**
  - *AC:* After generation, side panel lists each node in plain English.

#### EPIC D — Visual Node Editor
- **Story D1 – Drag, Pan, Zoom Canvas**
  - *AC:* 60 fps interactions, keyboard shortcuts (⌘+Z undo).
- **Story D2 – Node Types v1**
  - *AC:* Trigger, Action, Condition, Delay nodes with distinct shape/icon/color and connection validation logic.
- **Story D3 – Branching & Loops**
  - *AC:* Condition node outputs Yes/No edges; For-Each loops over list.
- **Story D4 – Auto-Layout & Snap**
  - *AC:* Button rearranges nodes with non-overlapping layout (<500 ms for 30 nodes).

#### EPIC E — Execution Engine
- **Story E1 – Event Listener & Scheduler**
  - *AC:* Webhook receiver (triggers), cron-like schedule; store payload.
- **Story E2 – Runtime Orchestrator**
  - *AC:* Executes DAG; retries 3× with exponential backoff; writes status to DB.
- **Story E3 – Log Console & Node Status**
  - *AC:* UI shows running, success, fail; collapsible JSON log per node.

#### EPIC F — Template Library
- **Story F1 – Gallery of 10 Prebuilt Workflows**
  - *AC:* Filter by "Inventory", "Marketing", "Finance"; 1-click import.

#### EPIC G — Collaboration Lite
- **Story G1 – Share-link with View/Edit Toggle**
  - *AC:* Generate unique URL; roles enforced in backend ACL.
- **Story G2 – Comment Pins**
  - *AC:* User can pin a comment on a node; email notification to owner.

#### EPIC H — Onboarding & Help
- **Story H1 – First-Run Checklist**
  - *AC:* Stepper (Connect app ➜ Create first workflow ➜ Test run).
- **Story H2 – In-Product Tooltips & Docs**
  - *AC:* Hover info for every node field; "Learn more" links to markdown docs site.

#### EPIC I — Billing & Plan Limits
- **Story I1 – Stripe Checkout (Card)**
  - *AC:* Monthly "Starter" plan (5 active workflows, 1 000 runs) and Free (1 workflow).
- **Story I2 – Usage Metering**
  - *AC:* Count every node execution, store daily totals; stop runs at limit, notify user.

#### EPIC J — Analytics & Instrumentation
- **Story J1 – Event Tracking**
  - *AC:* Fire Segment events for sign-up, integration added, run success/fail.
- **Story J2 – Admin Dashboard**
  - *AC:* Cohort retention, MAU, workflow error rate displayed with auto-refresh.

### 4. Technical & Dev-Ops Tasks
| Area | Key Tasks |
| --- | --- |
| Backend | Node.js service mesh; workflow engine in TypeScript (temporal.io or BullMQ); PostgreSQL; Redis cache |
| AI Service | OpenAI function-calling or Llama server; prompt schema + moderation |
| Integrations | Build using open-source SDKs where possible; secrets in AWS Secrets Manager |
| Infra / CI-CD | Docker images; GitHub Actions; deploy to AWS ECS Fargate; blue-green; infrastructure-as-code (Terraform) |
| Security | SOC-2 prep checklist; HTTPS everywhere; least-privilege IAM |
| Observability | CloudWatch + Grafana dashboards; alerting on latency > 2 s, error > 2 % |

### 5. Phased Timeline (Hypothetical 14-Week Plan)
| Sprint | Focus | Major Deliverables |
| --- | --- | --- |
| 0 (prep) | Set-up | Repo, CI, infra scaffold, design system |
| 1–2 | Auth & Connectors | Email/Google login; Shopify + Etsy OAuth; generic REST beta |
| 3–4 | Editor Core | Canvas, node CRUD, auto-layout; Trigger + Action nodes |
| 5–6 | AI Prompt v1 | Prompt API, basic parser, explain panel |
| 7–8 | Runtime & Logs | Event listener, executor, log console |
| 9 | Templates & Onboarding | 10 gallery flows; first-run checklist |
| 10 | Billing | Stripe checkout, usage metering |
| 11 | Collaboration Lite | Share-link, comments |
| 12 | QA Hardening | Security pass, perf tests, bug bash |
| 13 | Pilot Launch | Recruit 15 users, support channel, analytics |
| 14 | Debrief & Iterate | Collect metrics; prioritize v1.1 backlog |

### 6. QA & Acceptance Strategy
- Unit tests: ≥ 70% coverage on workflow engine, AI parser.
- Integration tests: Mock API for each connector; run nightly.
- End-to-end: Cypress covering sign-up ➜ build template ➜ run success.
- Load test: 10× expected pilot volume (5 000 node runs/day).
- Security review: OWASP top-10 checklist; dependency scanning.

### 7. Pilot Testing Plan
- Recruit 12–15 SMB owners via UserInterviews quotas.
- Tasks: Connect store → build “New Order ➜ Update Inventory + Email” workflow → run live on sandbox data.
- Data capture: SUS survey, NPS, time-to-task, run success, logs.
- Duration: 2-week usage, async feedback channel.
- Exit interview: Prioritize P0/P1 issues, evaluate feature gaps.

### 8. Exit Criteria for MVP → Public Beta
- ≥ 75% pilot participants complete core workflow without live support.
- Workflow engine uptime ≥ 99% with < 3% failure rate.
- NPS ≥ +30 and ≥ 50% willingness to pay.
- Security audit with no high-severity findings.
- All P0 / critical bugs resolved.

This roadmap decomposes Flowstate’s MVP into clear epics, user stories, acceptance criteria, technical tasks, and a sprint-by-sprint outline that teams can load directly into Jira/Linear.
