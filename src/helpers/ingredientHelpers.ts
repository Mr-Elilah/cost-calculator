import type { Ingredient } from "../domain/models";
import type { IngredientCatalog } from "../domain/ingredientsCatalog";

export function addIngredient(
  list: Ingredient[],
  ingredient: Ingredient,
): Ingredient[] {
  return [...list, ingredient];
}

export function updateIngredient(
  list: Ingredient[],
  updated: Ingredient,
): Ingredient[] {
  return list.map((i) => (i.id === updated.id ? updated : i));
}

export function removeIngredient(list: Ingredient[], id: string): Ingredient[] {
  return list.filter((i) => i.id !== id);
}

export function mergeCatalogs(
  base: IngredientCatalog[],
  custom: IngredientCatalog[],
): IngredientCatalog[] {
  return [...base, ...custom];
}

export function addIngredientToCatalogIfMissing(
  customCatalog: IngredientCatalog[],
  fullCatalog: IngredientCatalog[],
  ingredient: Ingredient,
): IngredientCatalog[] {
  const exists = fullCatalog.some(
    (i) => i.name.toLowerCase() === ingredient.name.toLowerCase(),
  );

  if (exists) return customCatalog;

  return [...customCatalog, { name: ingredient.name, unit: ingredient.unit }];
}
