import { LoaderFunction, redirect } from "react-router";
import { PATHS } from "../routes/paths";
import { LoginFormData, RegisterFormData } from "../models/Auth";
import { UserLogin, UserRegistration, UserRoles } from "../models/User";
import { useAuthStore } from "../store/useAuthStore";
import { authApi } from "../api/auth";

export const getRequestBody = {
  register: (formData: RegisterFormData) => {
    const userBody: UserRegistration = {
      email: formData.email,
      username: "test1",
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      password: formData.password,
      role: UserRoles.READER,
    };

    return userBody;
  },
  login: (formData: LoginFormData) => {
    const userBody: UserLogin = {
      email: formData.email,
      password: formData.password,
    };

    return userBody;
  },
};

export const rootLoader: LoaderFunction = async () => {
  const { withTokenRefresh } = useAuthStore.getState();

  try {
    await withTokenRefresh(async () => await authApi.getUser());
    return null;
  } catch {
    return redirect(PATHS.AUTH.link);
  }
};
