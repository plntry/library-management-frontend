import React from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholderKey:
    | "allBooks.searchPlaceholder"
    | "booksToReview.searchPlaceholder"
    | "approvedReservations.searchPlaceholder"
    | "users.searchPlaceholder"
    | "overdueReservations.searchPlaceholder";
  additionalContent?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholderKey,
  additionalContent,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder={t(placeholderKey)}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search"
      />
      {additionalContent}
    </div>
  );
};

export default SearchBar;
