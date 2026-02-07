import { useIngredientList } from "../hooks/useIngredientList";
import { calculateRecommendedPrice } from "../domain/calculate";

export default function RecommendedPrice() {
  const { ingredients, work } = useIngredientList();
  const recommendedPrice = calculateRecommendedPrice(ingredients, work);
  return (
    <div className="mt-2 font-semibold text-green-500 flex flex-col">
      <h2 className="text-3xl font-cursive ">Рекомендуемая цена:</h2>
      <span className="text-4xl font-cursive mt-3 ml-auto">
        {recommendedPrice.toFixed(2)} Крон
      </span>
    </div>
  );
}
