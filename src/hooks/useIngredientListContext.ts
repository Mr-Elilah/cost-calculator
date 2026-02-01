import { useContext } from "react";
import { IngredientListContext } from "../context/IngredientsListContext";
import type { IngredientListContextValue } from "../context/IngredientsListContext";

// Хук для использования контекста
export function useIngredientList(): IngredientListContextValue {
  const context = useContext(IngredientListContext);
  if (!context) {
    throw new Error(
      "useIngredientList must be used within an IngredientListProvider",
    );
  }
  return context;
}
