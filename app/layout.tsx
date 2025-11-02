import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gowrie Intrigue ? Scene 1',
  description: 'Cinematic scene builder for historical what-ifs',
  metadataBase: new URL('https://agentic-4c0dcd31.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
