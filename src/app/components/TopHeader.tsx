import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export default function TopHeader() {
  return (
    <section className="hidden lg:block">
      <div className="bg-[#000000] text-white relative h-20 flex items-center justify-center">

        {/* Logo Center */}
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

        {/* Icons Right */}
        <div className="absolute right-8 flex items-center gap-6">
          <Search size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
          <User size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
          <ShoppingCart size={20} className="cursor-pointer hover:text-[#D4AF37] transition" />
        </div>

      </div>
    </section>
  );
}