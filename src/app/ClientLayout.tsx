"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContact from "@/app/components/FloatingContact";


export default function ClientLayout({ children }: any) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      <FloatingContact />
      {!isAdmin && <Footer />}
    </>
  );
}