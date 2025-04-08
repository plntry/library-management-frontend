import { useLoaderData } from "react-router";
import UsersList from "../components/UsersList";

const UsersPage: React.FC = () => {
  const users = useLoaderData();

  return <UsersList data={users} />;
};

export default UsersPage;
