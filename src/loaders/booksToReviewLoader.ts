// import { dummyBooks } from "../api/dummyBooks";
// import { booksApi } from "../api/books";
import { reservationsApi } from "../api/resarvations";
import { Book, BookStatus } from "../models/Book";

export async function booksToReviewLoader() {
  const response = await reservationsApi.getAllPending();
  // const response = await reservationsApi.getAllByType("PENDING");

  if (response.status === 200) {
    return response.data
      .filter((el: Book) => el.status !== BookStatus.REVIEW)
      .map((el: Book) => ({
        ...el,
        // id: el.reservation_id,
        key: el.id,
      }));
  }

  return [];

  // return dummyBooks;
}
