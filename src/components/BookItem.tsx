import { useTranslation } from "react-i18next";
import { Book, BookPage } from "../models/Book";
import { userAvailableBookActionsByPage } from "../constants/availableBookActions";
import { UserRoles } from "../models/User";
import BookActionsComp from "./BookActions";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const { t } = useTranslation();
  const availableActions =
    userAvailableBookActionsByPage[BookPage.AllBooks][UserRoles.LIBRARIAN]; // TODO: update with correct role when the api is done

  return (
    <div key={book.id} className="card">
      <div className="card__header">
        <h2 className="card__title">{book.title}</h2>
        <h2
          className={`badge ${
            book.is_reserved ? "badge--red" : "badge--green"
          }`}
        >
          {book.is_reserved ? t("book.reserved") : t("book.available")}
        </h2>
      </div>
      <p className="card__genre badge">{book.genre}</p>
      <p className="card__author">
        <span className="card__author-name">Author:</span> {book.author}
      </p>
      <BookActionsComp book={book} actions={availableActions} />
    </div>
  );
};

export default BookItem;
