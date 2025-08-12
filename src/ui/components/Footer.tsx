'use client';

import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import Link from "next/link";

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="py-6 px-8 mt-auto text-sm shadow-[-6px_-6px_10px_rgba(0,0,0,0.15)]">
      <div className="max-w-7xl mx-auto flex justify-between gap-4">
        {/* Left links */}
        <div className="flex gap-6 flex-wrap">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
=======
    // <footer className="bg-white-800 border-t border-gray-200 text-brown py-6 px-8 mt-auto text-sm shadow-[-6px_-6px_10px_rgba(0,0,0,0.15)]">
    //   <div className="max-w-7xl mx-auto flex justify-between gap-4">
    //     {/* Left links */}
    //     <div className="flex gap-6 flex-wrap">
    //       <a href="/privacy" className="hover:underline">Privacy Policy</a>
    //       <a href="/terms" className="hover:underline">Terms</a>
    //       <a href="/contact" className="hover:underline">Contact</a>
    //     </div>
>>>>>>> 87c6faf (updating footer)

    //     {/* Social Media links */}
    //     <div className="flex gap-4 justify-between flex-wrap">
    //       <a href="#" aria-label="Facebook" className="hover:text-yellow-400">Facebook</a>
    //       <a href="#" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
    //       <a href="#" aria-label="Pinterest" className="hover:text-yellow-400">Pinterest</a>
    //     </div>
    //   </div>

    //   {/* Copyright */}
    //   <div className="text-center text-xs mt-4">
    //     &copy; 2025 Handcrafted Haven
    //   </div>
    // </footer>

    <footer className="bg-white border-t border-gray-200 ">
      <div className="container mx-auto px-7 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          </div>
          <div className="flex gap-6 space-x-10 text-gray-500 mb-4 md:mb-0">
            <Link href={"/privacy"} className="hover:text-purple-600 transition-colors">Privacy Policy</Link>
            <Link href={"/terms"} className="hover:text-purple-600 transitions-colors">Terms of Service</Link>
            <Link href={"/contact"} className="hover:text-purple-600 transitions-colors">Contact Us</Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-purple-600 transitions-colors"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transitions-colors"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transitions-colors"><FaPinterestP size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
