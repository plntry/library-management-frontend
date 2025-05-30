import { useTranslation } from "react-i18next";
import { Book, BookPage } from "../models/Book";
import { userAvailableBookActionsByPage } from "../constants/availableBookActions";
import { UserRoles } from "../models/User";
import BookActionsComp from "./BookActions";
import { useAuthStore } from "../store/useAuthStore";
import bookPlaceholderImg from "../assets/book-placeholder.avif";
import { getStatusBadgeClass } from "../utils/styleUtils";

const BookItem: React.FC<{
  book: Book;
  mode: BookPage;
  setModalConfig?: (config: {
    isOpen: boolean;
    message: string;
    onConfirm: () => Promise<void>;
  }) => void;
}> = ({ book, mode, setModalConfig }) => {
  const { t } = useTranslation();
  const role = useAuthStore((state) => state.user?.role) || UserRoles.READER;
  const availableActions = userAvailableBookActionsByPage[mode][role];

  return (
    <div key={book.id} className="card">
      <img src={bookPlaceholderImg} alt={book.title} className="card__image" />
      <div className="card__header">
        <h2 className="card__title">{book.title}</h2>
        <h2 className={`badge ${getStatusBadgeClass(book.status)}`}>
          {t(`book.${book.status}`)}
        </h2>
      </div>
      <p className="card__genre badge">{book.genre}</p>
      <p className="card__author">
        <span className="card__author-name">{t("book.author")}:</span>{" "}
        {book.author}
      </p>
      <BookActionsComp
        book={book}
        actions={availableActions}
        setModalConfig={setModalConfig}
      />
    </div>
  );
};

export default BookItem;
