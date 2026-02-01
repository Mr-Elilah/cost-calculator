import { calculateCostBreakdown } from "../domain/calculate";
import { useIngredientList } from "../hooks/useIngredientList";

export function ResultBlock() {
  const { ingredients, work } = useIngredientList();
  const {
    ingredients: ingCost,
    work: workCost,
    total,
  } = calculateCostBreakdown(ingredients, work);

  return (
    <div className="p-4 border bg-gray-50 shadow-sm rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Итоговая себестоимость</h2>

      <div className="flex justify-between mb-1">
        <span>Себестоимость ингредиентов:</span>
        <span>{ingCost.toFixed(2)} Крон</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Стоимость работы:</span>
        <span>{workCost.toFixed(2)} Крон</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Итого:</span>
        <span>{total.toFixed(2)} Крон</span>
      </div>
    </div>
  );
}
