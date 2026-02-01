import type { IngredientName, IngredientUnit } from "./models.js";

export interface IngredientCatalog {
  name: IngredientName;
  unit: IngredientUnit;
}
export const INGREDIENTS_CATALOG: IngredientCatalog[] = [
  { name: "Шоколад", unit: "gram" },
  { name: "Клубника", unit: "gram" },
  { name: "Голубика", unit: "gram" },
  { name: "Малина", unit: "gram" },
  { name: "Гранат", unit: "gram" },
  { name: "Банан", unit: "gram" },
  { name: "Орехи", unit: "gram" },
] as const;
