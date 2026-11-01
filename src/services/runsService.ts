import { mockRuns2 } from "../data/mockRuns2";
import type { Run } from "../types/run";

const DELAY = 800;

export function getRuns(): Promise<Run[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRuns2);
    }, DELAY);
  });
}

export function getRunById(id: string): Promise<Run | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRuns2.find((run) => run.id === id));
    }, DELAY);
  });
}