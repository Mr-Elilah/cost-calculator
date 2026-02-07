export interface InputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  className?: string;
}

export const BASE_INPUT_CLASSES = "border px-2 py-1 rounded no-spin text-sm";

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${BASE_INPUT_CLASSES} ${className}`}
    />
  );
}
