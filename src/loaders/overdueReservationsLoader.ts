import { reservationsApi } from "../api/reservations";
import { ReservationBook, ReservationStatus } from "../models/Book";

export async function overdueReservationsLoader() {
  const response = await reservationsApi.getAllByStatus(
    ReservationStatus.CONFIRMED
  );

  if (response.status === 200) {
    return response.data
      .filter((el: ReservationBook) => el.is_overdue)
      .map((el: ReservationBook) => ({
        ...el,
        key: el.reservation_id,
      }));
  }

  return [];
}
