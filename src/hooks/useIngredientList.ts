import { useState } from "react";
import { createIngredientList } from "../domain/IngredientList.js";
import type { Ingredient } from "../domain/models";

const ingredientList = createIngredientList();

export function useIngredientList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    ingredientList.getAll(),
  );

  function add(ingredient: Ingredient) {
    ingredientList.add(ingredient);
    setIngredients(ingredientList.getAll());
  }

  function remove(id: string) {
    ingredientList.remove(id);
    setIngredients(ingredientList.getAll());
  }

  function update(updated: Ingredient) {
    ingredientList.update(updated);
    setIngredients(ingredientList.getAll());
  }

  function clear() {
    ingredientList.clear();
    setIngredients([]);
  }

  return {
    ingredients,
    add,
    remove,
    update,
    clear,
  };
}
