import { redirect } from "react-router";
import { PATHS } from "../routes/paths";

export function getAuthToken() {
  return null; // TODO: add loader when the api is ready
}

export function tokenLoader() {
  return getAuthToken();
}

export async function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect(PATHS.AUTH.link);
  }

  return null;
}
