import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Handcrafted Haven Logo"
              width={200}
              height={100}
            />
          </Link>
        </div>

        {/* Menu links */}
        <ul className="flex items-center space-x-6 text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/seller-profile">Seller Profile</Link></li>
          <li><Link href="/login">Log in</Link></li>
        </ul>

        {/* Cart icon */}
        <div>
          <Link href="/cart">🛒 Cart</Link>
        </div>
      </nav>
    </header>
  );
}
