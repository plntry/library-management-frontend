import { useLoaderData } from "react-router";
import BooksList from "../components/BooksList";
import { BookPage } from "../models/Book";

const ReservedBooks: React.FC = () => {
  const books = useLoaderData();

  return <BooksList data={books} mode={BookPage.MyBooks} />;
};

export default ReservedBooks;
