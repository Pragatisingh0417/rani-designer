"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

/* USER TYPE */
type UserType = {
  name: string;
  email?: string;
};

export default function DesktopNav() {

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* AUTH CONTEXT */
  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };

  /* HANDLE LOGOUT */
  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setActiveMenu(null);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:block py-1 absolute top-0 left-0 w-full z-50">

      <div
        className="w-full  mx-auto p-10 flex justify-center gap-10 text-[15px] tracking-wide relative text-white items-center "
        ref={menuRef}
      >

        <Link href="/">Home</Link>

        {/* ABOUT */}
        {/* <div
          className="relative"
          onMouseEnter={() => setActiveMenu("about")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Get To Know Us <ChevronDown size={16} />
          </button>

          {activeMenu === "about" && (
            <div className="absolute top-full left-0 bg-amber-50 text-black shadow-xl w-36 py-4 px-6">
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
        </div> */}

        {/* SHOP BY CATEGORY */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("Shop By Category")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Shop By Category <ChevronDown size={16} />
          </button>

          {activeMenu === "Shop By Category" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-amber-50 text-black shadow-2xl w-[1100px] p-8 grid grid-cols-4 gap-8 z-[1000]">

              {/* Column 1 */}
              <div>
                <Link href="/images/bangles.jpg" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/clearance-jewellery.webp" alt="" width={40} height={40} className="rounded-md" /> Clearance Jewellery </Link>
                <Link href="/category/bridal-jewellery-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/american-diamond.avif" alt="" width={40} height={40} className="rounded-md" /> American Diamond </Link>
                <Link href="/category/designer-jewellery" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/bangles.jpg" alt="" width={40} height={40} className="rounded-md" /> Bnagles </Link>
                <Link href="/category/exclusive-luxury-jewellery" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/banner-3.jpg" alt="" width={40} height={40} className="rounded-md" /> Bridal Sets </Link>
              </div>
              {/* Column 2 */}

              <div>
                <Link href="/category/antique-necklace" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/necklace.jpg" alt="" width={40} height={40} className="rounded-md" /> Choker Sets </Link>
                <Link href="/category/choker-necklace-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/earrings.jpg" alt="" width={40} height={40} className="rounded-md" /> Earrings </Link>
                <Link href="/category/ad-necklace-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/hand-pieces.avif" alt="" width={40} height={40} className="rounded-md" /> Hand Pieces </Link>
                <Link href="/category/artificial-jewellery-set" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/headbands.avif" alt="" width={40} height={40} className="rounded-md" /> Headbands </Link>
              </div>
              {/* Column 3 */}
              <div>
                <Link href="/category/chandbali-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/jadau.avif" alt="" width={40} height={40} className="rounded-md" /> Jadau </Link>
                <Link href="/category/american-diamond-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/jhumar-passa.avif" alt="" width={40} height={40} className="rounded-md" /> Jhumar / Passa </Link>
                <Link href="/category/emerald-ruby-earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/mother-of-pearl.avif" alt="" width={40} height={40} className="rounded-md" /> Mother of Pearl Sets </Link>
                <Link href="/category/earrings" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/nath.avif" alt="" width={40} height={40} className="rounded-md" /> Nath </Link> </div>


              {/* Column 4 */}
              <div> <Link href="/category/bangles" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                <Image src="/images/banner-3.jpg" alt="" width={40} height={40} className="rounded-md" /> Party Wear </Link>
                <Link href="/category/bracelet" className="flex items-center gap-3 mb-3 hover:text-[#8B0000]">
                  <Image src="/images/rings.jpg" alt="" width={40} height={40} className="rounded-md" /> Rings </Link> </div>



            </div>
          )}
        </div>

        <Link href="/party-ready-collections">The Complete Set</Link>
                <Link href="/party-ready-collections">Review</Link>


        {/* RIGHT SECTION */}
        <div className="absolute right-0 flex items-center gap-6">



          {/* ICONS */}
          <Search size={20} className="cursor-pointer hover:text-[#D4AF37]" />

          {/* USER */}
          <div ref={dropdownRef} className="relative">

            <User
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md py-2 z-[999]">

                {!user ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Login
                    </Link>

                    <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-sm border-b">
                      Hi, <span className="font-semibold">{user.name}</span>
                    </div>

                    <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Account
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}

              </div>
            )}

          </div>

          <ShoppingCart size={20} className="cursor-pointer hover:text-[#D4AF37]" />
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/rani-logo-removebg.png"
              alt="Rani designer Logo"
              width={140}
              height={50}
              className="object-contain h-[100px]"
              priority
            />
          </Link>
        </div>

      </div>

    </nav>
  );
}