import { mockRuns } from "../data/mockRuns";
import type { Run } from "../types/run";

const DELAY = 800;

export function getRuns(): Promise<Run[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRuns);
    }, DELAY);
  });
}

export function getRunById(id: string): Promise<Run | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRuns.find((run) => run.id === id));
    }, DELAY);
  });
}