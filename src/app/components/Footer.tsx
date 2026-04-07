"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-[#0a0a0a] text-white pt-16 px-6 md:px-16">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-14">

        {/* Brand */}
        <div className="space-y-4">
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

          <p className="text-sm text-white/90 leading-relaxed">
            Celebrating timeless elegance through exquisite craftsmanship.
            Designed for queens who embrace tradition with modern grace.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            {[FaInstagram, FaFacebookF, FaPinterestP].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-[#b76e79] hover:scale-110 transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">
            Shop
          </h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li><Link href="/designer-choice/rajwadi-choice">Rajwadi Choice</Link></li>
            <li><Link href="/designer-choice/meenakari-choice">Meenakari Choice</Link></li>
            <li><Link href="/designer-choice/kangans-choice/diamond">Kangans Choice</Link></li>

            <li><Link href="/designer-choice/punjabi-traditional-choice">Punjabi Traditional Choice</Link></li>
            <li><Link href="/designer-choice/pachi-kundan-choice">Pachi Kundan Choice</Link></li>

            <li><Link href="/designer-choice/mother-of-pearl-choice">Mother Of Pearl Choice</Link></li>
            <li><Link href="/shop-by-category">Shop By Category</Link></li>


          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">
            Information
          </h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact-us">Contact</Link></li>
            <li><Link href="/faq">FAQs</Link></li>

            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-wide">
            Stay Connected
          </h3>

          <p className="text-sm text-white/90">
            Subscribe to get special offers, free giveaways, and updates.
          </p>

          {/* Email Input */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden backdrop-blur-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 text-sm w-full outline-none"
            />
            <button className="bg-red-600 px-5 py-2 text-sm hover:opacity-90 transition">
              Subscribe
            </button>
          </div>

          <div className="text-sm text-white/90 pt-2">
            <p>Email: info@ranidesigner.com</p>
            <p>Phone: +44 7405 769411</p>
            <p>London, UK</p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">

        <span>
          © 2026 Rani Designer. All rights reserved.
        </span>

        <div className="flex items-center gap-2">
          <span>Developed with</span>
          <span className="text-red-500">❤️</span>

          <a
            href="https://gemwebservices.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold hover:text-[#b76e79] transition"
          >
            <img
              src="/images/gem-logo-2.png"
              alt="Gem Web Services"
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}