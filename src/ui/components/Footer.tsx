'use client';

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 ">
      <div className="container mx-auto px-7 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          </div>
          <div className="flex gap-6 space-x-10 text-gray-500 mb-4 md:mb-0">
            <Link href={"/privacy"} className="hover:text-purple-600 transition-colors">Privacy Policy</Link>
            <Link href={"/terms"} className="hover:text-purple-600 transition-colors">Terms of Service</Link>
            <Link href={"/contact"} className="hover:text-purple-600 transition-colors">Contact Us</Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors font-bold">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors font-bold">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors font-bold">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
