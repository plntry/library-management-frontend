import { usersApi } from "../api/users";
import { UserRegistration, UserRoles } from "../models/User";

export async function usersPageLoader() {
  const response = await usersApi.getAll();

  if (response.status === 200) {
    return response.data
      .filter((el: UserRegistration) => el.role === UserRoles.READER)
      .map((el: UserRegistration) => ({
        ...el,
        key: el.id,
      }));
  }

  return [];
}
