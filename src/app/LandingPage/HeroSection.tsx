'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center h-auto text-white"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* overlay 20% */}
      
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Discover Unique Handcrafted Treasures</h1>
        <p className="text-lg mb-8 drop-shadow-md">Connecting you with passionate artisans worldwide.</p>
        <Link href="/shop">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
}
