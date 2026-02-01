import { useIngredientList } from "../hooks/useIngredientList";

export function IngredientList() {
  const { ingredients } = useIngredientList();

  return (
    <div className="mt-4">
      <h2 className="font-semibold mb-2">Ингредиенты</h2>

      <ul className="space-y-1">
        {ingredients.map((i) => (
          <li key={i.id}>
            {i.name} - {i.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
