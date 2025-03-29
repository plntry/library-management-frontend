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
import { reservationsApi } from "../api/resarvations";
import { useAuthStore } from "../store/useAuthStore";

export const bookActions: BookActions = {
  more: {
    title: i18next.t("allBooksPage.moreButton"),
    link: PATHS.BOOK.link,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    onClick: function (
      dataToReplace?: number,
      navigate?: (to: string) => void
    ): void {
      if (!dataToReplace || !navigate) return;

      const dynamicLink = this.dynamicParam
        ? this.link.replace(
            this.dynamicParam.stringToReplace,
            dataToReplace + ""
          )
        : this.link;

      navigate(dynamicLink);
    },
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: true,
      [BookPage.BooksToReview]: false,
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
      [BookPage.BooksToReview]: false,
      [BookPage.BookDetails]: true,
    },
    disabledIf: "status",
    classes: "button button--primary",
    onClick: async (dataToReplace?: number) => {
      if (!dataToReplace) return;
      await useAuthStore
        .getState()
        .withTokenRefresh(() => reservationsApi.create(dataToReplace));
    },
  },
  edit: {
    title: i18next.t("allBooksPage.editButton"),
    link: `${PATHS.BOOK.link}/${PATHS.EDIT_BOOK.link}`,
    dynamicParam: {
      stringToReplace: ":bookId",
      propName: "id",
    },
    onClick: function (
      dataToReplace?: number,
      navigate?: (to: string) => void
    ): void {
      if (!dataToReplace || !navigate) return;

      const dynamicLink = this.dynamicParam
        ? this.link.replace(
            this.dynamicParam.stringToReplace,
            dataToReplace + ""
          )
        : this.link;

      navigate(dynamicLink);
    },
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: false,
      [BookPage.BookDetails]: true,
    },
    classes: "button",
  },
  approveReservation: {
    title: i18next.t("additionalButtons.approve"),
    link: "",
    visible: {
      [BookPage.AllBooks]: false,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: true,
      [BookPage.BookDetails]: false,
    },
    classes: "button button--primary",
    onClick: async (dataToReplace?: number) => {
      if (!dataToReplace) return;
      await useAuthStore
        .getState()
        .withTokenRefresh(() => reservationsApi.confirm(dataToReplace));
    },
  },
  declineReservation: {
    title: i18next.t("additionalButtons.decline"),
    link: "",
    visible: {
      [BookPage.AllBooks]: false,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: true,
      [BookPage.BookDetails]: false,
    },
    classes: "button button--red",
    onClick: async (dataToReplace?: number) => {
      if (!dataToReplace) return;
      await useAuthStore
        .getState()
        .withTokenRefresh(() => reservationsApi.decline(dataToReplace));
    },
  },
};

export const userAvailableBookActions: UserAvailableBookActions = {
  [UserRoles.READER]: [bookActions.reserve, bookActions.more],
  [UserRoles.LIBRARIAN]: [
    bookActions.edit,
    bookActions.approveReservation,
    bookActions.declineReservation,
    bookActions.more,
  ],
};

// each page should include only actions which should be visible on that page
export const userAvailableBookActionsByPage: UserAvailableBookActionsByPage =
  Object.fromEntries(
    Object.values(BookPage).map((page) => [
      page,
      getUserAvailableBookActionsByPage(page as BookPage),
    ])
  ) as UserAvailableBookActionsByPage;
