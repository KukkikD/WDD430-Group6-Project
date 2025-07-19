'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 text-center text-sm text-gray-600">
      <div className="flex justify-center gap-6 flex-wrap mb-2">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
      <div className="text-xs">&copy; 2025 Handcrafted Haven</div>
    </footer>
  );
}
