import { useNavigate } from "react-router";
import { Book, BookActionConfig } from "../models/Book";

const BookActionsComp: React.FC<{
  book: Book;
  actions: BookActionConfig[];
}> = ({ book, actions = [] }) => {
  const navigate = useNavigate();

  const renderActionButtons = () => {
    return actions.map((action, index) => {
      return (
        <button
          disabled={action.disabledIf ? !!book[action.disabledIf] : false}
          key={index}
          className={`px-4 py-2 rounded transition-colors focus:outline-none ${
            action.classes
              ? action.classes
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => action.onClick?.(book.id, navigate)}
        >
          {action.title}
        </button>
      );
    });
  };

  return <div className="card__footer">{renderActionButtons()}</div>;
};

export default BookActionsComp;
