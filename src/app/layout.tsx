import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "@/app/components/CartDrawer";
import { Toaster } from "react-hot-toast";
import FloatingContact from "@/app/components/FloatingContact";
import ClientLayout from "./ClientLayout";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="bg-[#f8f3eb]">

        <AuthProvider>
          <CartProvider>
            <WishlistProvider>

              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "#111",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  },
                }}
              />

              {/* ✅ ALL client logic moved here */}
              <ClientLayout>
                {children}
              </ClientLayout>

              <CartDrawer />

            </WishlistProvider>
          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}