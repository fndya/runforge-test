export type RunStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed";

export interface Run {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: RunStatus;
  createdAt: string;
  duration?: number;
  logs: string[];
  result?: string;
}