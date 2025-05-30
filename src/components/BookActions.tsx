import { useNavigate } from "react-router";
import { Book, BookActionConfig } from "../models/Book";
import { useNotification } from "../hooks/useNotification";
import React from "react";

const BookActionsComp: React.FC<{
  book: Book;
  actions: BookActionConfig[];
  setModalConfig?: (config: {
    isOpen: boolean;
    message: string;
    onConfirm: () => Promise<void>;
  }) => void;
}> = ({ book, actions = [], setModalConfig }) => {
  const navigate = useNavigate();
  const addNotification = useNotification();

  const renderActionButtons = () => {
    return actions.map((action, index) => {
      const isDisabled =
        typeof action.disabledIf === "function"
          ? action.disabledIf(book)
          : action.disabledIf
          ? !!book[action.disabledIf]
          : false;

      return (
        <button
          disabled={isDisabled}
          key={index}
          className={`px-4 py-2 rounded transition-colors focus:outline-none ${
            action.classes
              ? action.classes
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => {
            action.onClick?.(
              book.id,
              navigate,
              book,
              addNotification,
              setModalConfig
            );
          }}
        >
          {action.icon ? React.createElement(action.icon) : action.title}
        </button>
      );
    });
  };

  return <div className="card__footer">{renderActionButtons()}</div>;
};

export default BookActionsComp;
