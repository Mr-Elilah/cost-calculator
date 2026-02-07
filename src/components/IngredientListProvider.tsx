import { useEffect, useState, type FC, type ReactNode } from "react";
import { IngredientListContext } from "../context/IngredientsListContext";
import type { Ingredient, Work } from "../domain/models";
import { useCatalog } from "../hooks/useCatalog";
import {
  addIngredient,
  updateIngredient,
  removeIngredient,
} from "../helpers/ingredientHelpers";

interface ProviderProps {
  children: ReactNode;
}

const INGREDIENTS_KEY = "ingredientsList";
const WORK_KEY = "workBlock";

function loadFromStorage<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const IngredientListProvider: FC<ProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() =>
    loadFromStorage<Ingredient[]>(INGREDIENTS_KEY, []),
  );

  const [work, setWork] = useState<Work>(() =>
    loadFromStorage<Work>(WORK_KEY, { minutes: 0, hourRate: 0 }),
  );

  const { catalog, addCustomIngredient } = useCatalog();

  // ----------------------------

  useEffect(() => {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem(WORK_KEY, JSON.stringify(work));
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
    localStorage.removeItem(INGREDIENTS_KEY);
    localStorage.removeItem(WORK_KEY);
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
};
