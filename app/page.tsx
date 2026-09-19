import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <h1>Cognito Demo App</h1>
      <p>Sign in to an existing account or create a new one.</p>
      <div className="actions">
        <Link className="button" href="/login">
          Log in
        </Link>
        <Link className="button secondary" href="/signup">
          Sign up
        </Link>
      </div>
    </main>
  );
}
