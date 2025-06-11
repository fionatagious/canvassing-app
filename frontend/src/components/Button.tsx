interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  labelSize?: string;
  className?: string;
}

const Button = ({
  label,
  labelSize = "text-md",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`p-2 rounded-md
        ${
          props.disabled
            ? `bg-gray-400 text-gray-200 cursor-not-allowed hover:cursor-not-allowed hover:bg-gray-400`
            : `${className} ${labelSize} bg-btn-primary hover:bg-btn-hover text-white font-semibold hover:cursor-pointer my-2`
        }`}
      type={props.type}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
