export interface IUser {
  id?: string;
  name: string;
  lastname: string;
  authProvider: AuthProvider;
  role?: UserRole;
  email: string;
  password?: string;
}

export enum UserRole {
  MANAGER = 'Manager',
  MEMBER = 'Member',
}

export enum AuthProvider {
  LOCAL = 'Local',
  GOOGLE = 'Google',
}