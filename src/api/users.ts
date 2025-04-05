import api from ".";

const USERS_BASE_URL = "/api/v1/users";

export const usersApi = {
  getAll: async () => await api.get(USERS_BASE_URL),
  getById: async (id: number) => await api.get(`${USERS_BASE_URL}/${id}`),
  delete: async (id: number) => await api.delete(`${USERS_BASE_URL}/${id}`),
  block: async (id: number) => await api.put(`${USERS_BASE_URL}/${id}/block`),
  unblock: async (id: number) =>
    await api.put(`${USERS_BASE_URL}/${id}/unblock`),
};
