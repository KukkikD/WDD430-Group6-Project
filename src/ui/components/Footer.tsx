'use client';

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-brown py-6 px-8 mt-auto text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Left links */}
        <div className="flex gap-6 flex-wrap">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>

        {/* Social Media links */}
        <div className="flex gap-4 flex-wrap">
          <a href="#" aria-label="Facebook" className="hover:text-yellow-400">Facebook</a>
          <a href="#" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
          <a href="#" aria-label="Pinterest" className="hover:text-yellow-400">Pinterest</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4">
        &copy; 2025 Handcrafted Haven
      </div>
    </footer>
  );
}
