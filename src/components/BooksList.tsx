import React, { useState, useMemo } from "react";
import { Book } from "../models/Book";
import { useTranslation } from "react-i18next";

interface BooksListProps {
  data: Book[];
}

const BooksList: React.FC<BooksListProps> = ({ data }) => {
  const { t } = useTranslation();

  // State for the search query and filter
  const [searchQuery, setSearchQuery] = useState("");

  // Compute filtered list of books
  const filteredBooks = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery);
      return matchesSearch;
    });
  }, [data, searchQuery]);

  // Handlers for actions
  const handleMore = (book: Book) => {
    // Implement your "More" logic here (e.g., navigate to a details page)
    console.log("More details for:", book);
  };

  const handleEdit = (book: Book) => {
    // Implement your "Edit" logic here (e.g., open an edit modal or navigate to an edit page)
    console.log("Edit book:", book);
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t("allBooksPage.title")}</div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Year:</span>{" "}
              {book.publication_year}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-sm text-gray-700 mb-2">{book.description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleMore(book)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg transition"
              >
                More
              </button>
              <button
                onClick={() => handleEdit(book)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BooksList;
