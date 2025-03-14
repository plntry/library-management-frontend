import { Outlet, useLocation } from "react-router";
import { PATHS } from "../routes/paths";
import GoBackButton from "../components/GoBackButton";

const BooksLayout: React.FC = () => {
  const location = useLocation();
  const isBooksPage =
    location.pathname === PATHS.BOOKS.link ||
    location.pathname === PATHS.RESERVED_BOOKS.link;

  return (
    <div className="h-full w-full flex flex-col gap-2">
      {!isBooksPage && <GoBackButton />}
      <Outlet />
    </div>
  );
};

export default BooksLayout;
