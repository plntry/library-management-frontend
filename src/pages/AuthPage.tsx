import { useSearchParams } from "react-router";
import AuthForm from "../components/AuthForm";
import { AuthRequestType } from "../models/Auth";
import LanguageSwitcher from "../components/LanguageSwitcher";

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode: AuthRequestType =
    (searchParams.get("mode") as AuthRequestType) || "login";

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-bg px-5 py-5 sm:py-30">
      <LanguageSwitcher />
      <AuthForm mode={mode} />
    </div>
  );
};

export default AuthPage;
