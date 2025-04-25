import i18next from "i18next";
import {
  BookActions,
  BookPage,
  UserAvailableBookActions,
  UserAvailableBookActionsByPage,
  Book,
  BookStatus,
  ReservationStatus,
} from "../models/Book";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import { getUserAvailableBookActionsByPage } from "../utils/bookUtils";
import { reservationsApi } from "../api/reservations";
import { useAuthStore } from "../store/useAuthStore";
import { Notification } from "../contexts/NotificationContext";
import { booksApi } from "../api/books";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";

export const bookActions: BookActions = {
  more: {
    title: "",
    icon: MoreOutlined,
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
      [BookPage.ApprovedReservations]: false,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: false,
    },
    classes: "button button--secondary",
  },
  reserve: {
    title: i18next.t("allBooks.reserveButton"),
    link: "",
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: false,
      [BookPage.ApprovedReservations]: false,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: false,
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
      } catch (error) {
        const errorType: "error" | "reservationLimitError" =
          (error as { response?: { status: number } })?.response?.status === 400
            ? "reservationLimitError"
            : "error";
        addNotification({
          type: "error",
          message: i18next.t(
            `notifications.reservation.approve.${errorType}.message`
          ),
          description: i18next.t(
            `notifications.reservation.approve.${errorType}.description`
          ),
        });
      }
    },
  },
  edit: {
    title: "",
    icon: EditOutlined,
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
      [BookPage.ApprovedReservations]: false,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: false,
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
      [BookPage.ApprovedReservations]: false,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: false,
    },
    classes: "button button--primary",
    disabledIf: (book: Book) =>
      book.status === BookStatus.RESERVED ||
      book.status === BookStatus.AVAILABLE,
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void
    ) => {
      if (!dataToReplace || !addNotification || !book) return;
      try {
        const reservationId = book.reservation_id;
        if (!reservationId) return;

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 10);
        const formattedReturnDate = returnDate.toISOString().split("T")[0];

        await useAuthStore
          .getState()
          .withTokenRefresh(() =>
            reservationsApi.confirm(reservationId, formattedReturnDate)
          );
        book.status = BookStatus.RESERVED;
        book.reservation_status = ReservationStatus.CONFIRMED;
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
      [BookPage.MyBooks]: true,
      [BookPage.BooksToReview]: true,
      [BookPage.ApprovedReservations]: true,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: true,
    },
    classes: "button button--red",
    disabledIf: (book: Book) =>
      book.status === BookStatus.AVAILABLE ||
      (book.status === BookStatus.RESERVED &&
        book.reservation_status === ReservationStatus.CONFIRMED),
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void
    ) => {
      if (!dataToReplace || !addNotification || !book) return;
      try {
        const reservationId = (book as Book).reservation_id;
        if (!reservationId) return;

        await useAuthStore
          .getState()
          .withTokenRefresh(() => reservationsApi.decline(reservationId));
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
  delete: {
    title: "",
    icon: DeleteOutlined,
    link: "",
    visible: {
      [BookPage.AllBooks]: true,
      [BookPage.MyBooks]: false,
      [BookPage.BooksToReview]: false,
      [BookPage.ApprovedReservations]: false,
      [BookPage.BookDetails]: false,
      [BookPage.OverdueReservations]: false,
    },
    classes: "button button--red",
    onClick: async (
      dataToReplace?: number,
      _navigate?: (to: string) => void,
      _book?: Book,
      addNotification?: (notification: Omit<Notification, "id">) => void,
      setModalConfig?: (config: {
        isOpen: boolean;
        message: string;
        onConfirm: () => Promise<void>;
      }) => void
    ) => {
      if (!dataToReplace || !addNotification || !setModalConfig) {
        return;
      }

      setModalConfig({
        isOpen: true,
        message: i18next.t("confirmations.deleteBook"),
        onConfirm: async () => {
          try {
            await useAuthStore
              .getState()
              .withTokenRefresh(() =>
                booksApi.delete(dataToReplace.toString())
              );
            addNotification({
              type: "success",
              message: i18next.t("notifications.book.delete.success.message"),
              description: i18next.t(
                "notifications.book.delete.success.description"
              ),
            });
            window.location.reload();
          } catch {
            addNotification({
              type: "error",
              message: i18next.t("notifications.book.delete.error.message"),
              description: i18next.t(
                "notifications.book.delete.error.description"
              ),
            });
          }
        },
      });
    },
  },
};

export const userAvailableBookActions: UserAvailableBookActions = {
  [UserRoles.READER]: [
    bookActions.reserve,
    bookActions.declineReservation,
    bookActions.more,
  ],
  [UserRoles.LIBRARIAN]: [
    bookActions.edit,
    bookActions.delete,
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
