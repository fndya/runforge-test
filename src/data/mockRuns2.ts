
import type { Run } from "../types/run";

export const mockRuns2: Run[] = [
  {
    id: "run-001",
    name: "Fix authentication bug",
    repository: "acme/backend",
    branch: "fix/auth-bug",
    status: "succeeded",
    createdAt: "2026-10-30T10:30:00Z",
    duration: 145,
    logs: ["Initializing agent...", "Analyzing authentication module...", "Found incorrect token validation", "Applying fix...", "Tests passed", "Run completed successfully"],
    result: "Authentication bug fixed successfully.",
  },
  {
    id: "run-002",
    name: "Add user dashboard",
    repository: "acme/frontend",
    branch: "feature/dashboard",
    status: "running",
    createdAt: "2026-10-30T11:15:00Z",
    logs: ["Initializing agent...", "Analyzing project structure...", "Creating dashboard components..."],
  },
  {
    id: "run-003",
    name: "Update dependencies",
    repository: "acme/backend",
    branch: "chore/dependencies",
    status: "queued",
    createdAt: "2026-10-30T11:40:00Z",
    logs: ["Waiting for available agent..."],
  }
];