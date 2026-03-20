"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "@/app/components/CartDrawer";
import { Toaster } from "react-hot-toast";

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
          <CartProvider>
<WishlistProvider>  
  <Toaster position="top-right" />
          {!isAdmin && <Header />}

          {children}

          {!isAdmin && <Footer />}
          <CartDrawer />
</WishlistProvider>
</CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}