import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
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

  const add = useCallback(
    (ingredient: Ingredient) => {
      setIngredients((prev) => addIngredient(prev, ingredient));
      addCustomIngredient(ingredient);
    },
    [addCustomIngredient],
  );

  const update = useCallback((updated: Ingredient) => {
    setIngredients((prev) => updateIngredient(prev, updated));
  }, []);

  const remove = useCallback((id: string) => {
    setIngredients((prev) => removeIngredient(prev, id));
  }, []);

  const clear = useCallback(() => {
    setIngredients([]);
    setWork({ minutes: 0, hourRate: 0 });
    clearIngredients();
    clearWork();
  }, []);

  const value = useMemo(
    () => ({
      ingredients,
      work,
      catalog,
      add,
      update,
      remove,
      setWork,
      clear,
    }),
    [ingredients, work, catalog, add, update, remove, setWork, clear],
  );

  return (
    <IngredientListContext.Provider value={value}>
      {children}
    </IngredientListContext.Provider>
  );
};
