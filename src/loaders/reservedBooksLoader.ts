import { booksApi } from "../api/books";
import { ReservationBook } from "../models/Book";

export async function reservedBooksLoader() {
  const response = await booksApi.getReaderReservations();

  if (response.status === 200) {
    return response.data.map((el: ReservationBook) => ({
      ...el,
      id: el.book_id,
      status: el.book_status,
      key: el.book_id,
    }));
  }

  return [];
}
