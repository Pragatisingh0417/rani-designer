"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Star,
  ShoppingCart,
  CreditCard,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      pathname === path
        ? "bg-blue-900 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
    }`;

  return (
    <aside className="w-70 h-screen p-2 bg-gray-100">
      
      {/* Card Container */}
      <div className="h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        
        {/* Title */}
        <h2 className="text-xl font-bold mb-8 text-blue-900">
          Admin Panel
        </h2>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">

          <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link href="/admin/products" className={linkClass("/admin/products")}>
            <Package size={18} />
            Products
          </Link>

          <Link href="/admin/categories" className={linkClass("/admin/categories")}>
            <Tags size={18} />
            Categories
          </Link>

          <Link href="/admin/designer-choice" className={linkClass("/admin/designer-choice")}>
            <Star size={18} />
            Designer Choice
          </Link>

          <Link href="/admin/orders" className={linkClass("/admin/orders")}>
            <ShoppingCart size={18} />
            Orders
          </Link>

          <Link href="/admin/transactions" className={linkClass("/admin/transactions")}>
            <CreditCard size={18} />
            Transactions
          </Link>

          <Link href="/admin/users" className={linkClass("/admin/users")}>
            <Users size={18} />
            Users
          </Link>
        </nav>

        {/* Logout */}
<div className="mt-6">
  <button
    onClick={() => {
      document.cookie =
        "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      localStorage.removeItem("admin");

      window.location.href = "/admin-login";
    }}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
  >
    <LogOut size={18} /> 
    Logout
  </button>
</div>

      </div>
    </aside>
  );
}