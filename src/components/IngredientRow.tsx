import { useState } from "react";
import type { Ingredient, IngredientUnit } from "../domain/models";

interface IngredientRowProps {
  ingredient: Ingredient;
  onChange: (updated: Ingredient) => void;
  onDelete: (id: string) => void;
}

export default function IngredientRow({
  ingredient,
  onChange,
  onDelete,
}: IngredientRowProps) {
  const [amountInput, setAmountInput] = useState(ingredient.amount.toString());
  const [priceInput, setPriceInput] = useState(ingredient.price.toString());

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountInput(value);
    const num = Number(value);
    if (!isNaN(num) && num >= 0) onChange({ ...ingredient, amount: num });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);
    const num = Number(value);
    if (!isNaN(num) && num >= 0) onChange({ ...ingredient, price: num });
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value as IngredientUnit;
    onChange({ ...ingredient, unit });
  };

  return (
    <div className="flex items-center gap-4 p-2 border-b border-gray-200">
      <span className="w-32">{ingredient.name}</span>

      <input
        type="number"
        value={amountInput}
        onChange={handleAmountChange}
        placeholder="Кол-во"
        className="w-12 p-1 border rounded no-spin"
      />

      <select
        value={ingredient.unit}
        onChange={handleUnitChange}
        className="w-12 p-1 border rounded"
      >
        <option value="gram">г.</option>
        <option value="piece">шт.</option>
      </select>

      <input
        type="number"
        value={priceInput}
        onChange={handlePriceChange}
        placeholder="Цена"
        className="w-12 p-1 border rounded no-spin"
      />
      <span>Крон</span>

      <button
        onClick={() => onDelete(ingredient.id)}
        className="text-red-500 font-bold px-2"
      >
        ✕
      </button>
    </div>
  );
}
