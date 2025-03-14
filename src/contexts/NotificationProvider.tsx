import React, { useState, ReactNode } from "react";
import { Notification, NotificationContext } from "./NotificationContext";

const notificationStyles: Record<Notification["type"], string> = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-amber-500",
  error: "text-red-500",
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    notification: Omit<Notification, "id">,
    duration = 3000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white p-4 rounded shadow-lg animate-fadeIn ${
              notificationStyles[n.type]
            }`}
          >
            <div className="font-bold">{n.message}</div>
            {n.description && (
              <div className="text-sm mt-1">{n.description}</div>
            )}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
