import type { Ingredient } from "./models.js";
import {
  loadIngredients,
  saveIngredients,
} from "../storage/ingredientsStorage.js";

export function createIngredientList() {
  let ingredients: Ingredient[] = loadIngredients();

  function getAll() {
    return ingredients;
  }

  function add(ingredient: Ingredient) {
    ingredients = [...ingredients, ingredient];
    saveIngredients(ingredients);
  }

  function remove(id: string) {
    ingredients = ingredients.filter((i) => i.id !== id);
    saveIngredients(ingredients);
  }

  function update(updated: Ingredient) {
    ingredients = ingredients.map((i) => (i.id === updated.id ? updated : i));
    saveIngredients(ingredients);
  }

  function clear() {
    ingredients = [];
    saveIngredients(ingredients);
  }

  return {
    getAll,
    add,
    remove,
    update,
    clear,
  };
}
