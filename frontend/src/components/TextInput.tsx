import { type InputHTMLAttributes } from "react";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface TextInputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>; // from react-hook-form, ensures only valid names are used
  label?: string;
  labelSize?: string;
  register: UseFormRegister<T>;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  labelSize = "text-md",
  register,
  className = "",
  ...props
}: TextInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1 my-2">
      {label && (
        <label className={labelSize} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        {...register(name)}
        {...props}
        className={`${className} border-[1px] border-gray-700 focus:border-purple-800 bg-amber-50 rounded py-2 px-4`}
      />
    </div>
  );
};

export default TextInput;
