import { useTranslation } from "react-i18next";
import {
  ReservationBook,
  BookStatus,
  ReservationStatus,
  Book,
  ReservationPage,
} from "../models/Book";
import { userAvailableBookActionsByPage } from "../constants/availableBookActions";
import { UserRoles } from "../models/User";
import BookActionsComp from "./BookActions";
import { useAuthStore } from "../store/useAuthStore";
import bookPlaceholderImg from "../assets/book-placeholder.avif";
import { getStatusBadgeClass } from "../utils/styleUtils";

const ReservationItem: React.FC<{
  reservation: ReservationBook;
  mode: ReservationPage;
}> = ({ reservation, mode }) => {
  const { t } = useTranslation();
  const role = useAuthStore((state) => state.user?.role) || UserRoles.READER;

  const bookData: Book = {
    id: reservation.book_id,
    title: reservation.title,
    author: reservation.author,
    genre: reservation.genre,
    language: reservation.language,
    status: reservation.book_status as BookStatus,
    description: "",
    publication_year: 0,
    reservation_id: reservation.reservation_id,
  };

  return (
    <div className="card">
      <img
        src={bookPlaceholderImg}
        alt={reservation.title}
        className="card__image"
      />
      <div className="card__header">
        <h2 className="card__title">{reservation.title}</h2>
        <h2
          className={`badge ${getStatusBadgeClass(
            reservation.reservation_status
          )}`}
        >
          {t(
            `reservation.${reservation.reservation_status as ReservationStatus}`
          )}
        </h2>
      </div>
      <div className="card__general-data">
        <span className="card__author-name">{t("reservation.userEmail")}:</span>{" "}
        {reservation.user_email}
        <p>
          <span className="card__author-name">
            {t(
              `reservation.${
                mode === ReservationPage.BooksToReview
                  ? "reservedAt"
                  : "approvedAt"
              }`
            )}
            :
          </span>{" "}
          {new Date(reservation.RESERVED_at).toLocaleDateString()}
        </p>
      </div>
      <BookActionsComp
        book={bookData}
        actions={userAvailableBookActionsByPage[mode][role]}
      />
    </div>
  );
};

export default ReservationItem;
