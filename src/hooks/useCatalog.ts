import { useState } from "react";
import { INGREDIENTS_CATALOG, type IngredientCatalog } from "../domain/ingredientsCatalog";
import type { Ingredient } from "../domain/models";
import { loadCatalog, saveCatalog } from "../storage/ingredientsCatalogStorage";
import { addIngredientToCatalogIfMissing, mergeCatalogs } from "../helpers/ingredientHelpers";

export function useCatalog() {
    const [customCatalog, setCustomCatalog] = useState<IngredientCatalog[]>(() =>
        loadCatalog()
    );

    const catalog = mergeCatalogs(INGREDIENTS_CATALOG, customCatalog);

    const addCustomIngredient = (ingredient: Ingredient) => {
        const updatedCatalog = addIngredientToCatalogIfMissing(
            customCatalog,
            catalog,
            ingredient
        );

        if (updatedCatalog !== customCatalog) {
            setCustomCatalog(updatedCatalog);
            saveCatalog(updatedCatalog);
        }
    };

    return {
        catalog,
        addCustomIngredient,
    };
}