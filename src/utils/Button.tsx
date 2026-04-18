import React from "react";

type Variant = "primary" | "secondary" | "danger" | "outline" | "light";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: Variant;
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-[#24ACEB] text-white hover:bg-[#1E96CC] transition duration-300",
  secondary: "bg-gray-500 text-white hover:bg-gray-600 transition duration-300",
  danger: "bg-red-500 text-white hover:bg-red-600 transition duration-300",
  light: " text-gray-800 border border-gray-300 hover:bg-primary hover:text-white transition duration-300",
  outline: "border border-gray-500 text-gray-700 hover:bg-gray-100 transition duration-300",
};

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`{px-4 py-1 rounded-full transition} ${
        variantStyles[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
