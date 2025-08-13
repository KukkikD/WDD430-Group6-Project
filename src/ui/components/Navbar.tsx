'use client';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [cartCount] = useState(3); // TODO: "setCartCount" will be used when implementing cart updates
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md relative z-[9999]">
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
        <nav className="flex md:flex-wrap items-center justify-end md:w-[80%] gap-2 md:gap-6 sm:m-auto sm:w-full m-0">

          {/* Center: Menu */}
          <div className="flex justify-center">
            <ul className="d-none d-md-flex flex-1 md:flex-wrap justify-center md:gap-6 text-lg text-gray-700">
              <li className="whitespace-nowrap"><Link href="/" className="text-gray-700 hover:text-yellow-400 transition-colors duration-200 no-underline">Home</Link></li>
              <li className="whitespace-nowrap"><Link href="/shop" className="text-gray-700 hover:text-yellow-400">Shop</Link></li>
              <li className="whitespace-nowrap"><Link href="/seller-profile" className="text-gray-700 hover:text-yellow-400">Seller Profile</Link></li>
              {session?.user?.role === 'seller' && (
                <li className="whitespace-nowrap"><Link href="/seller/dashboard" className="text-gray-700 hover:text-yellow-400">Dashboard</Link></li>
              )}
              <li className="whitespace-nowrap"><Link href="/AboutUs" className="text-gray-700 hover:text-yellow-400">About Us</Link></li>
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

          {/* Right: Auth & Cart */}
          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <span className="d-none d-md-block text-gray-500">Loading...</span>
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <span>👤</span>
                  <span>{session.user?.name || 'User'}</span>
                  <span>▼</span>
                </button>
                
                {showDropdown && (
                  <div className="fixed right-4 md:right-10 top-16 w-56 bg-white rounded-md shadow-lg py-1 z-[10000] border">
                    {session.user?.role === 'seller' && (
                      <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                      >
                      My Profile
                      </Link>                    
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="d-none d-md-block text-lg text-gray-700 hover:text-yellow-400">Log in</Link>
            )}

            {/* Cart */}
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
