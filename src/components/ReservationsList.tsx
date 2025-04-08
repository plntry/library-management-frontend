import React, { useState, useMemo } from "react";
import { ReservationBook, ReservationPage } from "../models/Book";
import { useTranslation } from "react-i18next";
import ReservationItem from "./ReservationItem";
import { SearchBar, CardsContainer } from "./ui";

const ReservationsList: React.FC<{
  data: ReservationBook[];
  mode: ReservationPage;
}> = ({ data, mode }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReservations = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((reservation) => {
      const matchesSearch =
        reservation.title.toLowerCase().includes(lowerQuery) ||
        reservation.genre.toLowerCase().includes(lowerQuery) ||
        reservation.author.toLowerCase().includes(lowerQuery) ||
        reservation.user_email.toLowerCase().includes(lowerQuery) ||
        reservation.reservation_status.toLowerCase().includes(lowerQuery);
      return matchesSearch;
    });
  }, [data, searchQuery]);

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t(`${mode}.title`)}</div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholderKey={`${mode}.searchPlaceholder`}
      />
      <CardsContainer
        items={filteredReservations}
        renderItem={(reservation) => (
          <ReservationItem
            key={`${reservation.book_id}-${reservation.reservation_id}`}
            reservation={reservation}
            mode={mode}
          />
        )}
        emptyStateKey="noReservationsMessage"
        mode={mode}
      />
    </div>
  );
};

export default ReservationsList;
