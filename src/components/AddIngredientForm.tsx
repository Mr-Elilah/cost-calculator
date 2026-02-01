import { useState, useEffect, useRef } from "react";
import type { Ingredient, IngredientUnit } from "../domain/models";
import type { IngredientCatalog } from "../domain/ingredientsCatalog";
import { INGREDIENTS_CATALOG } from "../domain/ingredientsCatalog";

const USER_INGREDIENTS_KEY = "user-ingredients";

interface Props {
  onAdd: (ingredient: Ingredient) => void;
}

function loadInitialIngredients(): IngredientCatalog[] {
  try {
    const raw = localStorage.getItem(USER_INGREDIENTS_KEY);
    if (raw) {
      const userIngredients: IngredientCatalog[] = JSON.parse(raw);
      return [...INGREDIENTS_CATALOG, ...userIngredients];
    }
  } catch {
    console.warn("Не удалось загрузить пользовательские ингредиенты");
  }
  return INGREDIENTS_CATALOG;
}

export function AddIngredientForm({ onAdd }: Props) {
  const [allIngredients, setAllIngredients] = useState<IngredientCatalog[]>(
    loadInitialIngredients,
  );
  const [selectedName, setSelectedName] = useState("");
  const [unit, setUnit] = useState<IngredientUnit>("gram");
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = allIngredients.filter((i) =>
    i.name.toLowerCase().includes(selectedName.toLowerCase()),
  );

  // Закрытие списка при клике вне
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

    if (!selectedName.trim() || !amountNum || !priceNum) return;

    onAdd({
      id: crypto.randomUUID(),
      name: selectedName.trim(),
      unit,
      amount: amountNum,
      price: priceNum,
    });

    // Сохраняем новый ингредиент в localStorage если его нет в базовом списке
    if (!allIngredients.find((i) => i.name === selectedName.trim())) {
      const newIngredient: IngredientCatalog = {
        name: selectedName.trim(),
        unit,
      };
      const updated = [...allIngredients, newIngredient];
      setAllIngredients(updated);

      try {
        const userIngredients = updated.filter(
          (i) => !INGREDIENTS_CATALOG.find((b) => b.name === i.name),
        );
        localStorage.setItem(
          USER_INGREDIENTS_KEY,
          JSON.stringify(userIngredients),
        );
      } catch {
        console.warn("Не удалось сохранить пользовательский ингредиент");
      }
    }

    // Сброс полей
    setSelectedName("");
    setAmount("");
    setPrice("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-2 items-end flex-wrap mt-2">
      {/* Кастомный селект */}
      <div className="relative w-40" ref={containerRef}>
        <input
          type="text"
          value={selectedName}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSelectedName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Название ингредиента"
          className="border px-2 py-1 w-full"
        />
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

      {/* Количество */}
      <input
        type="number"
        placeholder="Количество"
        className="border px-2 py-1 w-28 no-spin"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Селект единиц */}
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
