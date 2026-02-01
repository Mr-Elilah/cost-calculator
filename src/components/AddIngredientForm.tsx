import { useState } from "react";
import { INGREDIENTS_CATALOG } from "../domain/ingredientsCatalog";
import type { Ingredient, IngredientUnit } from "../domain/models";

interface Props {
  onAdd: (ingredient: Ingredient) => void;
}

export function AddIngredientForm({ onAdd }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [unit, setUnit] = useState<IngredientUnit>(INGREDIENTS_CATALOG[0].unit); // по умолчанию unit из первого ингредиента
  const [amount, setAmount] = useState<string>(""); // пусто чтобы не мешал 0
  const [price, setPrice] = useState<string>("");

  const selected = INGREDIENTS_CATALOG[selectedIndex];

  function handleAdd() {
    const amountNum = Number(amount);
    const priceNum = Number(price);

    if (!amountNum || !priceNum) return;

    onAdd({
      id: crypto.randomUUID(),
      name: selected.name,
      unit,
      amount: amountNum,
      price: priceNum,
    });

    setAmount("");
    setPrice("");
  }

  return (
    <div className="flex gap-2 items-end flex-wrap mt-2">
      {/* Селект ингредиентов */}
      <select
        className="border px-2 py-1"
        value={selectedIndex}
        onChange={(e) => {
          const idx = Number(e.target.value);
          setSelectedIndex(idx);
          setUnit(INGREDIENTS_CATALOG[idx].unit); // меняем unit по умолчанию
        }}
      >
        {INGREDIENTS_CATALOG.map((item, index) => (
          <option key={item.name} value={index}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Селект единиц измерения */}

      {/* Количество */}
      <input
        type="number"
        placeholder="Количество"
        className="border px-2 py-1 w-28 no-spin"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="border px-2 py-1"
        value={unit}
        onChange={(e) => setUnit(e.target.value as IngredientUnit)}
      >
        <option value="gram">г</option>
        <option value="piece">шт</option>
      </select>

      {/* Цена */}
      <input
        type="number"
        placeholder="Цена"
        className="border px-2 py-1 w-28 no-spin"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        onClick={handleAdd}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Добавить
      </button>
    </div>
  );
}
