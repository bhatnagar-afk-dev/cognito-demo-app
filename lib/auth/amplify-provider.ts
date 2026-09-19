import { Amplify } from 'aws-amplify';
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import outputs from '@/amplify_outputs.json';
import type { AuthProvider } from './types';

export const amplifyAuthProvider: AuthProvider = {
  init() {
    Amplify.configure(outputs, { ssr: true });
  },

  async registerUser(email, password) {
    await signUp({
      username: email,
      password,
      options: { userAttributes: { email }, autoSignIn: true },
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
      return { userId: user.userId, username: user.username };
    } catch {
      return null;
    }
  },

  async getBearerToken() {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString() ?? null;
  },
};
