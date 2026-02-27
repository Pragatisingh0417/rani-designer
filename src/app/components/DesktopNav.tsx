"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function DesktopNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="hidden md:block bg-[#B9AA52] py-4 relative z-40">
      <div
        className="max-w-7xl mx-auto flex justify-center gap-10 text-[15px] tracking-wide relative"
        ref={menuRef}
      >
        <Link href="/">Home</Link>

        {/* ABOUT */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("about")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            About <ChevronDown size={16} /> 
          </button>

          {activeMenu === "about" && (
            <div className="absolute top-full left-0 bg-white shadow-xl w-30 py-4 px-6">
              <Link href="/about-us" className="block py-2 hover:text-[#8B0000]">
                Know Us
              </Link>
              <Link href="/contact-us" className="block py-2 hover:text-[#8B0000]">
                Contact
              </Link>
              <Link href="/faq" className="block py-2 hover:text-[#8B0000]">
                FAQ
              </Link>
            </div>
          )}
        </div>

        <Link href="/shop-by-catalogs">Shop By Category</Link>

        {/* NECKLACES MEGA MENU */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("necklaces")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Necklaces <ChevronDown size={16} />
          </button>

          {activeMenu === "necklaces" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-2xl w-[800px] p-8 grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Traditional</h4>
                {[
                  "Temple Jewellery",
                  "Kundan Necklaces",
                  "Vilandi Necklaces",
                  "Antique Traditional Necklaces",
                  "Meenakari",
                ].map((item) => (
                  <Link key={item} href="#" className="block py-1 hover:text-[#8B0000]">
                    {item}
                  </Link>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-3">Modern</h4>
                {[
                  "Choker",
                  "Hasli",
                  "Long Necklaces",
                  "Western Necklaces",
                  "Pendant Sets",
                ].map((item) => (
                  <Link key={item} href="#" className="block py-1 hover:text-[#8B0000]">
                    {item}
                  </Link>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-3">Popular</h4>
                {["All Necklaces", "Pearl Necklaces"].map((item) => (
                  <Link key={item} href="#" className="block py-1 hover:text-[#8B0000]">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BANGLES DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("bangles")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Bangles / Bracelet <ChevronDown size={16} />
          </button>

          {activeMenu === "bangles" && (
            <div className="absolute top-full left-0 bg-white shadow-xl w-52 py-4 px-6">
              <Link href="#" className="block py-2 hover:text-[#8B0000]">
                Kada
              </Link>
              <Link href="#" className="block py-2 hover:text-[#8B0000]">
                Bracelet
              </Link>
              <Link href="#" className="block py-2 hover:text-[#8B0000]">
                Bangles
              </Link>
            </div>
          )}
        </div>

        <Link href="/party-ready-collections">Party Ready Collection</Link>

        {/* EARRINGS DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("earrings")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Earrings <ChevronDown size={16} />
          </button>

          {activeMenu === "earrings" && (
            <div className="absolute top-full left-0 bg-white shadow-xl w-52 py-4 px-6">
              {[
                "All Earrings",
                "Studs",
                "Long Earrings",
                "Jhumki & Baali",
                "EarCuffs",
                "Ruby and Emerald Earrings",
              ].map((item) => (
                <Link key={item} href="#" className="block py-2 hover:text-[#8B0000]">
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/">Rings</Link>
        <Link href="/">Return & Exchange</Link>
      </div>
    </nav>
  );
}