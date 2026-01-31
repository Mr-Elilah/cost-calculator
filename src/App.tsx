import { calculateTotalCost } from "./domain/calculate.ts";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <h1 className="text-xl font-semibold">Калькулятор себестоимости</h1>
    </div>
  );
}

export default App;
console.log(
  calculateTotalCost(
    [
      {
        id: "1",
        name: "Сахар",
        unit: "gram",
        amount: 200,
        price: 20,
      },
    ],
    {
      minutes: 60,
      hourRate: 180,
    },
  ),
);
