import React from "react";

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  ...rest
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded-md px-3 py-2 bg-gray-100 outline-none focus-within:ring-2 focus-within:ring-sky-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {Icon && <Icon className="text-gray-400 mr-2" size={20} />}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="bg-transparent flex-grow outline-none text-gray-900 placeholder-gray-400"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        />
      </div>
      {error && (
        <span
          id={`${name}-error`}
          className="text-sm text-red-600 mt-1 font-semibold"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default InputField;
