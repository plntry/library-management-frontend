import { BookStatus, ReservationStatus } from "../models/Book";
import { UserStatus } from "../models/User";

export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case BookStatus.AVAILABLE:
    case UserStatus.ACTIVE:
      return "badge--green";
    case BookStatus.REVIEW:
    case ReservationStatus.REVIEW:
      return "badge--yellow";
    case BookStatus.RESERVED:
    case ReservationStatus.CONFIRMED:
      return "badge--purple";
    default:
      return "badge--red";
  }
};
