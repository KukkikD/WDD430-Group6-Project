'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center h-[500px] overflow-hidden">
      {/* Background image with Next.js Image component */}
      <Image
        src="/images/hero.jpg"
        alt="Handcrafted treasures background"
        fill // makes the image cover entire parent
        style={{ objectFit: 'cover' }}
        priority // load this image first for better LCP
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Text content */}
      <div className="relative z-10 px-4 text-white">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Discover Unique Handcrafted Treasures
        </h1>
        <p className="text-lg mb-8 drop-shadow-md">
          Connecting you with passionate artisans worldwide.
        </p>
        <Link href="/shop">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
}
