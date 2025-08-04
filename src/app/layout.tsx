import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/ui/components/Navbar';
import Footer from '@/ui/components/Footer';
import ClientSessionProvider from '@/components/ClientSessionProvider'; // 👈 import new file



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ClientSessionProvider>
          <div className="max-w-screen-xl w-full mx-auto px-4">
            <Navbar />
          </div>
          <main className="flex-grow max-w-screen-xl w-full mx-auto px-4">{children}
          </main>
          <div className="max-w-screen-xl w-full mx-auto px-4">
            <Footer />
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
