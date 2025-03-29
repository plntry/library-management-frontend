import { booksApi } from "../api/books";
import { Book } from "../models/Book";
// import { dummyBooks } from "../api/dummyBooks";

export async function reservedBooksLoader() {
  const response = await booksApi.getReaderReservations();

  if (response.status === 200) {
    return response.data.map((el: Book) => ({
      ...el,
      key: el.id,
    }));
  }

  return [];

  // return dummyBooks;
}
