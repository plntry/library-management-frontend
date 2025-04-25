import { RegisterOptions } from "react-hook-form";
import { Notification } from "../contexts/NotificationContext";
import { IconBaseProps } from "@ant-design/icons/lib/components/Icon";

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  REVIEW = "RESERVED",
  RESERVED = "CHECKED_OUT",
}

export enum ReservationStatus {
  REVIEW = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELED",
}

export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  publication_year: number;
  genre: string;
  language: string;
  status: BookStatus;
  reservation_id?: number;
  reservation_status?: ReservationStatus;
}

export interface ReservationBook {
  book_id: number;
  author: string;
  title: string;
  genre: string;
  language: string;
  book_status: BookStatus | ReservationStatus;
  reservation_id: number;
  reservation_status: string;
  reserved_at: string;
  return_date: string;
  is_overdue: boolean;
  user_email: string;
  user_id: number;
}

export type BookCreateUpdateData = Omit<Book, "id">;

export enum BookPage {
  AllBooks = "allBooks",
  MyBooks = "myBooks",
  BooksToReview = "booksToReview",
  ApprovedReservations = "approvedReservations",
  OverdueReservations = "overdueReservations",
  BookDetails = "bookDetails",
}

export enum ReservationPage {
  BooksToReview = BookPage.BooksToReview,
  ApprovedReservations = BookPage.ApprovedReservations,
  OverdueReservations = BookPage.OverdueReservations,
}

export interface BookInputData
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: keyof BookCreateUpdateData;
  validation?: RegisterOptions<BookCreateUpdateData>;
}

export interface BookActionConfig {
  title: string;
  link: string;
  visible: Record<BookPage, boolean>;
  dynamicParam?: {
    stringToReplace: string;
    propName: keyof Book;
  };
  onClick?: (
    dataToReplace?: number,
    navigate?: (to: string) => void,
    book?: Book,
    addNotification?: (notification: Omit<Notification, "id">) => void,
    setModalConfig?: (config: {
      isOpen: boolean;
      message: string;
      onConfirm: () => Promise<void>;
    }) => void
  ) => void | Promise<void>;
  disabledIf?: keyof Book | ((book: Book) => boolean);
  classes?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export type BookActions = Record<string, BookActionConfig>;

export type UserAvailableBookActions = {
  [role: string]: BookActionConfig[];
};

export type UserAvailableBookActionsByPage = Record<
  BookPage,
  UserAvailableBookActions
>;
