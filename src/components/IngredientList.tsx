import { useState } from "react";
import type { Ingredient } from "../domain/models";
import {
  loadIngredients,
  saveIngredients,
} from "../storage/ingredientsStorage";
import IngredientRow from "./IngredientRow";
import { AddIngredientForm } from "./AddIngredientForm";

export function IngredientList() {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(loadIngredients());

  function sync(next: Ingredient[]) {
    setIngredients(next);
    saveIngredients(next);
  }

  function addIngredient(ingredient: Ingredient) {
    sync([...ingredients, ingredient]);
  }

  function updateIngredient(updated: Ingredient) {
    sync(ingredients.map((i) => (i.id === updated.id ? updated : i)));
  }

  function removeIngredient(id: string) {
    sync(ingredients.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-4">
      <AddIngredientForm onAdd={addIngredient} />

      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient.id}
            ingredient={ingredient}
            onChange={updateIngredient}
            onDelete={removeIngredient}
          />
        ))}
      </div>
    </div>
  );
}
