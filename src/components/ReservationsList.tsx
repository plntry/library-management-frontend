import React, { useState, useMemo } from "react";
import { ReservationBook, ReservationPage } from "../models/Book";
import { useTranslation } from "react-i18next";
import ReservationItem from "./ReservationItem";

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
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        <input
          type="text"
          placeholder={t(`${mode}.searchPlaceholder`)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReservations.map((reservation) => (
          <ReservationItem
            key={`${reservation.book_id}-${reservation.reservation_id}`}
            reservation={reservation}
            mode={mode}
          />
        ))}
        {filteredReservations.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            {t(`${mode}.noReservationsMessage`)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReservationsList;
