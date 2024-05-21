import { ButtonHTMLAttributes, ReactNode } from "react";

interface ElementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ variant = "primary", children, ...props }: ElementProps) => {
  const getClassName = () => {
    if (variant === "primary")
      return "bg-black p-4 text-center text-white font-semibold hover:bg-white hover:text-black border-2 border-black rounded w-full";

    return "my-2 w-full text-center text-slate-600 hover:bg-white hover:text-black";
  };

  return (
    <button className={getClassName()} {...props}>
      {children}
    </button>
  );
};

export default Button;
