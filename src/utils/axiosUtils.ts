import axios, { AxiosError, AxiosResponse } from "axios";
import { APIError } from "../models/Auth";
import i18next from "i18next";
import { Notification } from "../contexts/NotificationContext";
import { useAuthStore } from "../store/useAuthStore";
export function getAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error;
  }

  throw new Error("Unexpected error occurred while making a request.");
}

export const handleAxiosRequest = async <T>(
  requestFunction: () => Promise<AxiosResponse<T>>,
  notify: (notification: Omit<Notification, "id">, duration?: number) => void,
  successNotification: {
    message: string;
    description: string;
  }
): Promise<AxiosResponse<T> | void> => {
  try {
    const response: AxiosResponse = await requestFunction();

    if (response?.status && response.status >= 200 && response.status < 300) {
      notify(
        {
          type: "success",
          ...successNotification,
        },
        5000
      );
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const { checkAuth } = useAuthStore.getState();
        await checkAuth();

        const { user } = useAuthStore.getState();

        if (user?.id) {
          return await handleAxiosRequest(
            requestFunction,
            notify,
            successNotification
          );
        } else {
          handleAxiosError(error, notify);
        }
      } else {
        handleAxiosError(error, notify);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const handleAxiosError = (
  error: AxiosError<APIError>,
  notify: (notification: Omit<Notification, "id">, duration?: number) => void
) => {
  const errorNotification = {
    message: i18next.t("notifications.default.error.message"),
    description: i18next.t("notifications.default.error.description"),
  };
  const errorDetail = error.response?.data?.detail;

  if (errorDetail) {
    if (Array.isArray(errorDetail)) {
      errorNotification.description = errorDetail[0]?.msg;
    } else if (typeof errorDetail === "string") {
      errorNotification.description = errorDetail;
    }
  }

  notify(
    {
      type: "error",
      ...errorNotification,
    },
    5000
  );
};
