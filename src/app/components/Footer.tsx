"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#B9AA52] text-[#141414] pt-20 pb-10 px-6 md:px-16">
      
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#7a1e1e] pb-14">

        {/* Brand */}
        <div>
          <h2 className="text-3xl mb-6">Rani Designer</h2>
          <p className="text-sm  leading-relaxed">
            Celebrating timeless elegance through exquisite craftsmanship.
            Designed for queens who embrace tradition with modern grace.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xl mb-6">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#">Wedding Collection</Link></li>
            <li><Link href="#">Gold Jewellery</Link></li>
            <li><Link href="#">Diamond Collection</Link></li>
            <li><Link href="#">Dailywear</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-xl mb-6">Information</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl mb-6">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>Email: info@ranidesigner.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mumbai, India</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-[#b76e79] rounded-full hover:bg-[#b76e79] hover:text-white transition">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-[#b76e79] rounded-full hover:bg-[#b76e79] hover:text-white transition">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-[#b76e79] rounded-full hover:bg-[#b76e79] hover:text-white transition">
              <FaPinterestP size={14} />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-sm  mt-10">
        © {new Date().getFullYear()} Rani Designer. All Rights Reserved.
      </div>

    </footer>
  );
}
