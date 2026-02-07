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

  let variantClasses = "";
  switch (variant) {
    case "default":
      variantClasses =
        "bg-black text-white px-4 py-1 rounded hover:bg-gray-700";
      break;
    case "optional":
      variantClasses = "bg-gray-200 text-black hover:bg-gray-300";
      break;
    case "another":
      variantClasses = "bg-red-500 text-white hover:bg-red-600";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
