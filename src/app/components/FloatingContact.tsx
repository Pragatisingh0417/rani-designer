"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp */}
      <a
        href="https://wa.me/447405769411"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp size={22} className="text-white" />
      </a>

      {/* Phone */}
      <a
        href="tel:+447405769411"
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaPhoneAlt size={18} className="text-white" />
      </a>

    </div>
  );
}