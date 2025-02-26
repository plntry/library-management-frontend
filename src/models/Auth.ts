export type AuthRequestType = "register" | "login";

export interface RegisterFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthError {
  detail?: string | { msg: string }[];
}
