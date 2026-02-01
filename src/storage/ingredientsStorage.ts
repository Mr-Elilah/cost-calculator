import type { Ingredient } from "../domain/models";

const STORAGE_KEY = "ingredients";

export function loadIngredients(): Ingredient[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Ingredient[];
  } catch (error) {
    console.error("Failed to parse ingredients from localStorage:", error);
    return [];
  }
}

export function saveIngredients(ingredients: Ingredient[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
}
