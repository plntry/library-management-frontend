import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import { AuthUser } from "../models/User";
import { authApi } from "../api/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  setUser: (user: AuthUser | null) => void;
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
      isAuthenticated: false,
      loginAttempts: 0,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      checkAuth: async () => {
        try {
          const { data } = await authApi.getUser();
          set({ user: data, isAuthenticated: true });
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            try {
              await authApi.refreshToken();
              const { data } = await authApi.getUser();
              set({ user: data, isAuthenticated: true });
            } catch {
              set({ user: null, isAuthenticated: false });
              throw error;
            }
          } else {
            set({ user: null, isAuthenticated: false });
          }
        }
      },

      logout: async () => {
        await authApi.logout();
        set({ user: null, isAuthenticated: false });
      },

      incrementLoginAttempts: () =>
        set((state) => ({ loginAttempts: state.loginAttempts + 1 })),

      resetLoginAttempts: () => set({ loginAttempts: 0 }),

      refreshAuthToken: async () => {
        try {
          await authApi.refreshToken();
          return true;
        } catch {
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
          if (axios.isAxiosError(error)) {
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
        isAuthenticated: state.isAuthenticated,
        loginAttempts: state.loginAttempts,
      }),
    }
  )
);
