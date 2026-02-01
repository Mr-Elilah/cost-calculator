import type { Ingredient, Work } from "../domain/models";
import { createContext } from "react";
import type { IngredientCatalog } from "../domain/ingredientsCatalog";

export interface IngredientListContextValue {
  ingredients: Ingredient[];
  work: Work;
  catalog: IngredientCatalog[];

  add: (ingredient: Ingredient) => void;
  update: (ingredient: Ingredient) => void;
  remove: (id: string) => void;

  setWork: (work: Work) => void;
  clear: () => void;
}

// Только контекст — экспортируем объект, без JSX
export const IngredientListContext =
  createContext<IngredientListContextValue | null>(null);
