import { createContext } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  description?: string;
}

export interface NotificationContextProps {
  addNotification: (
    notification: Omit<Notification, "id">,
    duration?: number
  ) => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);
