import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

const FormInput = ({
  name,
  type,
  size = "large",
  id,
  placeholder,
  validation,
  label,
  min,
  max,
  required,
  disabled,
  className,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            id={id}
            type={type}
            className={`${
              size === "large" ? "p-3" : "p-2"
            } rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${className}`}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FormInput;