import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';

export async function registerUser(email: string, password: string) {
  return signUp({
    username: email,
    password,
    options: { userAttributes: { email }, autoSignIn: true },
  });
}

export async function confirmRegistration(email: string, code: string) {
  const result = await confirmSignUp({ username: email, confirmationCode: code });
  if (result.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
    await autoSignIn();
  }
  return result;
}

export async function loginUser(email: string, password: string) {
  return signIn({ username: email, password });
}

export async function logoutUser() {
  return signOut();
}

export async function getSignedInUser() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

export async function getBearerToken() {
  const session = await fetchAuthSession();
  return session.tokens?.accessToken?.toString() ?? null;
}
