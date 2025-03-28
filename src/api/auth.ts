import { UserLogin, UserRegistration } from "../models/User";
import { RegisterFormData, LoginFormData } from "../models/Auth";
import api from ".";
import { getRequestBody } from "../utils/authUtils";
import { getAxiosError } from "../utils/axiosUtils";
import { urls } from "./urls";

const AUTH_BASE_URL = "/api/v1/auth";
const requestUrls = urls.auth;

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
  logout: async () => await api.post(getAuthUrl(requestUrls.logout)),
  refreshToken: async (refresh_token: string) =>
    await api.post(getAuthUrl(requestUrls.refreshToken), { refresh_token }),
  requestResetPassword: async (email: string) =>
    await api.post(
      `${getAuthUrl(requestUrls.requestResetPassword)}?email=${email}`
    ),
  resetPassword: async (
    email: string,
    new_password: string,
    confirm_password: string
    // token: string
  ) =>
    await api.post(getAuthUrl(requestUrls.resetPassword), {
      email,
      new_password,
      confirm_password,
    }),
};
