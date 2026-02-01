import type { Work } from "../domain/models";
import Input from "../componentc/ui/Input";
interface WorkBlockProps {
  work: Work;
  onChange: (updated: Work) => void;
}

export function WorkBlock({ work, onChange }: WorkBlockProps) {
  function handleMinutesChange(value: string) {
    const minutes = Number(value);
    if (!isNaN(minutes)) {
      onChange({ ...work, minutes });
    }
  }

  function handleRateChange(value: string) {
    const hourRate = Number(value);
    if (!isNaN(hourRate)) {
      onChange({ ...work, hourRate });
    }
  }

  const workCost = ((work.minutes * work.hourRate) / 60 || 0).toFixed(2);

  return (
    <div className="flex gap-4 items-end p-2 border border-gray-300 rounded mt-4">
      {/* Время работы */}

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Время работы (минуты)
        </label>
        <Input
          type="number"
          placeholder="Мин"
          value={work.minutes || ""}
          onChange={handleMinutesChange}
          className="w-24"
        />
      </div>

      {/* Ставка в час */}

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Ставка в час
        </label>
        <Input
          type="number"
          placeholder="Крон/час"
          value={work.hourRate || ""}
          onChange={handleRateChange}
          className="w-24"
        />
      </div>

      {/* Итоговая стоимость работы */}
      <div className="flex flex-col ml-auto">
        <label className="text-sm font-medium text-gray-700">
          Стоимость работы
        </label>
        <span className="px-2 py-1 w-28 font-semibold">
          {workCost}
          Крон
        </span>
      </div>
    </div>
  );
}
