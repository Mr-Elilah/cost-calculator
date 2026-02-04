import { useEffect, useState, type FC, type ReactNode } from "react";
import { IngredientListContext } from "../context/IngredientsListContext";
import type { Ingredient, Work } from "../domain/models";
import {
  INGREDIENTS_CATALOG,
  type IngredientCatalog,
} from "../domain/ingredientsCatalog";
import { loadCatalog, saveCatalog } from "../storage/ingredientsCatalogStorage";

interface ProviderProps {
  children: ReactNode;
}
import {
  addIngredient,
  updateIngredient,
  removeIngredient,
  mergeCatalogs,
  addIngredientToCatalogIfMissing,
} from "../helpers/ingredientHelpers";
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

  const [customCatalog, setCustomCatalog] = useState<IngredientCatalog[]>(() =>
    loadCatalog(),
  );

  // ----------------------------

  const catalog = mergeCatalogs(INGREDIENTS_CATALOG, customCatalog);

  useEffect(() => {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem(WORK_KEY, JSON.stringify(work));
  }, [work]);

  // ---------------- actions ----------------

  const add = (ingredient: Ingredient) => {
    setIngredients((prev) => addIngredient(prev, ingredient));

    // const exists = catalog.some(
    //   (i) => i.name.toLowerCase() === ingredient.name.toLowerCase(),
    // );

    // if (!exists) {
    //   const updated = [
    //     ...customCatalog,
    //     { name: ingredient.name, unit: ingredient.unit },
    //   ];
    //   setCustomCatalog(updated);
    //   saveCatalog(updated);
    // }

    const updatedCatalog = addIngredientToCatalogIfMissing(
      customCatalog,
      catalog,
      ingredient,
    );

    if (updatedCatalog !== customCatalog) {
      setCustomCatalog(updatedCatalog);
      saveCatalog(updatedCatalog);
    }
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
