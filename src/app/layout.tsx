"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-[#f8f3eb]">

        <AuthProvider>

          {!isAdmin && <Header />}

          {children}

          {!isAdmin && <Footer />}

        </AuthProvider>

      </body>
    </html>
  );
}