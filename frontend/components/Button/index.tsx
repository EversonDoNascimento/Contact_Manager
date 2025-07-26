type Props = {
  text: string;
  click?: () => void;
};

const Button = ({ text, click }: Props) => {
  return (
    <button
      type="submit"
      onProgress={click}
      className={`bg-accent hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-xl transition-colors duration-200 `}
    >
      {text}
    </button>
  );
};

export default Button;
