import React, { useState } from "react";
import { UserRegistration, UserRoles, UserStatus } from "../models/User";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { getStatusBadgeClass } from "../utils/styleUtils";
import ConfirmationModal from "./ConfirmationModal";
import { usersApi } from "../api/users";
import { useNotification } from "../hooks/useNotification";

interface UserItemProps {
  user: UserRegistration;
  onStatusChange: (userId: number, isBlocked: boolean) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onStatusChange }) => {
  const { t } = useTranslation();
  const currentUserRole = useAuthStore((state) => state.user?.role);
  const addNotification = useNotification();
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    message: "",
    onConfirm: async () => {},
  });

  const isAdmin = currentUserRole === UserRoles.ADMIN;
  const isLibrarian = currentUserRole === UserRoles.LIBRARIAN;
  const canManageUsers = isAdmin || isLibrarian;

  const handleUserBlockUnblock = () => {
    if (!user.id) return;

    setModalConfig({
      isOpen: true,
      message: t(
        `confirmations.${user.is_blocked ? "unblockUser" : "blockUser"}`
      ),
      onConfirm: async () => {
        try {
          await usersApi[user.is_blocked ? "unblock" : "block"](user.id!);
          onStatusChange(user.id!, !user.is_blocked);
          addNotification({
            type: "success",
            message: t("notifications.default.success.message"),
            description: t("notifications.default.success.description"),
          });
        } catch {
          addNotification({
            type: "error",
            message: t("notifications.default.error.message"),
            description: t("notifications.default.error.description"),
          });
        }
      },
    });
  };

  return (
    <>
      <div className="card">
        <div className="card__content">
          <div className="card__header">
            <h3 className="card__title">{user.email}</h3>
            <h2
              className={`badge ${getStatusBadgeClass(
                user?.is_blocked ? UserStatus.BLOCKED : UserStatus.ACTIVE
              )}`}
            >
              {t(
                `user.status.${
                  user?.is_blocked ? UserStatus.BLOCKED : UserStatus.ACTIVE
                }`
              )}
            </h2>
          </div>
          <div className="mt-3.5 card__general-data">
            <p className="text-xl">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-base">{t(`user.roles.${user.role}`)}</p>
          </div>
        </div>
        {canManageUsers && (
          <div className="card__footer">
            <button
              className={`button ${!user.is_blocked && "button--red"}`}
              onClick={handleUserBlockUnblock}
            >
              {t(`additionalButtons.${user.is_blocked ? "unblock" : "block"}`)}
            </button>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        message={modalConfig.message}
        onConfirm={async () => {
          await modalConfig.onConfirm();
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </>
  );
};

export default UserItem;
