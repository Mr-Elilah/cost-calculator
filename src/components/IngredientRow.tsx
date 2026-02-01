import React from "react";
import type { Ingredient } from "../domain/models";

interface IngredientRowProps {
  ingredient: Ingredient;
  onChange: (updated: Ingredient) => void;
  onDelete: (id: string) => void;
}

const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredient,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      onChange({ ...ingredient, amount: value });
    }
  };
  return (
    <div className="flex items-center gap-4 p-2 border-gray-200">
      <span className="w-32">{ingredient.name}</span>
      <input
        type="number"
        min={0}
        value={ingredient.amount}
        onChange={handleInputChange}
        className="w-20 p-1 border rounded"
      />
      <span className="w-16 text-gray-600">
        {ingredient.unit === "gram" ? "грам" : "штук"}
      </span>
      <span className="flex-1 text-right">{ingredient.price} Крон</span>
    </div>
  );
};

export default IngredientRow;
