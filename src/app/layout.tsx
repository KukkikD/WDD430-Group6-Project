import './globals.css';
import { inter, lusitana } from '@/ui/fonts';
import { Metadata } from 'next';
import { CartProvider } from '@/app/context/CartContext';
import { ReactNode } from 'react';
import Navbar from '@/ui/components/Navbar';
import Footer from '@/ui/components/Footer';

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'Explore our collection of handcrafted products, from artisanal home decor to unique fashion accessories. Each piece tells a story of craftsmanship and creativity.',
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden antialiased`}>

        {/* CartProvider wraps the entire application to provide cart context */}
        <CartProvider>
          <div className="max-w-screen-xl w-full mx-auto px-4">
            <Navbar />
          </div>
          <main className="flex-grow max-w-screen-xl w-full mx-auto px-4">{children}
          </main>
          <div className="max-w-screen-xl w-full mx-auto px-4">
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
