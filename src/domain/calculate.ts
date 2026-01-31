import type { Ingredient, Work } from "./models";

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

export function calculateTotalCost(
  ingredients: Ingredient[],
  work: Work,
): number {
  return calculateIngredientsTotal(ingredients) + calculateWorkCost(work);
}
