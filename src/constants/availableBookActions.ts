import i18next from "i18next";
import {
  BookActions,
  BookPage,
  UserAvailableBookActions,
  UserAvailableBookActionsByPage,
} from "../models/Book";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import { getUserAvailableBookActionsByPage } from "../utils/bookUtils";

export const bookActions: BookActions = {
  more: {
    title: i18next.t("allBooksPage.moreButton"),
    link: PATHS.BOOK.link,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    onClick: function (
      dataToReplace?: string,
      navigate?: (to: string) => void
    ): void {
      if (!dataToReplace || !navigate) return;

      const dynamicLink = this.dynamicParam
        ? this.link.replace(this.dynamicParam.stringToReplace, dataToReplace)
        : this.link;

      navigate(dynamicLink);
    },
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: true,
      [BookPage.BookDetails]: false,
    },
    classes: "button button--secondary",
  },
  reserve: {
    title: i18next.t("allBooksPage.reserveButton"),
    link: "",
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: false,
      [BookPage.BookDetails]: true,
    },
    disabledIf: "is_reserved",
    classes: "button button--primary",
  },
  edit: {
    title: i18next.t("allBooksPage.editButton"),
    link: `${PATHS.BOOK.link}/${PATHS.EDIT_BOOK.link}`,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    onClick: function (
      dataToReplace?: string,
      navigate?: (to: string) => void
    ): void {
      if (!dataToReplace || !navigate) return;

      const dynamicLink = this.dynamicParam
        ? this.link.replace(this.dynamicParam.stringToReplace, dataToReplace)
        : this.link;

      navigate(dynamicLink);
    },
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: false,
      [BookPage.BookDetails]: true,
    },
    classes: "button",
  },
};

export const userAvailableBookActions: UserAvailableBookActions = {
  [UserRoles.READER]: [bookActions.reserve, bookActions.more],
  [UserRoles.LIBRARIAN]: [bookActions.edit, bookActions.more],
};

// each page should include only actions which should be visible on that page
export const userAvailableBookActionsByPage: UserAvailableBookActionsByPage =
  Object.fromEntries(
    Object.values(BookPage).map((page) => [
      page,
      getUserAvailableBookActionsByPage(page as BookPage),
    ])
  ) as UserAvailableBookActionsByPage;
