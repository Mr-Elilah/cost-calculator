import type { CalculationState } from "../domain/models";

const STORAGE_KEY = "cost-calculator-state";

export function saveState(state: CalculationState): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
}

export function loadState(): CalculationState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized) as CalculationState;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return null;
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
