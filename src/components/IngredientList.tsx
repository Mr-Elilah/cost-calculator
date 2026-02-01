import IngredientRow from "./IngredientRow";
import { AddIngredientForm } from "./AddIngredientForm";
import { useIngredientList } from "../hooks/useIngredientList";

export function IngredientList() {
  const { ingredients, add, update, remove } = useIngredientList();

  return (
    <div className="space-y-4">
      <AddIngredientForm onAdd={add} />

      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient.id}
            ingredient={ingredient}
            onChange={update}
            onDelete={remove}
          />
        ))}
      </div>
    </div>
  );
}
