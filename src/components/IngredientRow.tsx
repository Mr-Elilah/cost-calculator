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

  function parsePositiveNumber(value: string, cb: (n: number) => void) {
    const num = Number(value);

    if (!Number.isNaN(num) && num >= 0) cb(num);
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountInput(value);
    parsePositiveNumber(value, (num) =>
      onChange({ ...ingredient, amount: num }),
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);
    parsePositiveNumber(value, (num) =>
      onChange({ ...ingredient, price: num }),
    );
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value as IngredientUnit;
    onChange({ ...ingredient, unit });
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-400">
      <span className=" w-62 text-xs md:text-base mr-auto">
        {ingredient.name}
      </span>

      <input
        type="number"
        value={amountInput}
        onChange={handleAmountChange}
        placeholder="Кол-во"
        className="w-12 p-1 border rounded no-spin"
        inputMode="numeric"
      />

      <select
        value={ingredient.unit}
        onChange={handleUnitChange}
        className="w-12 p-1 border rounded"
        aria-label="unit"
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
        inputMode="numeric"
      />
      <span>Крн.</span>

      <button
        onClick={() => onDelete(ingredient.id)}
        className="text-red-500 font-bold px-2"
        aria-label={`delete-${ingredient.name}`}
      >
        ✕
      </button>
    </div>
  );
}
