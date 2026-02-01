export interface InputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  className?: string;
}

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
      className={`border px-2 py-1 rounded no-spin ${className}`}
    />
  );
}
