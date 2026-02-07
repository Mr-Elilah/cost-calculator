export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "optional" | "another";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "default",
  className = "",
}: ButtonProps) {
  const baseClasses = "px-4 py-1 rounded font-semibold transition duration-200";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-black text-white hover:bg-gray-700",
    optional: "bg-gray-200 text-black hover:bg-gray-300",
    another: "bg-red-500 text-white hover:bg-red-600",
  };
  const variantClasses = variants[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
