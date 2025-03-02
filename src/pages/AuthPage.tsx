import { useSearchParams } from "react-router";
import AuthForm from "../components/AuthForm";
import { AuthRequestType } from "../models/Auth";

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode: AuthRequestType =
    (searchParams.get("mode") as AuthRequestType) || "login";

  return <AuthForm mode={mode} />;
};

export default AuthPage;
