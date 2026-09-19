'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBearerToken, getSignedInUser, logoutUser } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';

export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const signedInUser = await getSignedInUser();
      if (!signedInUser) {
        router.push('/login');
        return;
      }
      setUser(signedInUser);
      setToken(await getBearerToken());
      setLoading(false);
    }
    loadSession();
  }, [router]);

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Welcome to our test app</h1>
      <p>Signed in as: {user?.role ?? 'unknown role'}</p>
      <p>Here is your bearer token:</p>
      <code className="token">{token}</code>
      <button className="button" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}
