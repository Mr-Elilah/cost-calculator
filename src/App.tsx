import { IngredientList } from "./components/IngredientList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <h1 className="text-xl font-semibold">Калькулятор себестоимости</h1>
      <IngredientList />
    </div>
  );
}

export default App;
