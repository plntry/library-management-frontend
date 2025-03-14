import { BookActions, UserAvailableBookActions } from "../models/Book";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import { getUserAvailableBookActionsByPage } from "../utils/bookUtils";

export const bookActions: BookActions = {
  more: {
    title: "More...",
    link: PATHS.BOOK.link,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    visible: {
      booksPage: true,
      detailsPage: false,
    },
  },
  enroll: {
    title: "Enroll",
    link: "",
    visible: {
      booksPage: true,
      detailsPage: true,
    },
  },
  edit: {
    title: "Edit",
    link: `${PATHS.BOOK.link}/${PATHS.EDIT_BOOK.link}`,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    visible: {
      booksPage: true,
      detailsPage: true,
    },
    requiresOwnership: true,
  },
  delete: {
    title: "Delete",
    link: "",
    dynamicParam: {
      stringToReplace: ":courseId",
      propName: "id",
    },
    visible: {
      booksPage: true,
      detailsPage: true,
    },
    requiresOwnership: true,
  },
};

export const userAvailableBookActions: UserAvailableBookActions = {
  [UserRoles.READER]: [bookActions.enroll, bookActions.more],
  [UserRoles.LIBRARIAN]: [
    bookActions.edit,
    bookActions.delete,
    bookActions.more,
  ],
};

// each page should include only actions which should be visible on that page
export const userAvailableBookActionsBooksPage: UserAvailableBookActions =
  getUserAvailableBookActionsByPage("booksPage");
export const userAvailableBookActionsDetailsPage: UserAvailableBookActions =
  getUserAvailableBookActionsByPage("detailsPage");
