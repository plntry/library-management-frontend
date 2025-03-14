export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  publication_year: number;
  genre: string;
  is_reserved: boolean;
}

export interface BookActionConfig {
  title: string;
  link: string;
  visible: {
    booksPage: boolean;
    detailsPage: boolean;
  };
  dynamicParam?: {
    stringToReplace: string;
    propName: keyof Book;
  };
  requiresOwnership?: boolean;
}

export type BookActions = Record<string, BookActionConfig>;

export type UserAvailableBookActions = {
  [role: string]: BookActionConfig[];
};
