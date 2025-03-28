import api from ".";

const RESERVATIONS_BASE_URL = "/api/v1/reservations";

export const reservationsApi = {
  getAllByUser: async () =>
    await api.get(`${RESERVATIONS_BASE_URL}/my-reservations`),
  getAllPendingByUser: async () =>
    await api.get(`${RESERVATIONS_BASE_URL}/PENDING-approvals`),
  create: async (book_id: number) =>
    await api.post(RESERVATIONS_BASE_URL, { book_id }),
  confirm: async (reservation_id: number) =>
    await api.put(`${RESERVATIONS_BASE_URL}/${reservation_id}/confirm`),
  decline: async (reservation_id: number) =>
    await api.delete(`${RESERVATIONS_BASE_URL}/${reservation_id}`),
};
