// import { dummyBooks } from "../api/dummyBooks";
import { reservationsApi } from "../api/resarvations";
import { Book, BookStatus } from "../models/Book";

export async function booksToReviewLoader() {
  const response = await reservationsApi.getAllPending();

  if (response.status === 200) {
    return response.data
      .filter((el: Book) => el.status !== BookStatus.REVIEW)
      .map((el: Book) => ({
        ...el,
        key: el.id,
      }));
  }

  return [];

  // return dummyBooks;
}
