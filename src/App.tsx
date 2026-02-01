import { useState } from "react";
import { WorkBlock } from "./components/WorkBlock";
import { ResultBlock } from "./components/ResultBlock";
import { IngredientList } from "./components/IngredientList";
import type { Work } from "./domain/models";
import { useIngredientList } from "./hooks/useIngredientList";

function App() {
  const [work, setWork] = useState<Work>({ minutes: 0, hourRate: 0 });

  // Используем хук как единственный источник ингредиентов
  const { ingredients } = useIngredientList();

  const handleWorkChange = (updated: Work) => {
    setWork(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <h1 className="text-xl font-semibold">Калькулятор себестоимости</h1>

      {/* Список ингредиентов с добавлением */}
      <IngredientList />

      {/* Блок работы */}
      <WorkBlock work={work} onChange={handleWorkChange} />

      {/* Итоговая себестоимость */}
      <ResultBlock ingredients={ingredients} work={work} />
    </div>
  );
}

export default App;
