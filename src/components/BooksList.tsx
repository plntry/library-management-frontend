import React, { useState, useMemo } from "react";
import { Book, BookActionConfig } from "../models/Book";
import { useTranslation } from "react-i18next";
import BookItem from "./BookItem";
import { userAvailableBookActionsBooksPage } from "../constants/availableBookActions";
import { UserRoles } from "../models/User";

interface BooksListProps {
  data: Book[];
}

const BooksList: React.FC<BooksListProps> = ({ data }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const availableActions: BookActionConfig[] =
    userAvailableBookActionsBooksPage[UserRoles.LIBRARIAN];
  console.log({ availableActions });

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

  // const handleMore = (book: Book) => {
  //   console.log("More details for:", book);
  // };

  // const handleEdit = (book: Book) => {
  //   console.log("Edit book:", book);
  // };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t("allBooksPage.title")}</div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <input
          type="text"
          placeholder={t("allBooksPage.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search"
        />
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
