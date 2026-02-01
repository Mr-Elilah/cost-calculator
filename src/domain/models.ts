export type IngredientUnit = "gram" | "piece";

export type IngredientName =
  | "Шоколад"
  | "Клубника"
  | "Голубика"
  | "Малина"
  | "Гранат"
  | "Банан"
  | "Орехи";

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
