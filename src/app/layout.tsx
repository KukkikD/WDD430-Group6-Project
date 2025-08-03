// import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/ui/components/Navbar';
import Footer from '@/ui/components/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
