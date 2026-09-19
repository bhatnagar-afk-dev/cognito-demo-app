import type { Metadata } from 'next';
import ConfigureAmplify from './configure-amplify';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cognito Demo App',
  description: 'A minimal Next.js + Cognito authentication demo',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <ConfigureAmplify />
        {children}
      </body>
    </html>
  );
}
