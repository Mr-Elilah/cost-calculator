import { useState, useRef, useEffect, useMemo } from "react";
import type { Ingredient, IngredientUnit } from "../domain/models";
import Input from "./ui/Input";
import { useIngredientList } from "../hooks/useIngredientList";

interface Props {
  onAdd: (ingredient: Ingredient) => void;
}

export function AddIngredientForm({ onAdd }: Props) {
  const { catalog } = useIngredientList();

  const [selectedName, setSelectedName] = useState("");
  const [unit, setUnit] = useState<IngredientUnit>("gram");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return catalog.filter((i) =>
      i.name.toLowerCase().includes(selectedName.toLowerCase()),
    );
  }, [selectedName, catalog]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string, unit: IngredientUnit) => {
    setSelectedName(name);
    setUnit(unit);
    setIsOpen(false);
  };

  const handleAdd = () => {
    const amountNum = Number(amount);
    const priceNum = Number(price);

    if (!selectedName.trim() || amountNum <= 0 || priceNum <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      name: selectedName.trim(),
      unit,
      amount: amountNum,
      price: priceNum,
    });

    setSelectedName("");
    setAmount("");
    setPrice("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="flex gap-2 items-end flex-wrap mt-2">
      <div className="relative" ref={containerRef}>
        <div
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
        >
          <Input
            value={selectedName}
            placeholder="Название ингредиента"
            onChange={setSelectedName}
          />
        </div>

        {isOpen && (
          <ul className="absolute z-10 w-full max-h-40 overflow-auto border bg-white mt-1">
            {filtered.map((i) => (
              <li
                key={i.name}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(i.name, i.unit)}
              >
                {i.name}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-1 text-gray-500">
                Добавить "{selectedName}"
              </li>
            )}
          </ul>
        )}
      </div>

      <Input
        type="number"
        placeholder="Количество"
        value={amount}
        onChange={setAmount}
        className="w-28"
      />

      <select
        className="border px-2 py-1 rounded"
        value={unit}
        onChange={(e) => setUnit(e.target.value as IngredientUnit)}
      >
        <option value="gram">г</option>
        <option value="piece">шт</option>
      </select>

      <Input
        type="number"
        placeholder="Цена(кг/шт)"
        value={price}
        onChange={setPrice}
        className="w-28"
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
