'use client';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [cartCount] = useState(3); // TODO: "setCartCount" will be used when implementing cart updates

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex md:flex-wrap justify-between w-full md:px-4 lg:px-6 md:py-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Handcrafted Haven Logo"
                width={140}
                height={50}
                priority
                className="h-auto"
              />
            </Link>
          </div>
        <nav className="flex md:flex-wrap items-center justify-end md:w-[80%] gap-2 md:gap-6 sm:m-auto sm:w-full">

          {/* Center: Menu */}
          <div className="flex justify-center">
            <ul className="d-none d-md-flex flex-1 md:flex-wrap justify-center md:gap-6 text-lg text-gray-700">
              <li className="whitespace-nowrap"><Link href="/" className="text-gray-700 hover:text-yellow-400 transition-colors duration-200 no-underline">Home</Link></li>
              <li className="whitespace-nowrap"><Link href="/shop" className="text-gray-700 hover:text-yellow-400">Shop</Link></li>
              <li className="whitespace-nowrap"><Link href="/seller-profile" className="text-gray-700 hover:text-yellow-400">Seller Profile</Link></li>
              <li className="whitespace-nowrap"><Link href="/seller/dashboard" className="text-gray-700 hover:text-yellow-400">Dashboard</Link></li> {/* 👈 add here */}
              <li className="whitespace-nowrap"><Link href="/AboutUs" className="text-gray-700 hover:text-yellow-400">About Us</Link></li>
              <li className="whitespace-nowrap"><Link href="/login" className="text-gray-700 hover:text-yellow-400">Log in</Link></li>
            </ul>
            <DropdownButton className="d-md-none" size="sm" id="dropdown-basic-button" title="Explore" variant="warning" >
              <Dropdown.Item href="/">Home</Dropdown.Item>
              <Dropdown.Item href="/shop">Shop</Dropdown.Item>
              <Dropdown.Item href="/seller-profile">Seller Profile</Dropdown.Item>
              <Dropdown.Item href="/seller/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/AboutUs">About Us</Dropdown.Item>
              <Dropdown.Item href="/login">Log in</Dropdown.Item>
            </DropdownButton>
          </div>

          {/* Right: Cart */}
          <div className="flex-shrink-0">
            <Link
              href="/cart"
              className="bg-gray-200 text-black px-4 py-1 rounded flex items-center space-x-2 hover:bg-gray-300"
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
