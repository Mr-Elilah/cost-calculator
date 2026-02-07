import Input from "./ui/Input";
import { useIngredientList } from "../hooks/useIngredientList";

export function WorkBlock() {
  const { work, setWork } = useIngredientList();

  const handleMinutesChange = (value: string) => {
    const minutes = Number(value);
    if (!isNaN(minutes)) setWork({ ...work, minutes });
  };

  const handleRateChange = (value: string) => {
    const hourRate = Number(value);
    if (!isNaN(hourRate)) setWork({ ...work, hourRate });
  };

  const workCost = ((work.minutes * work.hourRate) / 60 || 0).toFixed(2);

  return (
    <div className="flex gap-1 items-end p-2 border border-gray-400 rounded mt-4 md:gap-10">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Время работы (минуты)
        </label>
        <Input
          type="number"
          placeholder="Мин"
          value={work.minutes || ""}
          onChange={handleMinutesChange}
          className="w-20"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Ставка в час
        </label>
        <Input
          type="number"
          placeholder="Крон/час"
          value={work.hourRate || ""}
          onChange={handleRateChange}
          className="w-20"
        />
      </div>

      <div className="flex flex-col ml-auto">
        <label className="text-sm font-medium text-gray-700 px-2 py-1">
          Стоимость работы
        </label>
        <span className="px-2 py-1 w-26 font-semibold text-sm">
          {workCost} Крон
        </span>
      </div>
    </div>
  );
}
