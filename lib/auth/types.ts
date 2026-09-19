export type UserRole = 'buyer' | 'vendor';

export type AuthUser = {
  userId: string;
  username: string;
  role: UserRole | null;
};

export interface AuthProvider {
  init(): void;
  registerUser(email: string, password: string, role: UserRole): Promise<void>;
  confirmRegistration(email: string, code: string): Promise<void>;
  loginUser(email: string, password: string): Promise<void>;
  logoutUser(): Promise<void>;
  getSignedInUser(): Promise<AuthUser | null>;
  getBearerToken(): Promise<string | null>;
}
