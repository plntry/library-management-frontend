import React, { useState, useMemo } from "react";
import { Book } from "../models/Book";
import { useTranslation } from "react-i18next";
import BookItem from "./BookItem";
import { UserRoles } from "../models/User";
import { Link } from "react-router";
import { PATHS } from "../routes/paths";

interface BooksListProps {
  data: Book[];
}

const BooksList: React.FC<BooksListProps> = ({ data }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const role = UserRoles.LIBRARIAN; // TODO: add role after login

  const filteredBooks = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery) ||
        (book.publication_year + "").toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery);
      return matchesSearch;
    });
  }, [data, searchQuery]);

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t("allBooksPage.title")}</div>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        <input
          type="text"
          placeholder={t("allBooksPage.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search"
        />
        {role === UserRoles.LIBRARIAN && (
          <Link to={PATHS.NEW_BOOK.link} className="block w-full md:w-auto">
            <button className="button button--primary w-full">
              {t("additionalButtons.addNewBook")}
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
        {filteredBooks.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            {t("allBooksPage.noBooksMessage")}
          </p>
        )}
      </div>
    </div>
  );
};

export default BooksList;
