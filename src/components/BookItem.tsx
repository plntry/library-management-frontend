import { useTranslation } from "react-i18next";
import { Book } from "../models/Book";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const { t } = useTranslation();

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
      <div className="card__footer">
        <button
          // onClick={() => handleMore(book)}
          className="button button--secondary"
        >
          {t("allBooksPage.moreButton")}
        </button>
        <button
          // onClick={() => handleEdit(book)}
          className="button"
        >
          {t("allBooksPage.editButton")}
        </button>
      </div>
    </div>
  );
};

export default BookItem;
