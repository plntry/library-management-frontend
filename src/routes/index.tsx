import { PATHS } from "./paths";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import Loader from "../components/Loader";
// import { checkAuthLoader, tokenLoader } from "../utils/authUtils";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import BooksLayout from "../pages/BooksLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AllBooks from "../pages/AllBooks";
import { loader as allBooksLoader } from "../loaders/allBooksLoader";
import { loader as bookDetailsLoader } from "../loaders/bookDetailsLoader";
import BookDetails from "../pages/BookDetails";
import { rootLoader } from "../utils/authUtils";
import { action as logoutAction } from "../pages/Logout";
import NewBookPage from "../pages/NewBookPage";
import EditBookPage from "../pages/EditBookPage";

export const routes = [
  {
    id: "root",
    path: PATHS.HOME.link,
    element: <RootLayout />,
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
            // element: (
            //   <ProtectedRoute allowedRoles={[...PATHS.RESERVED_BOOKS.roles]}>
            //     <MyBooks />
            //   </ProtectedRoute>
            // ),
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
        // loader: checkAuthLoader,
      },
    ],
  },
  {
    path: PATHS.AUTH.link,
    element: <AuthPage />,
  },
];
