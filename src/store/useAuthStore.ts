import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthUser } from "../models/User";
import { authApi } from "../api/auth";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  setUser: (
    user: AuthUser | null,
    accessToken?: string | null,
    refreshToken?: string | null
  ) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  incrementLoginAttempts: () => void;
  resetLoginAttempts: () => void;
  refreshAuthToken: () => Promise<boolean>;
  withTokenRefresh: <T>(
    requestFunc: () => Promise<AxiosResponse<T>>
  ) => Promise<AxiosResponse<T> | void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loginAttempts: 0,

      setUser: (user, accessToken, refreshToken) => {
        set({
          user: user,
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
          isAuthenticated: !!user,
        });
      },

      checkAuth: async () => {
        const { accessToken, refreshToken, setUser } = get();
        if (!accessToken) {
          setUser(null);
          return;
        }
        try {
          setUser(jwtDecode(accessToken));
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            if (!refreshToken) {
              setUser(null, null, null);
              return;
            }
            try {
              const refreshResponse = await authApi.refreshToken(refreshToken);
              const { access_token, refresh_token } = refreshResponse.data;
              setUser(jwtDecode(access_token), access_token, refresh_token);
            } catch {
              setUser(null, null, null);
            }
          } else {
            set({ user: null, isAuthenticated: false });
          }
        }
      },

      logout: async () => {
        await authApi.logout();
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },

      incrementLoginAttempts: () =>
        set((state) => ({ loginAttempts: state.loginAttempts + 1 })),

      resetLoginAttempts: () => set({ loginAttempts: 0 }),

      refreshAuthToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          return false;
        }
        try {
          const response = await authApi.refreshToken(refreshToken);
          const { access_token, refresh_token } = response.data;
          set({ accessToken: access_token, refreshToken: refresh_token });
          return true;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          await get().logout();
          return false;
        }
      },

      withTokenRefresh: async <T>(
        requestFunc: () => Promise<AxiosResponse<T>>
      ): Promise<AxiosResponse<T> | void> => {
        try {
          const response = await requestFunc();
          return response;
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            const refreshed = await get().refreshAuthToken();
            if (refreshed) {
              return await requestFunc();
            }
            return;
          }
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        loginAttempts: state.loginAttempts,
      }),
    }
  )
);
