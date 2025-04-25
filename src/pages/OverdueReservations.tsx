import { useLoaderData } from "react-router";
import ReservationsList from "../components/ReservationsList";
import { ReservationPage } from "../models/Book";

const OverdueReservations: React.FC = () => {
  const reservations = useLoaderData();

  return (
    <ReservationsList
      data={reservations}
      mode={ReservationPage.OverdueReservations}
    />
  );
};

export default OverdueReservations;
