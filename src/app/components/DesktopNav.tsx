"use client";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, User, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

/* USER TYPE */
type UserType = {
  name: string;
  email?: string;
};

export default function DesktopNav() {

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { cart, setIsCartOpen } = useCart();
  const isHome = pathname === "/";
  

  /* AUTH CONTEXT */
  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };

  /* HANDLE LOGOUT */
  const handleLogout = () => {
    logout();
  };

  /* HOVER HANDLERS (NO FLICKER) */
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 150);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav
      className={`hidden md:block py-1 absolute top-0 left-0 w-full z-50  
      ${isHome ? "text-white" : "text-black bg-transpareant shadow-sm"}`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div
        className="w-full mx-auto p-10 flex justify-center gap-10 text-[17.5px] tracking-wide relative items-center"
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
        </div>

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
            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-amber-50 text-black shadow-2xl w-[900px] p-8 grid grid-cols-4 gap-6 z-[1000]">

              {categories.map((cat: any) => (
                <Link
                  key={cat._id}
                  href={`/products/${cat.slug}`}
                  className="flex items-center gap-3 hover:text-[#8B0000]"
                >
                  <Image
                    src={cat.image || "/placeholder.png"}
                    alt={cat.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  {cat.name}
                </Link>
              ))}

            </div>
          )}
        </div>

        <Link href="/party-ready-collections">The Complete Set</Link>

        {/* RIGHT SECTION */}
        <div className="absolute right-0 flex items-center gap-6">

          {/* SEARCH */}
          <Search size={20} className="cursor-pointer hover:text-[#D4AF37]" />

          {/* USER (HOVER) */}
          <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >

            <User
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
            />

            {isHovering && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md py-2 z-[999] transition-all duration-200">

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

          {/* ❤️ WISHLIST */}
          <Link href="/wishlist" className="relative">
            <Heart className="cursor-pointer hover:text-[#D4AF37]" size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-semibold px-1.5 py-[1px] rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 🛒 CART */}
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {cart.length}
              </span>
            )}
          </div>

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