import { LoaderFunction, redirect } from "react-router";
import { PATHS } from "../routes/paths";
import { LoginFormData, RegisterFormData } from "../models/Auth";
import { UserLogin, UserRegistration, UserRoles } from "../models/User";
import { useAuthStore } from "../store/useAuthStore";

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

export function getAuthToken() {
  return null; // TODO: add loader when the api is ready
}

export function tokenLoader() {
  return getAuthToken();
}

export async function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect(PATHS.AUTH.link);
  }

  return null;
}

export const rootLoader: LoaderFunction = async () => {
  const { isAuthenticated, checkAuth } = useAuthStore.getState();
  console.log("state", useAuthStore.getState());

  if (!isAuthenticated) {
    await checkAuth();
  }

  const { isAuthenticated: updatedIsAuthenticated } = useAuthStore.getState();

  if (!updatedIsAuthenticated) {
    return redirect(PATHS.AUTH.link);
  }

  return null;
};
