import { GUEST_ROLE, UserRoles } from "../models/User";

export const PATHS = {
  HOME: { link: "/", roles: Object.values(UserRoles) },
  BOOKS: { link: "/books", roles: Object.values(UserRoles) },
  RESERVED_BOOKS: { link: "/books/reserved", roles: [UserRoles.READER] },
  BOOKS_TO_REVIEW: { link: "/books/review", roles: [UserRoles.LIBRARIAN] },
  APPROVED_RESERVATIONS: {
    link: "/books/approved",
    roles: [UserRoles.LIBRARIAN],
  },
  OVERDUE_RESERVATIONS: {
    link: "/books/overdue",
    roles: [UserRoles.LIBRARIAN],
  },
  USERS: { link: "/users", roles: [UserRoles.ADMIN, UserRoles.LIBRARIAN] },
  BOOK: { link: "/books/:bookId", roles: Object.values(UserRoles) },
  EDIT_BOOK: { link: "edit", roles: [UserRoles.LIBRARIAN] },
  DELETE_BOOK: { link: "delete", roles: [UserRoles.LIBRARIAN] },
  NEW_BOOK: { link: "/books/new", roles: [UserRoles.LIBRARIAN] },
  AUTH: { link: "/auth", roles: [GUEST_ROLE] },
  REQUEST_PASSWORD_RESET: {
    link: "/request-password-reset",
    roles: [GUEST_ROLE],
  },
  RESET_PASSWORD: {
    link: "/reset-password",
    roles: [GUEST_ROLE],
  },
  LOGOUT: { link: "logout", roles: Object.values(UserRoles) },
  NOT_FOUND: { link: "*", roles: [] },
} as const;

export const ROLE_PATHS = Object.entries(PATHS).reduce(
  (acc, [, { link, roles }]) => {
    roles.forEach((role) => {
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(link);
    });
    return acc;
  },
  {} as Record<string, string[]>
);
