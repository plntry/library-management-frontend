import { useLoaderData } from "react-router";
import BooksList from "../components/BooksList";

const AllBooks: React.FC = () => {
  const books = useLoaderData();

  return <BooksList data={books} />;
};

export default AllBooks;
