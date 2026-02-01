import type { IngredientCatalog } from "../domain/ingredientsCatalog";

const KEY = "ingredientsCatalog";

export function loadCatalog(): IngredientCatalog[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCatalog(items: IngredientCatalog[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
