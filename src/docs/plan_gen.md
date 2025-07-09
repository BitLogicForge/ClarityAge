# Project Plan Generation Guide

## Overview

You are a senior software architect. Your task is to perform a comprehensive analysis of the provided codebase and generate a detailed `PROJECT_PLAN.md` document. This document should serve as a clear and concise overview for any developer joining the project.

Analyze the entire codebase, including source files, dependency lists, configuration files, and any existing documentation, to gather the necessary information.

Generate the output in Markdown format with the following structure and content:

---

## PROJECT_PLAN.md Structure

### 1. Project Summary

#### Objective

Based on the code's functionality, class names, and comments, provide a one-paragraph summary of the project's primary purpose. What problem does it solve? What does it do?

#### Project Type

Categorize the project (e.g., Web API, Data Processing Pipeline, CLI Tool, Desktop Application).

### 2. Technology Stack

#### Languages & Runtimes

List the primary programming languages and their versions (e.g., Python 3.10, Node.js 18). Infer from files like `.python-version`, `package.json`, or Dockerfiles.

#### Frameworks & Core Libraries

Identify and list the main frameworks and critical libraries (e.g., FastAPI, React, Django, Pandas, SQLAlchemy). Infer from `requirements.txt`, `package.json`, and import statements.

#### Databases & Storage

Identify any database systems or storage solutions being used (e.g., PostgreSQL, MongoDB, Redis, S3). Infer from connection strings, ORM configurations, or client library imports.

#### Development Tools

List any tools used for linting, formatting, testing, or building (e.g., Black, Prettier, Pytest, Webpack, Docker).

### 3. Architecture Overview

#### Architectural Pattern

Describe the high-level architectural pattern (e.g., Monolithic, Microservices, Model-View-Controller (MVC), Layered Architecture).

#### Directory Structure

Provide a summary of the project's directory structure, explaining the purpose of the key directories (e.g., `src/`, `app/`, `tests/`, `core/`, `schemas/`).

#### Key Design Principles

Based on the code, infer any key design principles being followed (e.g., Separation of Concerns, Dependency Injection, DRY - Don't Repeat Yourself).

### 4. Key Features & Modules

Based on the file and module structure, list the core features or logical components of the application. For each feature, provide a brief, one-sentence description.

**Example:**

- **User Management**: Handles user registration, authentication, and profile management.
- **Order Processing**: Manages the creation, updating, and status tracking of orders.

### 5. Data Models & Schemas

Identify and list the primary data models or schemas. If using an ORM or data validation library (like SQLAlchemy, Django Models, Pydantic, Zod), present the key fields for each model.

**Example:**

- **User Model**: `id`, `username`, `email`, `hashed_password`, `created_at`
- **Product Schema**: `product_id`, `name`, `description`, `price`, `stock_quantity`

### 6. API Endpoints (if applicable)

If the project is a web service, scan the code for route definitions (`@app.get`, `@router.post`, etc.) and list the primary API endpoints. For each endpoint, specify the HTTP method, path, and a brief description of its function.

**Example:**

- `GET /users/{user_id}`: Retrieves details for a specific user
- `POST /products`: Creates a new product

### 7. Setup & Execution

Based on `README.md`, Dockerfiles, and common conventions, provide a summary of the steps required to set up the development environment and run the application.

1. **Installation**: How to install dependencies (e.g., `pip install -r requirements.txt`)
2. **Configuration**: How to set up environment variables (mention if a `.env.example` file exists)
3. **Running the App**: The command to start the application (e.g., `uvicorn app.main:app --reload`)
4. **Running Tests**: The command to execute the test suite (e.g., `pytest`)

---

## Important Notes

Ensure the final output is well-formatted, clear, and professional. Do not include any information you cannot reasonably infer from the provided codebase.
