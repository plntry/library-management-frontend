import { FieldError } from "react-hook-form";
import PasswordInput from "./PasswordInput";

const FormInput: React.FC<{
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errorProp: FieldError | undefined;
}> = ({ inputProps, errorProp }) => {
  const inputClasses =
    "my-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";
  const isPasswordField = inputProps.type === "password";

  return (
    <>
      {isPasswordField ? (
        <PasswordInput
          passwordProps={{ ...inputProps, className: inputClasses }}
        />
      ) : inputProps.type === "textarea" ? (
        <textarea
          {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={inputClasses}
        />
      ) : (
        <input {...inputProps} className={inputClasses} />
      )}
      <div className="mt-0 mb-4 min-h-2">
        {errorProp && (
          <p className="text-sm text-red-500">{errorProp.message}</p>
        )}
      </div>
    </>
  );
};

export default FormInput;
