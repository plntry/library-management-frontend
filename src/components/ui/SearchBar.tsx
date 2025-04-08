import React from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholderKey:
    | "allBooks.searchPlaceholder"
    | "booksToReview.searchPlaceholder"
    | "approvedReservations.searchPlaceholder"
    | "users.searchPlaceholder";
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
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
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
