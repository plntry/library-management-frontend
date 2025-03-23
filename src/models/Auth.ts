import { RegisterOptions } from "react-hook-form";

export type AuthRequestType = "register" | "login";

export interface RegisterFormData {
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

export interface AuthInputData
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: keyof LoginFormData | keyof RegisterFormData;
  validation?: RegisterOptions<LoginFormData | RegisterFormData>;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface APIError {
  detail?: string | { msg: string }[];
}
