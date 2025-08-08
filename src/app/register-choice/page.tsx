'use client';
import Link from 'next/link';

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="bg-stone-50 p-10 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-stone-800">Choose Account Type</h2>
        <p className="text-stone-600 mb-6">Select what type of account you want to create:</p>
        <div className="space-y-4">
          <Link
            href="/register-customer"
            className="block bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold transition"
          >
            I’m a Customer
          </Link>
          <Link
            href="/register-seller"
            className="block bg-yellow-900 hover:bg-yellow-950 text-white py-2 rounded-lg font-semibold transition"
          >
            I’m a Seller
          </Link>
        </div>
      </div>
    </div>
  );
}