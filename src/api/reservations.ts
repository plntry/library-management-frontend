import api from ".";

const RESERVATIONS_BASE_URL = "/api/v1/reservations";

export const reservationsApi = {
  getAllByStatus: async (status: string) =>
    await api.get(`${RESERVATIONS_BASE_URL}?status=${status}`),
  create: async (book_id: number) =>
    await api.post(RESERVATIONS_BASE_URL, { book_id }),
  confirm: async (reservation_id: number, return_date: string) =>
    await api.put(`${RESERVATIONS_BASE_URL}/${reservation_id}/confirm`, {
      return_date,
    }),
  decline: async (reservation_id: number) =>
    await api.delete(`${RESERVATIONS_BASE_URL}/${reservation_id}`),
};
