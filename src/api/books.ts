import api from ".";

const BOOKS_BASE_URL = "/api/v1/books";

export const booksApi = {
  getAll: async () => api.get(BOOKS_BASE_URL),
  getById: async (bookId: string) => api.get(`${BOOKS_BASE_URL}/${bookId}`),
};
