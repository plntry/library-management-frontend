import { useLoaderData } from "react-router";
import ReservationsList from "../components/ReservationsList";

const BooksToReview: React.FC = () => {
  const reservations = useLoaderData();

  return <ReservationsList data={reservations} />;
};

export default BooksToReview;
