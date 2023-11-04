import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  required,
  className,
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm">{label}</label>}
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={`p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 ${
          required ? "required" : ""
        } ${className}`}
        defaultValue={value}
      />
    </div>
  );
};

export default FormTextArea;
