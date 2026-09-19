import { amplifyAuthProvider } from './amplify-provider';
import type { AuthProvider } from './types';

// The only line that needs to change to switch auth providers.
// See MIGRATION.md for the steps to swap this out.
const provider: AuthProvider = amplifyAuthProvider;

export const initAuth = provider.init;
export const registerUser = provider.registerUser;
export const confirmRegistration = provider.confirmRegistration;
export const loginUser = provider.loginUser;
export const logoutUser = provider.logoutUser;
export const getSignedInUser = provider.getSignedInUser;
export const getBearerToken = provider.getBearerToken;

export type { AuthUser, AuthProvider, UserRole } from './types';
