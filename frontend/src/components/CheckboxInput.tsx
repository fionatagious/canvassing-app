import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>; // from react-hook-form, ensures only valid names are used
  label?: string;
  labelSize?: string;
  register: UseFormRegister<T>;
}

const CheckboxInput = <T extends FieldValues>({
  name,
  label,
  labelSize = "text-md",
  register,
  ...props
}: CheckboxInputProps<T>) => {
  return (
    <div className="flex items-center">
      <input
        id={name}
        className="h-5 w-5 border-gray-700 rounded focus:border-purple-800 active:border-purple-800"
        {...register(name)}
        {...props}
      />
      <label htmlFor={name} className={`ml-2 ${labelSize}`}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
