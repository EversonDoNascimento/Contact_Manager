type Props = {
  id: string;
  label: string;
  type?: "password" | "text" | "email" | "number";
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = ({ id, label, type = "text", ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-white font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...rest}
        className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
      />
    </div>
  );
};

export default Input;
