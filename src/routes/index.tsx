import { PATHS } from "./paths";
import RootLayout from "../pages/RootLayout";

export const routes = [
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    id: "root",
    // loader: tokenLoader,
    // HydrateFallback: Loader,
    // children: [
    //   {
    //     index: true,
    //     element: <Home />,
    //     loader: checkAuthLoader,
    //   },
    //   {
    //     path: PATHS.LOGOUT,
    //     action: logoutAction,
    //   },
    //   {
    //     path: PATHS.NOT_FOUND,
    //     element: <ErrorPage />,
    //   },
    // ],
  },
  // {
  //   path: PATHS.AUTH,
  //   element: <AuthPage />,
  // },
];
