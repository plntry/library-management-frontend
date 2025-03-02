import { redirect } from "react-router";
import { PATHS } from "../../routes/paths";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect(PATHS.AUTH);
}
