# AI Usage Log

## Tools and Models

- **Tool:** ChatGPT
- **Model:** GPT-6
- **Purpose:** Development assistance, debugging, code review, and deployment guidance.

## AI-Assisted Tasks

AI assistance was used as a supporting tool during the development of the RunForge dashboard. The implementation decisions and final code changes were reviewed and applied by the developer.

### 1. Mock Data and Application Logic

**Prompt:**
> Help me prepare mock data for a React + TypeScript dashboard displaying AI agent runs. Include different statuses, repositories, branches, timestamps, durations, logs, and results.

**Context provided:** The assignment requirements, existing TypeScript `Run` type, and the mock service implementation.

**Result:** AI helped structure the mock data and account for different run states, including missing optional values.

### 2. Search, Filtering, and URL State

**Prompt:**
> Review my React implementation of search, status filtering, sorting, and pagination. Help me identify potential issues and persist search and filter settings in URL query parameters.

**Context provided:** The current `App.tsx` implementation, component structure, and assignment requirements.

**Result:** AI provided implementation guidance for combining search and status filters, sorting runs, resetting pagination, and synchronizing filter state with URL query parameters.

### 3. GitHub Pages Deployment

**Prompt:**
> Help me deploy my React + Vite application to GitHub Pages using GitHub Actions. Explain the required Vite base path and deployment configuration.

**Context provided:** The project's Vite setup, repository name, package scripts, and build output directory.

**Result:** AI provided guidance for configuring the Vite base path and preparing a GitHub Actions workflow for deployment.

## AI Suggestions Reviewed and Corrected

During the search input implementation, AI initially suggested adding a custom clear button without accounting for the browser's native clear button on `input[type="search"]`. This could result in two clear buttons appearing simultaneously.

The issue was identified during implementation. The native browser control was disabled using CSS, leaving only the custom clear button.

## Developer's Contribution

AI was used as an assistant rather than as an autonomous code generator. The developer was responsible for implementing the application, integrating suggestions, reviewing the resulting code, and making final technical decisions.