import { Params } from "react-router";
// import { dummyBooks } from "../api/dummyBooks";
import { booksApi } from "../api/books";

export async function bookDetailsLoader({ params }: { params: Params }) {
  const response = await booksApi.getById(params.bookId || "");

  if (response.status === 200) {
    return response.data;
  }

  return null;

  // return dummyBooks.find((book) => book.id + "" === params.bookId);
}
