'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { confirmRegistration, registerUser } from '@/lib/auth';
import type { UserRole } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [error, setError] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await registerUser(email, password, role);
      setStep('confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await confirmRegistration(email, code);
      router.push('/welcome');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Confirmation failed');
    }
  }

  if (step === 'confirm') {
    return (
      <main className="page">
        <h1>Confirm your email</h1>
        <p>We sent a verification code to {email}.</p>
        <form className="form" onSubmit={handleConfirm}>
          <label htmlFor="code">Verification code</label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Sign up</h1>
      <form className="form" onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <fieldset className="role-select">
          <legend>I am signing up as a</legend>
          <label>
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={role === 'buyer'}
              onChange={() => setRole('buyer')}
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="vendor"
              checked={role === 'vendor'}
              onChange={() => setRole('vendor')}
            />
            Vendor
          </label>
        </fieldset>
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">
          Sign up
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
