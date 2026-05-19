"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

type UserType = {
  name: string;
  email?: string;
};

export default function MobileNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [userOpen, setUserOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };

  const [scrolled, setScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


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


  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.closest(".user-menu")) {
        setUserOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setUserOpen(false);
  }, [pathname]);


  useEffect(() => {
    const handleScrollClose = () => {
      setUserOpen(false);
    };

    window.addEventListener("scroll", handleScrollClose);

    return () => window.removeEventListener("scroll", handleScrollClose);
  }, []);


  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?search=${searchQuery}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <nav
      className={`md:hidden fixed w-full z-50 transition-all duration-300
  ${isHome
          ? scrolled
            ? "bg-black text-white"
            : "bg-transparent text-white"
          : "bg-black text-white shadow"
        }`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={26} />
        </button>

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/images/rani-logo-removebg.png"
            alt="Rani designer Logo"
            width={80}
            height={20}

          />
        </Link>





        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              autoFocus={showSearch}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`absolute right-8 top-1/2 -translate-y-1/2
  bg-white text-black border rounded-md px-3 py-1 text-sm shadow-md
  transition-all duration-300 origin-right
  ${showSearch
                  ? "w-30 opacity-100 scale-100"
                  : "w-0 opacity-0 scale-95 pointer-events-none"}
  `}
            />

            <Search
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
              onClick={() => setShowSearch(prev => !prev)}
            />
          </div>
          {/* USER */}
          <div
            className="relative user-menu"
          >            <User
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
              onClick={(e) => {
                e.stopPropagation();
                setUserOpen((prev) => !prev);
              }} />


            {showSearch && searchQuery.length >= 2 && results.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black shadow-lg rounded-md z-[999] max-h-80 overflow-y-auto">

                {results.map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item.category?.slug}/${item.slug}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={item.images?.[0]}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}

              </div>
            )}

            {userOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded shadow-md z-50"
                onClick={(e) => e.stopPropagation()}
              >
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
                    <Link
                      href="/account?tab=orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
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

          <div
            className="relative  cursor-pointer"
            onClick={() => {
              setMobileOpen(false);
              setIsCartOpen(true);
            }}>

            <ShoppingCart size={20} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {cart.length}
              </span>
            )}
          </div>
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
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[360px] bg-[#F5F0E6] shadow-xl text-black
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
            href="/contact-us"
            onClick={() => setMobileOpen(false)}
            className="block border-b border-black/20 pb-3"
          >
            contact
          </Link>

        </div>
      </div>
    </nav>
  );
}