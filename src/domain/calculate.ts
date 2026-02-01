import type { Ingredient, Work } from "./models";

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateIngredientCost(ingredient: Ingredient): number {
  if (ingredient.unit === "gram") {
    return (ingredient.price / 1000) * ingredient.amount;
  }

  return ingredient.price * ingredient.amount;
}

export function calculateIngredientsTotal(ingredients: Ingredient[]): number {
  return ingredients.reduce((sum, ingredient) => {
    return sum + calculateIngredientCost(ingredient);
  }, 0);
}

export function calculateWorkCost(work: Work): number {
  return (work.hourRate / 60) * work.minutes;
}

export interface CostBreakdown {
  ingredients: number;
  work: number;
  total: number;
}

export function calculateCostBreakdown(
  ingredients: Ingredient[],
  work: Work,
): CostBreakdown {
  const ingredientsTotal = calculateIngredientsTotal(ingredients);
  const workCost = calculateWorkCost(work);

  return {
    ingredients: roundMoney(ingredientsTotal),
    work: roundMoney(workCost),
    total: roundMoney(ingredientsTotal + workCost),
  };
}

export function calculateTotalCost(
  ingredients: Ingredient[],
  work: Work,
): number {
  return calculateCostBreakdown(ingredients, work).total;
}
