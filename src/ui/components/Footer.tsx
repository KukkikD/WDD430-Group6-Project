'use client';

import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 px-8 mt-auto text-sm shadow-[-6px_-6px_10px_rgba(0,0,0,0.15)]">
      <div className="max-w-7xl mx-auto flex justify-between gap-4">
        {/* Left links */}
        <div className="flex gap-6 flex-wrap">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>

        {/* Social Media links */}
        <div className="flex gap-4 justify-between flex-wrap">
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
