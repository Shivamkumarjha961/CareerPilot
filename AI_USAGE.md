# AI_USAGE.md

## AI Tools Used

1. ChatGPT
2. GitHub Copilot
3. Cursor AI

---

## Key Prompts Used

### Prompt 1
Create a MERN stack authentication system using JWT authentication.

### Prompt 2
Generate ATS resume analysis workflow for a placement preparation platform.

### Prompt 3
Create a responsive dashboard for tracking placement progress.

### Prompt 4
Generate backend APIs for job application tracking.

---

## AI Mistakes Identified

### Case 1

Issue:
AI generated JWT middleware with incorrect token verification logic.

How It Was Found:
Authentication failed during testing.

Fix:
Middleware was manually reviewed and corrected.

---

### Case 2

Issue:
AI generated incorrect MongoDB query for fetching user-specific jobs.

How It Was Found:
Users could see unexpected results.

Fix:
Query filters were updated and tested.

---

### Case 3

Issue:
AI generated frontend API endpoint URLs that did not match backend routes.

How It Was Found:
API requests returned 404 errors.

Fix:
Endpoints were manually verified and corrected.

---

## Human Review Process

All AI-generated code was manually reviewed, tested, and modified where necessary before integration into the final application.

The developer remained responsible for all design, implementation, testing, and deployment decisions.
