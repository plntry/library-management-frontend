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

export const routes = [
  {
    id: "root",
    path: PATHS.HOME.link,
    element: <RootLayout />,
    // loader: tokenLoader,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: checkAuthLoader,
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
            loader: allBooksLoader
          },
          {
            path: PATHS.RESERVED_BOOKS.link,
            // element: (
            //   <ProtectedRoute allowedRoles={[...PATHS.RESERVED_BOOKS.roles]}>
            //     <ReservedBooks />
            //   </ProtectedRoute>
            // ),
          },
        ]
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
