import { InputHTMLAttributes } from "react";

interface ElementProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const InputWithLabel = ({ label, ...props }: ElementProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="m-0 font-semibold">{label}</p>

      <input
        {...props}
        type="text"
        className="outline-none border-[1px] text-slate-700 border-black p-2 rounded-md"
      />
    </div>
  );
};
export default InputWithLabel;
