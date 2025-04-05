import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { urls } from "./urls";
import { authApi } from "./auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// to prevent infinite loops
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const pathname = new URL(originalRequest.url || "", BASE_URL).pathname;
    const currentPath = pathname.startsWith("/")
      ? pathname.substring(1)
      : pathname;

    // Get all auth paths including nested ones
    const authPaths = new Set(
      [
        urls.auth.register,
        urls.auth.login,
        urls.auth.logout,
        urls.auth.requestResetPassword,
        urls.auth.resetPassword,
        urls.auth.refreshToken,
      ].map((path) => `api/v1/auth${path}`)
    );
    authPaths.add("api/v1/users/me");

    // Don't retry for auth endpoints
    if (authPaths.has(currentPath)) {
      return Promise.reject(error);
    }

    if (!originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await authApi.refreshToken();
        processQueue(null);
        isRefreshing = false;
        return api(originalRequest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (refreshError) {
        processQueue(null);
        isRefreshing = false;

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
