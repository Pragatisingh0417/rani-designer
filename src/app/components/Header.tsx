"use client";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="w-full relative z-50">
      <DesktopNav />
      <MobileNav />
    </header>
  );
}