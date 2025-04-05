import React from "react";
import { useNavigate, useRouteLoaderData } from "react-router";
import { Book, BookActionConfig, BookPage, BookStatus } from "../models/Book";
import { userAvailableBookActionsByPage } from "../constants/availableBookActions";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import bookDetailsBg from "../assets/details-books-bg.jpg";
import { useTranslation } from "react-i18next";
import BookActionsComp from "../components/BookActions";
import { useAuthStore } from "../store/useAuthStore";
import { getStatusBadgeClass } from "../utils/styleUtils";

interface BookDetail {
  label: string;
  value: string | number;
}

const BookDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.user?.role) || UserRoles.READER;
  const book = useRouteLoaderData("bookDetails") as Book | undefined;
  if (!book) {
    navigate(PATHS.HOME.link);
    return null;
  }

  const availableActions: BookActionConfig[] =
    userAvailableBookActionsByPage[BookPage.BookDetails][role];

  const bookDetails: BookDetail[] = [
    {
      label: t("book.status"),
      value: t(`book.${book.status}`),
    },
    {
      label: t("book.author"),
      value: book.author,
    },
    {
      label: t("book.publicationYear"),
      value: book.publication_year,
    },
    {
      label: t("book.genre"),
      value: book.genre,
    },
    {
      label: t("book.language"),
      value: book.language,
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex flex-col justify-center items-center gap-4 shadow rounded-lg p-6">
        <div
          className="flex flex-col shadow rounded-lg w-full h-full"
          style={{ backgroundImage: `url(${bookDetailsBg})` }}
        >
          <div className="bg-black/50 flex flex-col gap-1 justify-center text-center items-center rounded-lg w-full p-10">
            <h2 className="text-xl font-extrabold tracking-tight text-primary-100">
              {book.title}
            </h2>
            <p className="text-white font-semibold">{book.description}</p>
          </div>
        </div>
        <div className="mb-4 space-y-2">
          {bookDetails.map((el, index) => {
            const isStatusElement = el.label === t("book.status");

            return (
              <div
                key={index}
                className={`bg-primary-100 rounded-sm px-2 py-1 text-10 ${
                  isStatusElement &&
                  getStatusBadgeClass(book.status as BookStatus)
                }`}
              >
                <span className="font-semibold">{el.label}: </span>
                <span className="font-semibold">{el.value}</span>
              </div>
            );
          })}
        </div>
        <BookActionsComp book={book} actions={availableActions} />
      </div>
    </div>
  );
};

export default BookDetails;
