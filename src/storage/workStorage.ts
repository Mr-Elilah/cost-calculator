import type { Work } from "../domain/models";

const WORK_KEY = "workBlock";

const DEFAULT_WORK: Work = { minutes: 0, hourRate: 0 };

export function loadWork(): Work {
  const raw = localStorage.getItem(WORK_KEY);
  if (!raw) return DEFAULT_WORK;
  try {
    return JSON.parse(raw) as Work;
  } catch {
    return DEFAULT_WORK;
  }
}

export function saveWork(work: Work) {
  localStorage.setItem(WORK_KEY, JSON.stringify(work));
}

export function clearWork() {
  localStorage.removeItem(WORK_KEY);
}
