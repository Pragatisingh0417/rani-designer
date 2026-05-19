"use client";
import { usePathname, useRouter } from "next/navigation";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /* AUTH */
  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };

  const handleLogout = () => {
    logout();
  };

  /* HOVER */
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 150);
  };

  /* FETCH CATEGORIES */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  /* CLOSE SEARCH ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".search-box")) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* LIVE SEARCH (FIXED) */
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
      className={`hidden md:block py-2 w-full z-50
      ${isHome
          ? "absolute top-0 left-0 text-white bg-transparent"
          : "relative bg-black text-white shadow-sm"
        }`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div
        className="w-full mx-auto p-5 flex justify-center gap-10 text-[17.5px] tracking-wide relative items-center"
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
              <Link href="/about-us" className="block py-2 hover:text-[#8B0000]">Know Us</Link>
              <Link href="/contact-us" className="block py-2 hover:text-[#8B0000]">Contact</Link>
              <Link href="/faq" className="block py-2 hover:text-[#8B0000]">FAQ</Link>
            </div>
          )}
        </div>

        {/* CATEGORY */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu("category")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center gap-1">
            Shop By Category <ChevronDown size={16} />
          </button>

          {activeMenu === "category" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-amber-50 text-black shadow-2xl w-[900px] p-8 grid grid-cols-4 gap-6 z-[1000]">
              {categories.map((cat: any) => (
                <Link key={cat._id} href={`/products/${cat.slug}`} className="flex items-center gap-3 hover:text-[#8B0000]">
                  <Image src={cat.image || "/placeholder.png"} alt={cat.name} width={40} height={40} className="rounded-md" />
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/party-ready-collections">The Complete Set</Link>

        {/* RIGHT */}
        <div className="absolute right-0 flex items-center gap-6">

          {/* SEARCH */}
          <div className="relative flex items-center search-box">

            <input
              type="text"
              autoFocus={showSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products.."
              className={`absolute right-8 top-1/2 -translate-y-1/2
              bg-white text-black border rounded-md px-3 py-1 text-sm shadow-md
              transition-all duration-300 origin-right
              ${showSearch
                  ? "w-35 opacity-100 scale-100"
                  : "w-0 opacity-0 scale-95 pointer-events-none"
                }`}
            />

            {/* RESULTS */}
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
                    <img src={item.images?.[0]} className="w-10 h-10 rounded object-cover" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* NO RESULT */}
            {showSearch && searchQuery.length >= 2 && results.length === 0 && !loading && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-md p-3 rounded">
                No products found
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-md p-3 rounded">
                Searching...
              </div>
            )}

            <Search
              size={20}
              className="cursor-pointer hover:text-[#D4AF37]"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          </div>

          {/* USER */}
          <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <User size={20} className="cursor-pointer hover:text-[#D4AF37]" />

            {isHovering && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md py-2 z-[999]">
                {!user ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                    <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100">Signup</Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b">Hi, {user.name}</div>
                    <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>
                    <Link
                      href="/account?tab=orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* WISHLIST */}
          <Link href="/wishlist" className="relative">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CART */}
          <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* LOGO */}
          <Link href="/">
            <Image src="/images/rani-logo-removebg.png" alt="logo" width={100} height={100} className="h-[100px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}