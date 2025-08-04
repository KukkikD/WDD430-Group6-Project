'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(3); // TODO: setCartCount will be used when implementing cart updates

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Handcrafted Haven Logo"
                width={140}
                height={50}
                priority
                style={{ height: 'auto' }}
              />
            </Link>
          </div>

          {/* Center: Menu */}
          <div className="flex justify-center flex-grow">
            <ul className="flex-1 flex justify-center gap-6 text-lg text-gray-700">
              <li className="whitespace-nowrap"><Link href="/" className="text-gray-700 hover:text-green-800 transition-colors duration-200">Home</Link></li>
              <li className="whitespace-nowrap"><Link href="/shop" className="text-gray-700 hover:text-green-800">Shop</Link></li>
              <li className="whitespace-nowrap"><Link href="/about" className="text-gray-700 hover:text-green-800">About</Link></li>
              <li className="whitespace-nowrap"><Link href="/seller-profile" className="text-gray-700 hover:text-green-800">Seller Profile</Link></li>
              <li className="whitespace-nowrap"><Link href="/seller/dashboard" className="text-gray-700 hover:text-green-800">Dashboard</Link></li> {/* 👈 add here */}
              <li className="whitespace-nowrap"><Link href="/login" className="text-gray-700 hover:text-green-800">Log in</Link></li>
            </ul>
          </div>

          {/* Right: Cart */}
          <div className="flex-shrink-0">
            <Link
              href="/cart"
              className="bg-gray-200 text-black px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-300"
            >
              <span>🛒</span>
              <span>({cartCount})</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
