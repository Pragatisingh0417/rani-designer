"use client";
import { usePathname } from "next/navigation";
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
const [categories, setCategories] = useState<any[]>([]);
const pathname = usePathname();
const isHome = pathname === "/";
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



  useEffect(() => {

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  fetchCategories();

}, []);


  return (
<nav className={`hidden md:block py-1 absolute top-0 left-0 w-full z-50 
${isHome ? "text-white" : "text-black bg-transpareant shadow-sm"}
`}>
      <div
        className="w-full   mx-auto p-10 flex justify-center gap-10 text-[15px] tracking-wide relative  items-center "
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
           <div className="absolute left-1/2 -translate-x-1/2 top-full bg-amber-50 text-black shadow-2xl w-[900px] p-8 grid grid-cols-4 gap-6 z-[1000]">

{categories.map((cat:any)=>(
  
<Link
key={cat._id}
href={`/products/${cat.slug}`}
className="flex items-center gap-3 hover:text-[#8B0000]"
>

{/* <Image
src="/images/necklace.jpg"
alt={cat.name}
width={40}
height={40}
className="rounded-md"
/> */}

{cat.name}

</Link>

))}

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