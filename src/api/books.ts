import api from ".";
import { Book } from "../models/Book";

const BOOKS_BASE_URL = "/api/v1/books";

export const booksApi = {
  getAll: async () => await api.get(BOOKS_BASE_URL),
  getById: async (bookId: string) =>
    await api.get(`${BOOKS_BASE_URL}/${bookId}`),
  create: async (body: Book) => await api.post(BOOKS_BASE_URL, body),
  update: async (body: Book) => await api.put(BOOKS_BASE_URL, body),
  getReaderReservations: async () =>
    await api.get(`${BOOKS_BASE_URL}/my-reservations`),
  getReaderPendingReservations: async () =>
    await api.get(`${BOOKS_BASE_URL}/PENDING-reservations`),
};
