import api from ".";
import { BookCreateUpdateData } from "../models/Book";

const BOOKS_BASE_URL = "/api/v1/books";

export const booksApi = {
  getAll: async () => await api.get(BOOKS_BASE_URL),
  getById: async (bookId: string) =>
    await api.get(`${BOOKS_BASE_URL}/id/${bookId}`),
  create: async (body: BookCreateUpdateData) =>
    await api.post(BOOKS_BASE_URL, body),
  update: async (body: BookCreateUpdateData) =>
    await api.put(BOOKS_BASE_URL, body),
  getReaderReservations: async () =>
    await api.get(`${BOOKS_BASE_URL}/my-reservations`),
  getReaderPendingReservations: async () =>
    await api.get(`${BOOKS_BASE_URL}/PENDING-reservations`),
};
