import { useState } from "react";
import { IngredientList } from "./components/IngredientList";
import { WorkBlock } from "./components/WorkBlock";
import { ResultBlock } from "./components/ResultBlock";
import type { Work } from "./domain/models";

function App() {
  const [work, setWork] = useState<Work>({ minutes: 0, hourRate: 0 });
  const [ingredients, setIngredients] = useState(() =>
    JSON.parse(localStorage.getItem("ingredients") || "[]"),
  );

  // Обновляем список ингредиентов из IngredientList
  const handleIngredientsChange = (next: typeof ingredients) => {
    setIngredients(next);
  };

  const handleWorkChange = (updated: Work) => {
    setWork(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <h1 className="text-xl font-semibold">Калькулятор себестоимости</h1>

      <IngredientList onChange={handleIngredientsChange} />

      <WorkBlock work={work} onChange={handleWorkChange} />

      <ResultBlock ingredients={ingredients} work={work} />
    </div>
  );
}

export default App;
