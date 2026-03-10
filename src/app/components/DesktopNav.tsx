"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

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
    <nav className="hidden md:block bg-[#F5F5DC] py-4 relative z-40">
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
            Get To Know Us <ChevronDown size={16} /> 
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


       {/* SHOP BY CATEGORY MEGA MENU */}
<div
  className="relative"
  onMouseEnter={() => setActiveMenu("Shop By Category")}
  onMouseLeave={() => setActiveMenu(null)}
>
  <button className="flex items-center gap-1">
    Shop By Category <ChevronDown size={16} />
  </button>

  {activeMenu === "Shop By Category" && (
    <div className="absolute left-1/2 -translate-x-1/2 top-full bg-amber-50 shadow-2xl w-[1100px] p-8 grid grid-cols-4 gap-8">

      {/* Column 1 */}
      <div>

        <Link href="/images/bangles.jpg" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/clearance-jewellery.webp" alt="" width={40} height={40} className="rounded-md" />
Clearance Jewellery        </Link>

        <Link href="/category/bridal-jewellery-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/american-diamond.avif" alt="" width={40} height={40} className="rounded-md" />
American Diamond        </Link>

        <Link href="/category/designer-jewellery" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/bangles.jpg" alt="" width={40} height={40} className="rounded-md" />
Bnagles        </Link>

        <Link href="/category/exclusive-luxury-jewellery" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/banner-3.jpg" alt="" width={40} height={40} className="rounded-md" />
Bridal Sets        </Link>
      </div>

      {/* Column 2 */}
      <div>

        <Link href="/category/antique-necklace" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/necklace.jpg" alt="" width={40} height={40} className="rounded-md" />
Choker Sets        </Link>

        <Link href="/category/choker-necklace-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/earrings.jpg" alt="" width={40} height={40} className="rounded-md" />
Earrings        </Link>

        <Link href="/category/ad-necklace-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/hand-pieces.avif" alt="" width={40} height={40} className="rounded-md" />
Hand Pieces        </Link>

        <Link href="/category/artificial-jewellery-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/headbands.avif" alt="" width={40} height={40} className="rounded-md" />
Headbands        </Link>
      </div>

      {/* Column 3 */}
      <div>

        <Link href="/category/chandbali-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/jadau.avif" alt="" width={40} height={40} className="rounded-md" />
Jadau        </Link>

        <Link href="/category/american-diamond-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/jhumar-passa.avif" alt="" width={40} height={40} className="rounded-md" />
Jhumar / Passa        </Link>

        <Link href="/category/emerald-ruby-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/mother-of-pearl.avif" alt="" width={40} height={40} className="rounded-md" />
Mother of Pearl Sets        </Link>

        <Link href="/category/earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/nath.avif" alt="" width={40} height={40} className="rounded-md" />
Nath        </Link>
      </div>

      {/* Column 4 */}
      <div>

        <Link href="/category/bangles" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/banner-3.jpg" alt="" width={40} height={40} className="rounded-md" />
          Party Wear
        </Link>

        <Link href="/category/bracelet" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
          <Image src="/images/rings.jpg" alt="" width={40} height={40} className="rounded-md" />
          Rings
        </Link>

       

       
      </div>

    </div>
  )}
</div>

       

        <Link href="/party-ready-collections">Party Ready Collection</Link>

        

        <Link href="/">Return & Exchange</Link>
      </div>
    </nav>
  );
}