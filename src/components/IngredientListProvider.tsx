import { useEffect, useState, type FC, type ReactNode } from "react";
import {
  IngredientListContext,
  type IngredientListContextValue,
} from "../context/IngredientsListContext";
import type { Ingredient, Work } from "../domain/models";

interface ProviderProps {
  children: ReactNode;
}

const INGREDIENTS_KEY = "ingredientsList";
const WORK_KEY = "workBlock";

export const IngredientListProvider: FC<ProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem(INGREDIENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [work, setWork] = useState<Work>(() => {
    const saved = localStorage.getItem(WORK_KEY);
    return saved ? JSON.parse(saved) : { minutes: 0, hourRate: 0 };
  });

  useEffect(() => {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem(WORK_KEY, JSON.stringify(work));
  }, [work]);

  const add = (ingredient: Ingredient) =>
    setIngredients((prev) => [...prev, ingredient]);

  const update = (updated: Ingredient) =>
    setIngredients((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i)),
    );

  const remove = (id: string) =>
    setIngredients((prev) => prev.filter((i) => i.id !== id));

  const clear = () => {
    setIngredients([]);
    setWork({ minutes: 0, hourRate: 0 });
    localStorage.removeItem(INGREDIENTS_KEY);
    localStorage.removeItem(WORK_KEY);
  };

  const value: IngredientListContextValue = {
    ingredients,
    work,
    add,
    update,
    remove,
    setWork,
    clear,
  };

  return (
    <IngredientListContext.Provider value={value}>
      {children}
    </IngredientListContext.Provider>
  );
};
