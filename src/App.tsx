import { IngredientListProvider } from "./components/IngredientListProvider";
import { IngredientList } from "./components/IngredientList";
import { WorkBlock } from "./components/WorkBlock";
import { ResultBlock } from "./components/ResultBlock";

export default function App() {
  return (
    <IngredientListProvider>
      <div className="relative min-h-screen bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/background.jpg")' }}
        />
        <div className="absolute inset-0 bg-white/75" />
        <div className=" relative z-4 p-4 max-w-2xl mx-auto">
          <h1 className="text-3xl font-cursive mb-4 text-center">
            Калькулятор себестоимости
          </h1>
          <IngredientList />
          <WorkBlock />
          <ResultBlock />
        </div>
      </div>
    </IngredientListProvider>
  );
}
