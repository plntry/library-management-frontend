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

export const rootLoader: LoaderFunction = async ({ request }) => {
  const { checkAuth } = useAuthStore.getState();
  const guestAccessiblePaths = new Set(["/auth"]);
  const pathname = new URL(request.url).pathname;
  const currentPath =
    pathname.startsWith("/") && pathname !== PATHS.HOME.link
      ? pathname.substring(1)
      : pathname;

  if (guestAccessiblePaths.has(currentPath)) {
    return null;
  }

  try {
    await checkAuth();
  } catch {
    if (!guestAccessiblePaths.has(currentPath)) {
      return redirect(PATHS.AUTH.link);
    }
  }

  return null;
};
