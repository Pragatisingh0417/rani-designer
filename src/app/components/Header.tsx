"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">

      {/* ================= NAVIGATION HEADER ================= */}
      <nav className="bg-[#B9AA52] py-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-10 text-[15px] tracking-wide">

          <Link href="/" className="hover:text-[#8B0000] transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-[#8B0000] transition">
            About Us
          </Link>

          <Link href="/new-arrivals" className="hover:text-[#8B0000] transition">
            New Arrivals
          </Link>

          <Link href="/necklaces" className="hover:text-[#8B0000] transition">
            Necklaces
          </Link>

          <Link href="/earrings" className="hover:text-[#8B0000] transition">
            Earrings
          </Link>

          <Link href="/bangles" className="hover:text-[#8B0000] transition">
            Bangles/Bracelet
          </Link>

          <Link href="/collections" className="hover:text-[#8B0000] transition">
            Curated Collections
          </Link>

          <Link href="/rings" className="hover:text-[#8B0000] transition">
            Rings
          </Link>

          <Link href="/sale" className="hover:text-[#8B0000] transition">
            Sale
          </Link>

          <Link href="/return" className="hover:text-[#8B0000] transition">
            Return & Exchange
          </Link>

        </div>
      </nav>
    </header>
  );
}
