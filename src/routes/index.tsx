import { PATHS } from "./paths";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import Loader from "../components/Loader";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import BooksLayout from "../pages/BooksLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AllBooks from "../pages/AllBooks";
import { allBooksLoader } from "../loaders/allBooksLoader";
import { bookDetailsLoader } from "../loaders/bookDetailsLoader";
import BookDetails from "../pages/BookDetails";
import { rootLoader } from "../utils/authUtils";
import { action as logoutAction } from "../pages/Logout";
import NewBookPage from "../pages/NewBookPage";
import EditBookPage from "../pages/EditBookPage";
import ReservedBooks from "../pages/ReservedBooks";
import { reservedBooksLoader } from "../loaders/reservedBooksLoader";
import BooksToReview from "../pages/BooksToReview";
import { booksToReviewLoader } from "../loaders/booksToReviewLoader";
import ResetPasswordRequest from "../components/ResetPasswordRequest";
import ResetPassword from "../components/ResetPassword";
import ApprovedReservations from "../pages/ApprovedReservations";
import { approvedReservationsLoader } from "../loaders/approvedReservationsLoader";

export const routes = [
  {
    id: "root",
    path: PATHS.HOME.link,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        id: "booksRoot",
        path: PATHS.BOOKS.link,
        element: <BooksLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[...PATHS.BOOKS.roles]}>
                <AllBooks />
              </ProtectedRoute>
            ),
            loader: allBooksLoader,
          },
          {
            path: PATHS.RESERVED_BOOKS.link,
            element: (
              <ProtectedRoute allowedRoles={[...PATHS.RESERVED_BOOKS.roles]}>
                <ReservedBooks />
              </ProtectedRoute>
            ),
            loader: reservedBooksLoader,
          },
          {
            path: PATHS.BOOKS_TO_REVIEW.link,
            element: (
              <ProtectedRoute allowedRoles={[...PATHS.BOOKS_TO_REVIEW.roles]}>
                <BooksToReview />
              </ProtectedRoute>
            ),
            loader: booksToReviewLoader,
          },
          {
            path: PATHS.APPROVED_RESERVATIONS.link,
            element: (
              <ProtectedRoute
                allowedRoles={[...PATHS.APPROVED_RESERVATIONS.roles]}
              >
                <ApprovedReservations />
              </ProtectedRoute>
            ),
            loader: approvedReservationsLoader,
          },
          {
            id: "bookDetails",
            path: PATHS.BOOK.link,
            loader: bookDetailsLoader,
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute allowedRoles={[...PATHS.BOOK.roles]}>
                    <BookDetails />
                  </ProtectedRoute>
                ),
              },
              {
                path: PATHS.EDIT_BOOK.link,
                element: (
                  <ProtectedRoute allowedRoles={[...PATHS.EDIT_BOOK.roles]}>
                    <EditBookPage />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: PATHS.NEW_BOOK.link,
            element: (
              <ProtectedRoute allowedRoles={[...PATHS.NEW_BOOK.roles]}>
                <NewBookPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: PATHS.LOGOUT.link,
        element: <ProtectedRoute allowedRoles={[...PATHS.LOGOUT.roles]} />,
        children: [{ index: true }],
        action: logoutAction,
      },
      {
        path: PATHS.NOT_FOUND.link,
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: PATHS.AUTH.link,
    element: <AuthPage />,
  },
  {
    path: PATHS.REQUEST_PASSWORD_RESET.link,
    element: <ResetPasswordRequest />,
  },
  {
    path: PATHS.RESET_PASSWORD.link,
    element: <ResetPassword />,
  },
];
