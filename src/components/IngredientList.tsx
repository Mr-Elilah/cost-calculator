import IngredientRow from "./IngredientRow";
import { AddIngredientForm } from "./AddIngredientForm";
import { useIngredientList } from "../hooks/useIngredientList";
import Button from "./Button";

export function IngredientList() {
  const { ingredients, add, update, remove, clear } = useIngredientList();

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
        {ingredients.length > 0 && (
          <div className=" flex mt-2">
            <Button onClick={clear} variant="another" className="m-auto">
              Сбросить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
