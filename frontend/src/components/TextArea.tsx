import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface TextAreaProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: Path<T>; // from react-hook-form, ensures only valid names are used
  label?: string;
  labelSize?: string;
  noteContent?: string;
  className?: string;
  register?: UseFormRegister<T>;
}

const TextArea = <T extends FieldValues>({
  name,
  label,
  labelSize = "text-md",
  noteContent = "",
  className = "",
  register,
  ...props
}: TextAreaProps<T>) => {
  return (
    <div className="flex flex-col gap-1 my-2">
      <label htmlFor={name} className={labelSize}>
        {label}
      </label>
      <textarea
        className={`${className} bg-amber-50 p-4 max-w-full leading-6 rounded-sm border-[1px] border-gray-700 shadow-sm focus:border-purple-800`}
        /* the inline edit notes feature uses noteContent, does not use register */
        value={!register ? noteContent : undefined}
        /* the Add Contact page uses register */
        {...(register && register(name))}
        {...props}
      />
    </div>
  );
};

export default TextArea;
