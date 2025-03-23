import { useLoaderData } from "react-router";
import BooksList from "../components/BooksList";
import { BookPage } from "../models/Book";

const BooksToReview: React.FC = () => {
  const books = useLoaderData();

  return <BooksList data={books} mode={BookPage.BooksToReview} />;
};

export default BooksToReview;
