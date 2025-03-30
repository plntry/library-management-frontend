import { RegisterOptions } from "react-hook-form";
import { Notification } from "../contexts/NotificationContext";

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  REVIEW = "PENDING",
  RESERVED = "CHECKED_OUT",
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
  // reservation_id?: number;
}

export type BookCreateUpdateData = Omit<Book, "id">;

export enum BookPage {
  AllBooks = "allBooks",
  MyBooks = "myBooks",
  BooksToReview = "booksToReview",
  BookDetails = "bookDetails",
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
    addNotification?: (notification: Omit<Notification, "id">) => void
  ) => void | Promise<void>;
  disabledIf?: keyof Book | ((book: Book) => boolean);
  classes?: string;
}

export type BookActions = Record<string, BookActionConfig>;

export type UserAvailableBookActions = {
  [role: string]: BookActionConfig[];
};

export type UserAvailableBookActionsByPage = Record<
  BookPage,
  UserAvailableBookActions
>;
