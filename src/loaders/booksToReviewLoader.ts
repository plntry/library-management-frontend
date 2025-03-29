import { dummyBooks } from "../api/dummyBooks";
// import { reservationsApi } from "../api/resarvations";

export async function booksToReviewLoader() {
  // const response = await reservationsApi.getAllPending();

  // if (response.status === 200) {
  //   return response.data.map((el: Book) => ({
  //     ...el,
  //     key: el.id,
  //   }));
  // }

  // return [];

  return dummyBooks;
}
