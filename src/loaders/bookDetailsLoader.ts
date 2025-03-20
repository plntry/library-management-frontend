import { Params } from "react-router";
import { dummyBooks } from "../api/dummyBooks";

export async function loader({ params }: { params: Params }) {
  // const response = await bookApi.getById(params.courseId || "");

  // if (response.status === 200) {
  //   return response.data;
  // }

  // return null;

  return dummyBooks.find((book) => book.id + "" === params.bookId);
}
