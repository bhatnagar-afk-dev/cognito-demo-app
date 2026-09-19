import type { Metadata } from 'next';
import ConfigureAuth from './configure-auth';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cognito Demo App',
  description: 'A minimal Next.js + Cognito authentication demo',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <ConfigureAuth />
        {children}
      </body>
    </html>
  );
}
