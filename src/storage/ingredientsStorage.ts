import type { Ingredient } from "../domain/models";

const INGREDIENTS_KEY = "ingredientsList";

export function loadIngredients(): Ingredient[] {
  const raw = localStorage.getItem(INGREDIENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Ingredient[];
  } catch {
    return [];
  }
}

export function saveIngredients(ingredients: Ingredient[]) {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
}

export function clearIngredients() {
    localStorage.removeItem(INGREDIENTS_KEY);
}