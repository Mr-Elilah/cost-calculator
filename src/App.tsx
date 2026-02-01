import { IngredientListProvider } from "./components/IngredientListProvider";
import { IngredientList } from "./components/IngredientList";
import { WorkBlock } from "./components/WorkBlock";
import { ResultBlock } from "./components/ResultBlock";

export default function App() {
  return (
    <IngredientListProvider>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Калькулятор себестоимости</h1>
        <IngredientList />
        <WorkBlock />
        <ResultBlock />
      </div>
    </IngredientListProvider>
  );
}
