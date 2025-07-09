# Development Awareness Guide

## 🔄 Project Onboarding & Context

### Initial Review

At the start of any new session, always review the primary planning document (e.g., `PROJECT_PLAN.md`, `ARCHITECTURE.md`) to fully grasp the project's goals, architecture, style guides, and constraints.

### Task Alignment

Before beginning work, consult the task tracking document (e.g., `TASKS.md`, `TODO.md`). If your current objective isn't listed, add it with a concise description and the current date.

### Consistency is Key

Strictly adhere to the naming conventions, file structures, and architectural patterns outlined in the project's planning documents.

### Execution Environment

Always use the project's specified environment and tooling for executing commands, running tests, and deploying builds.

## 🧱 Codebase & Modularity

### File Size

Strive to keep files focused and under a reasonable line count (e.g., 500 lines). If a file grows too large, refactor it by splitting it into smaller, more manageable modules or helper files.

### Logical Structure

Organize code into a clear and logical structure, such as grouping by feature, responsibility, or architectural layer (e.g., presentation, business logic, data access).

### Configuration Management

Manage environment variables and configuration securely. Load them from a standard configuration file (e.g., `.env`) and never hardcode sensitive information.

### Imports

Use clear and consistent import statements, following the project's established conventions (e.g., absolute vs. relative paths).

### Mindful Performance

Be mindful of performance implications. Avoid unnecessarily complex algorithms or inefficient queries. If writing performance-critical code, add comments explaining the trade-offs.

## 🧪 Testing & Reliability

### Test Creation

Always create unit tests for new features (e.g., functions, classes, API endpoints).

### Test Maintenance

After modifying any logic, review the corresponding tests to ensure they are still relevant and accurate. Update them as needed.

### Test Organization

Store tests in a dedicated directory (e.g., `/tests`, `/specs`) that mirrors the main application's structure.

### Test Coverage

For each feature, aim to include at least one test for the expected use case, one for a known edge case, and one for a potential failure case.

## 🔒 Security & Compliance

### Sanitize Inputs

Always sanitize and validate all external inputs to prevent injection attacks (e.g., SQLi, XSS).

### Secrets Management

Never commit secrets, API keys, or credentials directly into the codebase. Use the project's designated secrets management tool or environment variables.

### Dependency Audits

Before adding a new dependency, check for known vulnerabilities. Periodically run security audits on all project dependencies.

## ✅ Task Management

### Marking Completion

Immediately upon finishing a task, update its status in the task tracking document.

### New Discoveries

If new sub-tasks or necessary refactors are discovered during development, add them to the task tracking document under a "Discovered During Work" or similar section.

### The Boy Scout Rule

Leave the code cleaner than you found it. If you encounter technical debt or areas for improvement adjacent to your task, document it by creating a new task in the tracking document. Do not expand the scope of your current task without explicit instruction.

## 📎 Style & Conventions

### Language Adherence

Use the primary programming language and version specified in the project plan.

### Style Guide

Follow the established coding style guide for the project's language (e.g., PEP8 for Python, Prettier for JavaScript). Use a consistent, automated code formatter if one is configured for the project.

### Data Handling

Use the designated libraries or frameworks for data validation, serialization, and modeling.

### Function Documentation

Write clear and comprehensive documentation (e.g., docstrings, JSDoc) for all public functions, methods, and classes, explaining their purpose, parameters, and return values.

## 📚 Documentation & Explainability

### README Updates

Update the `README.md` file whenever new features are added, dependencies change, or setup instructions are modified.

### Code Clarity

Comment on any non-obvious or complex sections of code. The goal is for any mid-level developer to be able to understand the logic.

### Explain the "Why"

When implementing complex logic, add inline comments explaining the reasoning behind the approach, not just what the code is doing.

## 🧠 Core Behavioral Rules

### Clarify Ambiguity

Never assume missing context. If a task or requirement is unclear, ask clarifying questions before proceeding.

### Verify Dependencies

Never invent or hallucinate libraries, functions, or modules. Only use known, verified dependencies that are part of the project's technology stack.

### Confirm Paths

Always confirm that file paths and module names exist before referencing them in code or tests.

### Preserve Existing Code

Never delete or overwrite existing code unless it is an explicit part of a documented task (e.g., "Refactor module X," "Remove deprecated function Y").

### Log Progress & Blockers

Maintain a clear log of actions taken. If you are blocked or cannot proceed with a task for any reason, clearly state the blocker and stop work on that task until you receive clarification.
