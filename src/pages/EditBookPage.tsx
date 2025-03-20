import { useRouteLoaderData } from "react-router";
import BookForm from "../components/BookForm";
import { Book } from "../models/Book";

const EditBookPage: React.FC = () => {
  const book: Book | undefined = useRouteLoaderData("bookDetails");

  return <BookForm book={book} />;
};

export default EditBookPage;
