export type AuthUser = {
  userId: string;
  username: string;
};

export interface AuthProvider {
  init(): void;
  registerUser(email: string, password: string): Promise<void>;
  confirmRegistration(email: string, code: string): Promise<void>;
  loginUser(email: string, password: string): Promise<void>;
  logoutUser(): Promise<void>;
  getSignedInUser(): Promise<AuthUser | null>;
  getBearerToken(): Promise<string | null>;
}
