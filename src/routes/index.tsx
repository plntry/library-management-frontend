import { PATHS } from "./paths";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import Loader from "../components/Loader";
import { checkAuthLoader, tokenLoader } from "../utils/authUtils";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

export const routes = [
  {
    id: "root",
    path: PATHS.HOME,
    element: <RootLayout />,
    loader: tokenLoader,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: checkAuthLoader,
      },
      {
        path: PATHS.NOT_FOUND,
        element: <ErrorPage />,
        loader: checkAuthLoader,
      },
    ],
  },
  {
    path: PATHS.AUTH,
    element: <AuthPage />,
  },
];
