export enum UserRoles {
  READER = "student",
  LIBRARIAN = "librarian",
  ADMIN = "admin",
}

export interface UserRegistration {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRoles.READER;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: UserRoles;
}
