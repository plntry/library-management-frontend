import i18next from "i18next";
import {
  BookActions,
  BookPage,
  UserAvailableBookActions,
  UserAvailableBookActionsByPage,
  Book,
  BookStatus,
} from "../models/Book";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import { getUserAvailableBookActionsByPage } from "../utils/bookUtils";
import { reservationsApi } from "../api/resarvations";
import { useAuthStore } from "../store/useAuthStore";
import { Notification } from "../contexts/NotificationContext";

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
    disabledIf: (book: Book) => book.status !== BookStatus.AVAILABLE,
    classes: "button button--primary",
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void
    ) => {
      if (!dataToReplace || !book || !addNotification) return;
      try {
        await useAuthStore
          .getState()
          .withTokenRefresh(() => reservationsApi.create(dataToReplace));
        book.status = BookStatus.RESERVED;
        addNotification({
          type: "success",
          message: i18next.t("notifications.reservation.success.message"),
          description: i18next.t(
            "notifications.reservation.success.description"
          ),
        });
      } catch {
        addNotification({
          type: "error",
          message: i18next.t("notifications.reservation.error.message"),
          description: i18next.t("notifications.reservation.error.description"),
        });
      }
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
      [BookPage.BookDetails]: true,
    },
    classes: "button button--primary",
    disabledIf: (book: Book) => book.status === BookStatus.RESERVED,
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void
    ) => {
      if (!dataToReplace || !addNotification || !book) return;
      try {
        await useAuthStore
          .getState()
          .withTokenRefresh(() => reservationsApi.confirm(dataToReplace));
        book.status = BookStatus.RESERVED;
        addNotification({
          type: "success",
          message: i18next.t(
            "notifications.reservation.approve.success.message"
          ),
          description: i18next.t(
            "notifications.reservation.approve.success.description"
          ),
        });
      } catch {
        addNotification({
          type: "error",
          message: i18next.t("notifications.reservation.approve.error.message"),
          description: i18next.t(
            "notifications.reservation.approve.error.description"
          ),
        });
      }
    },
  },
  declineReservation: {
    title: i18next.t("additionalButtons.decline"),
    link: "",
    visible: {
      [BookPage.AllBooks]: false,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: true,
      [BookPage.BookDetails]: true,
    },
    classes: "button button--red",
    disabledIf: (book: Book) => book.status === BookStatus.AVAILABLE,
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void
    ) => {
      if (!dataToReplace || !addNotification || !book) return;
      try {
        await useAuthStore
          .getState()
          .withTokenRefresh(() => reservationsApi.decline(dataToReplace));
        book.status = BookStatus.AVAILABLE;
        addNotification({
          type: "success",
          message: i18next.t(
            "notifications.reservation.decline.success.message"
          ),
          description: i18next.t(
            "notifications.reservation.decline.success.description"
          ),
        });
      } catch {
        addNotification({
          type: "error",
          message: i18next.t("notifications.reservation.decline.error.message"),
          description: i18next.t(
            "notifications.reservation.decline.error.description"
          ),
        });
      }
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
