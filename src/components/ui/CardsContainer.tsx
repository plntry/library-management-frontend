import React from "react";
import { useTranslation } from "react-i18next";

interface CardsContainerProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyStateKey: string;
  mode?: string;
}

const CardsContainer = <T,>({
  items,
  renderItem,
  emptyStateKey,
  mode,
}: CardsContainerProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(renderItem)}
      {items.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          {t(
            `${mode}.${emptyStateKey}` as
              | "allBooks.noBooksMessage"
              | "booksToReview.noReservationsMessage"
              | "approvedReservations.noReservationsMessage"
          )}
        </p>
      )}
    </div>
  );
};

export default CardsContainer;
