import { reservationsApi } from "../api/reservations";
import { ReservationBook, ReservationStatus } from "../models/Book";

export async function booksToReviewLoader() {
  const response = await reservationsApi.getAllByStatus(
    ReservationStatus.REVIEW
  );

  if (response.status === 200) {
    return response.data.map((el: ReservationBook) => ({
      ...el,
      key: el.reservation_id,
    }));
  }

  return [];
}
