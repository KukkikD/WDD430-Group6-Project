'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  // pretend > cartCount corllect no. of item in the cart (pretend value dummy 3 first)
  const [cartCount, setCartCount] = useState(3);

  return (
    <header className="w-full bg-white shadow-md py-4 px-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Handcrafted Haven Logo"
            width={200}
            height={100}
            priority // โหลดโลโก้ก่อน (ถ้าต้องการ)
          />
        </Link>

        {/* Menu links */}
        <ul className="flex items-center space-x-6 text-lg">
          <li>
            <Link href="/" className="text-gray-700 hover:text-green-800">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="text-gray-700 hover:text-green-800">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 hover:text-green-800">
              About
            </Link>
          </li>
          <li>
            <Link href="/seller-profile" className="text-gray-700 hover:text-green-800">
              Seller Profile
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-gray-700 hover:text-green-800">
              Log in
            </Link>
          </li>
        </ul>

        {/* Cart icon */}
        <Link
          href="/cart"
          className="bg-gray-800 text-black px-4 py-2 rounded flex items-center space-x-2"
          aria-label={`Cart with ${cartCount} items`}
        >
          <span>🛒</span>
          <span> ({cartCount})</span>
        </Link>
      </nav>
    </header>
  );
}
