import React from "react";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button onClick={onCancel} className="button button--secondary">
            {t("additionalButtons.no")}
          </button>
          <button onClick={onConfirm} className="button button--red">
            {t("additionalButtons.yes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
