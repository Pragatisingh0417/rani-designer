"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

type UserType = {
  name: string;
  email?: string;
};

export default function MobileNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [userOpen, setUserOpen] = useState(false);

  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };


  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  // FETCH CATEGORIES (same as desktop)
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    setMobileOpen(false);
  };

  return (
<nav
  className={`md:hidden fixed w-full z-50 transition-all duration-300 shadow 
  ${
    scrolled
      ? "bg-black text-white shadow-md"
      : "bg-transparent text-white"
  }`}
  style={{ fontFamily: "'Playfair Display', serif" }}
>
  
        {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={26} />
        </button>

        <Image
          src="/images/rani-logo-removebg.png"
          alt="Logo"
          width={80}
          height={20}
        />

        <div className="flex items-center gap-4 relative">
          <Search size={20} className="cursor-pointer hover:text-[#D4AF37]" />

          {/* USER */}
          <div className="relative">
            <User
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
              onClick={() => setUserOpen(!userOpen)}
            />

            {userOpen && (
              <div className="absolute right-0 top-8 w-40 bg-white text-black rounded shadow-md z-50">
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
                      Hi, <b>{user.name}</b>
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
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[360px] bg-amber-50 text-black
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
            className="block border-b border-black/20 pb-3"
          >
            Home
          </Link>

          {/* SHOP BY CATEGORY (DYNAMIC) */}
          <div className="border-b border-black/20 pb-3">
            <button
              onClick={() =>
                setMobileSub(mobileSub === "category" ? null : "category")
              }
              className="flex justify-between w-full items-center"
            >
              Shop by Category
              <span className={`transform transition ${mobileSub === "category" ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {mobileSub === "category" && (
              <div className="pl-4 mt-3 flex flex-col space-y-3 text-sm">

                {categories.map((cat: any) => (
                  <Link
                    key={cat._id}
                    href={`/products/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={cat.image || "/placeholder.png"}
                      alt={cat.name}
                      width={28}
                      height={28}
                      className="rounded"
                    />
                    {cat.name}
                  </Link>
                ))}

              </div>
            )}
          </div>

          {/* SAME LINKS AS DESKTOP */}
          <Link
            href="/party-ready-collections"
            onClick={() => setMobileOpen(false)}
            className="block border-b border-black/20 pb-3"
          >
            The Complete Set
          </Link>

          <Link
            href="/party-ready-collections"
            onClick={() => setMobileOpen(false)}
            className="block border-b border-black/20 pb-3"
          >
            Review
          </Link>

        </div>
      </div>
    </nav>
  );
}