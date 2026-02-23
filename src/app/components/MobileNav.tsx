"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";

export default function MobileNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <nav className="md:hidden fixed w-full z-50 bg-black text-white">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={26} />
        </button>

        <Image
          src="/images/rani-logo-removebg.png"
          alt="Logo"
          width={100}
          height={20}
        />

        <div className="flex items-center gap-4">
          <Search size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
          <User size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
          <ShoppingCart size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[360px] bg-[#B9AA52] text-black
        transform transition-transform duration-300 ease-in-out z-50
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="px-6 space-y-6 text-[15px] overflow-y-auto h-[90%]">

          {/* HOME */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block border-b border-black/20 pb-3 hover:text-[#690303]"
          >
            Home
          </Link>

          {/* ABOUT */}
          <div className="border-b border-black/20 pb-3">
            <button
              onClick={() => setMobileSub(mobileSub === "about" ? null : "about")}
              className="flex justify-between w-full items-center hover:text-[#690303]"
            >
              About
              <span className={`transform transition-transform duration-300 ${mobileSub === "about" ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {mobileSub === "about" && (
              <div className="pl-4 mt-3 flex flex-col space-y-3 text-sm">
                <Link href="/about/know-us" onClick={() => setMobileOpen(false)}>Know Us</Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
              </div>
            )}
          </div>

          {/* NECKLACES */}
          <div className="border-b border-black/20 pb-3">
            <button
              onClick={() => setMobileSub(mobileSub === "necklaces" ? null : "necklaces")}
              className="flex justify-between w-full items-center hover:text-[#690303]"
            >
              Necklaces
              <span className={`transform transition-transform duration-300 ${mobileSub === "necklaces" ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {mobileSub === "necklaces" && (
              <div className="pl-4 mt-3 flex flex-col space-y-3 text-sm">
                {[
                  "All Necklaces",
                  "Temple Jewellery",
                  "Kundan Necklaces",
                  "Vilandi Necklaces",
                  "Antique Traditional Necklaces",
                  "Meenakari",
                  "Choker",
                  "Hasli",
                  "Long Necklaces",
                  "Western Necklaces",
                  "Pendant Sets",
                  "Pearl Necklaces",
                ].map((item) => (
                  <Link key={item} href="#" onClick={() => setMobileOpen(false)}>
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* BANGLES */}
          <div className="border-b border-black/20 pb-3">
            <button
              onClick={() => setMobileSub(mobileSub === "bangles" ? null : "bangles")}
              className="flex justify-between w-full items-center hover:text-[#690303]"
            >
              Bangles / Bracelet
              <span className={`transform transition-transform duration-300 ${mobileSub === "bangles" ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {mobileSub === "bangles" && (
              <div className="pl-4 mt-3 flex flex-col space-y-3 text-sm">
                <Link href="#" onClick={() => setMobileOpen(false)}>Kada</Link>
                <Link href="#" onClick={() => setMobileOpen(false)}>Bracelet</Link>
                <Link href="#" onClick={() => setMobileOpen(false)}>Bangles</Link>
              </div>
            )}
          </div>

          {/* EARRINGS */}
          <div className="border-b border-black/20 pb-3">
            <button
              onClick={() => setMobileSub(mobileSub === "earrings" ? null : "earrings")}
              className="flex justify-between w-full items-center hover:text-[#690303]"
            >
              Earrings
              <span className={`transform transition-transform duration-300 ${mobileSub === "earrings" ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {mobileSub === "earrings" && (
              <div className="pl-4 mt-3 flex flex-col space-y-3 text-sm">
                {[
                  "All Earrings",
                  "Studs",
                  "Long Earrings",
                  "Jhumki & Baali",
                  "EarCuffs",
                  "Ruby and Emerald Earrings",
                ].map((item) => (
                  <Link key={item} href="#" onClick={() => setMobileOpen(false)}>
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SIMPLE LINKS */}
          <Link href="/" onClick={() => setMobileOpen(false)} className="block border-b border-black/20 pb-3">
            Party Ready Collection
          </Link>

          <Link href="/" onClick={() => setMobileOpen(false)} className="block border-b border-black/20 pb-3">
            Rings
          </Link>

          <Link href="/" onClick={() => setMobileOpen(false)} className="block border-b border-black/20 pb-3">
            Return & Exchange
          </Link>

        </div>
      </div>
    </nav>
  );
}