import { useEffect, useState, type FC, type ReactNode } from "react";
import { IngredientListContext } from "../context/IngredientsListContext";
import type { Ingredient, Work } from "../domain/models";
import { useCatalog } from "../hooks/useCatalog";
import {
  addIngredient,
  updateIngredient,
  removeIngredient,
} from "../helpers/ingredientHelpers";
import {
  loadIngredients,
  saveIngredients,
  clearIngredients,
} from "../storage/ingredientsStorage";
import { loadWork, saveWork, clearWork } from "../storage/workStorage";
interface ProviderProps {
  children: ReactNode;
}

export const IngredientListProvider: FC<ProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(loadIngredients);

  const [work, setWork] = useState<Work>(loadWork);

  const { catalog, addCustomIngredient } = useCatalog();
  
  // ---------------- persistence ----------------

  useEffect(() => {
    saveIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    saveWork(work);
  }, [work]);

  // ---------------- actions ----------------

  const add = (ingredient: Ingredient) => {
    setIngredients((prev) => addIngredient(prev, ingredient));
    addCustomIngredient(ingredient);
  };

  const update = (updated: Ingredient) => {
    setIngredients((prev) => updateIngredient(prev, updated));
  };

  const remove = (id: string) => {
    setIngredients((prev) => removeIngredient(prev, id));
  };

  const clear = () => {
    setIngredients([]);
    setWork({ minutes: 0, hourRate: 0 });
    clearIngredients();
    clearWork();
  };

  return (
    <IngredientListContext.Provider
      value={{
        ingredients,
        work,
        catalog,
        add,
        update,
        remove,
        setWork,
        clear,
      }}
    >
      {children}
    </IngredientListContext.Provider>
  );
};;
