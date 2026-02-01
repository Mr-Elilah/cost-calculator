export const INGREDIENT_CATALOG = [
  "Шоколад",
  "Клубника",
  "Голубика",
  "Малина",
  "Гранат",
  "Банан",
  "Орехи",
] as const;

export type IngredientName = (typeof INGREDIENT_CATALOG)[number];
