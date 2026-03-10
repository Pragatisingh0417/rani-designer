import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rani_designer_hut",
  description: "rani_designer_hut",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.className}>
      <body className="bg-[#f8f3eb]">
        <AuthProvider>

        <TopHeader />
        <Header />
        {children}
        <Footer />
                </AuthProvider>

      </body>
    </html>
  );
}
