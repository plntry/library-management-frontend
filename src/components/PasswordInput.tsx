import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput: React.FC<{
  passwordProps: React.InputHTMLAttributes<HTMLInputElement>;
}> = ({ passwordProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative my-1">
      <input {...passwordProps} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
