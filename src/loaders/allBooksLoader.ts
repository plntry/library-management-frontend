// import { booksApi } from "../api/books";
import { dummyBooks } from "../api/dummyBooks";
// import { Book } from "../models/Book";

export async function allBooksLoader() {
  // const response = await booksApi.getAll();

  // if (response.status === 200) {
  //   return response.data.map((el: Book) => ({
  //     ...el,
  //     key: el.id,
  //   }));
  // }

  // return [];

  return dummyBooks;
}
