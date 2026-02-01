import type { Work } from "../domain/models";

interface WorkBlockProps {
  work: Work;
  onChange: (updated: Work) => void;
}

export function WorkBlock({ work, onChange }: WorkBlockProps) {
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(e.target.value);
    if (!isNaN(minutes)) {
      onChange({ ...work, minutes });
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hourRate = Number(e.target.value);
    if (!isNaN(hourRate)) {
      onChange({ ...work, hourRate });
    }
  };

  return (
    <div className="flex gap-4 items-end p-2 border border-gray-300 rounded mt-4">
      {/* Время работы */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Время работы (минуты)
        </label>
        <input
          type="number"
          value={work.minutes}
          onChange={handleMinutesChange}
          className="border border-gray-300 rounded p-1 w-24"
        />
      </div>
      {/* Ставка в час */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Ставка в час
        </label>
        <input
          type="number"
          value={work.hourRate}
          onChange={handleRateChange}
          className="border border-gray-300 rounded p-1 w-24"
        />
      </div>

      {/* Итоговая стоимость работы */}
      <div className="flex flex-col ml-auto">
        <label className="text-sm font-medium text-gray-700">
          Стоимость работы
        </label>
        <span className="px-2 py-1 w-28">
          {((Number(work.minutes) * Number(work.hourRate)) / 60 || 0).toFixed(
            2,
          )}{" "}
          Крон
        </span>
      </div>
    </div>
  );
}
