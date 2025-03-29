import ResetPasswordForm from "./ResetPasswordForm";
import { useSearchParams } from "react-router";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm mode="resetPassword" token={token ?? undefined} />;
};

export default ResetPassword;
