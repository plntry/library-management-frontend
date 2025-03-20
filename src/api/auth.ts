import { UserLogin, UserRegistration } from "../models/User";
import { RegisterFormData, LoginFormData } from "../models/Auth";
import api from ".";
import { getRequestBody } from "../utils/authUtils";
import { getAxiosError } from "../utils/axiosUtils";

const AUTH_BASE_URL = "/api/v1/auth";

const requestUrls = {
  register: "/register",
  login: "/login",
  // logout: "/logout",
  refreshToken: "/refresh",
};

export const shouldIncludeAuth = {
  register: ["teacher", "admin"],
};

const getAuthUrl = (path: string) => `${AUTH_BASE_URL}${path}`;

export const authApi = {
  register: async (formData: RegisterFormData) => {
    const body: UserRegistration = getRequestBody.register(formData);
    try {
      return await api.post(getAuthUrl(requestUrls.register), body);
    } catch (error: unknown) {
      return getAxiosError(error);
    }
  },
  login: async (formData: LoginFormData) => {
    const body: UserLogin = getRequestBody.login(formData);
    try {
      return await api.post(getAuthUrl(requestUrls.login), body);
    } catch (error: unknown) {
      return getAxiosError(error);
    }
  },
  refreshToken: async (refresh_token: string) =>
    await api.post(getAuthUrl(requestUrls.refreshToken), { refresh_token }),
};
