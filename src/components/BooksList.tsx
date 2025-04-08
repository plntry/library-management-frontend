import React, { useState, useMemo } from "react";
import { Book, BookPage } from "../models/Book";
import { useTranslation } from "react-i18next";
import BookItem from "./BookItem";
import { UserRoles } from "../models/User";
import { Link } from "react-router";
import { PATHS } from "../routes/paths";
import { useAuthStore } from "../store/useAuthStore";
import ConfirmationModal from "./ConfirmationModal";
import { SearchBar, CardsContainer } from "./ui";

const BooksList: React.FC<{
  data: Book[];
  mode?: BookPage;
}> = ({ data, mode = BookPage.AllBooks }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const role = useAuthStore((state) => state.user?.role) || UserRoles.READER;
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    message: "",
    onConfirm: async () => {},
  });

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

  const additionalContent = role === UserRoles.LIBRARIAN &&
    mode === BookPage.AllBooks && (
      <Link to={PATHS.NEW_BOOK.link} className="block w-full md:w-auto">
        <button className="button button--primary w-full">
          {t("additionalButtons.addNewBook")}
        </button>
      </Link>
    );

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t(`${mode}.title`)}</div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholderKey="allBooks.searchPlaceholder"
        additionalContent={additionalContent}
      />
      <CardsContainer
        items={filteredBooks}
        renderItem={(book) => (
          <BookItem
            key={book.id}
            book={book}
            mode={mode}
            setModalConfig={setModalConfig}
          />
        )}
        emptyStateKey="noBooksMessage"
        mode={mode}
      />
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        message={modalConfig.message}
        onConfirm={async () => {
          await modalConfig.onConfirm();
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </div>
  );
};

export default BooksList;
