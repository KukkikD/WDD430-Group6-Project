import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/ui/components/Navbar';
import Footer from '@/ui/components/Footer';
import ClientSessionProvider from '@/components/ClientSessionProvider'; // 👈 import new file



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientSessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
