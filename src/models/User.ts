export const GUEST_ROLE = "guest" as const;

export enum UserRoles {
  READER = "user",
  LIBRARIAN = "librarian",
  ADMIN = "admin",
}

export interface UserRegistration {
  id?: number;
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRoles.READER;
  is_blocked?: boolean;
}

export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  sub: string; // email
  exp: number;
  role: UserRoles;
}
