import { Amplify } from 'aws-amplify';
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import outputs from '@/amplify_outputs.json';
import type { AuthProvider, UserRole } from './types';

function toUserRole(value: string | undefined): UserRole | null {
  return value === 'buyer' || value === 'vendor' ? value : null;
}

export const amplifyAuthProvider: AuthProvider = {
  init() {
    Amplify.configure(outputs, { ssr: true });
  },

  async registerUser(email, password, role) {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: { email, 'custom:role': role },
        autoSignIn: true,
      },
    });
  },

  async confirmRegistration(email, code) {
    const result = await confirmSignUp({ username: email, confirmationCode: code });
    if (result.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      await autoSignIn();
    }
  },

  async loginUser(email, password) {
    await signIn({ username: email, password });
  },

  async logoutUser() {
    await signOut();
  },

  async getSignedInUser() {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      return {
        userId: user.userId,
        username: user.username,
        role: toUserRole(attributes['custom:role']),
      };
    } catch {
      return null;
    }
  },

  async getBearerToken() {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString() ?? null;
  },
};
