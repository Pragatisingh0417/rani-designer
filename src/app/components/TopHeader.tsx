"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function TopHeader() {

  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <section className="hidden lg:block">
      <div className="bg-[#000000] text-white relative h-20 flex items-center justify-center z-[1000]">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mt-2">
          <Image
            src="/images/rani-logo-removebg.png"
            alt="Rani designer Logo"
            width={140}
            height={50}
            className="object-contain h-[120px]"
            priority
          />
        </Link>

        {/* Right Icons */}
        <div className="absolute right-8 flex items-center gap-6">

          <Search size={20} className="cursor-pointer hover:text-[#D4AF37]" />

          {/* USER DROPDOWN */}
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
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-sm border-b">
                      Hi, <span className="font-semibold">{user.name}</span>
                    </div>

                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
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
    </section>
  );
}