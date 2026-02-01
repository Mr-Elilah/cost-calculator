import type { IngredientName } from "./ingredientsCatalog";

export type IngredientUnit = "gram" | "piece";

export interface Ingredient {
  id: string;
  name: IngredientName;
  unit: IngredientUnit;
  amount: number;
  price: number; // price per unit
}

export interface Work {
  minutes: number;
  hourRate: number;
}

export interface CalculationState {
  ingredients: Ingredient[];
  work: Work;
}
