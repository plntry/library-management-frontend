import { RegisterOptions } from "react-hook-form";

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  REVIEW = "REVIEW",
}

export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  publication_year: number;
  genre: string;
  status: BookStatus;
}

export enum BookPage {
  AllBooks = "allBooks",
  MyBooks = "myBooks",
  BooksToReview = "booksToReview",
  BookDetails = "bookDetails",
}

export interface BookInputData
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: keyof Book;
  validation?: RegisterOptions<Book>;
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
    additionalData?: unknown
  ) => void;
  disabledIf?: keyof Book;
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
