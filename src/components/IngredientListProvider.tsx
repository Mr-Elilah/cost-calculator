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

  const [customCatalog, setCustomCatalog] = useState<IngredientCatalog[]>(() =>
    loadCatalog(),
  );

  const catalog: IngredientCatalog[] = [
    ...INGREDIENTS_CATALOG,
    ...customCatalog,
  ];

  useEffect(() => {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem(WORK_KEY, JSON.stringify(work));
  }, [work]);

  const add = (ingredient: Ingredient) => {
    setIngredients((prev) => [...prev, ingredient]);

    const exists = catalog.some(
      (i) => i.name.toLowerCase() === ingredient.name.toLowerCase(),
    );

    if (!exists) {
      const updated = [
        ...customCatalog,
        { name: ingredient.name, unit: ingredient.unit },
      ];
      setCustomCatalog(updated);
      saveCatalog(updated);
    }
  };

  const update = (updated: Ingredient) => {
    setIngredients((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i)),
    );
  };

  const remove = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
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
