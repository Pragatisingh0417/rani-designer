"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded ${
      pathname === path
        ? "bg-yellow-500 text-black"
        : "hover:text-yellow-400"
    }`;

  return (
    <aside className="w-64 bg-black text-white p-6">

      <h2 className="text-xl font-bold mb-8">
        Admin Panel
      </h2>

      <nav className="space-y-3">

        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          Dashboard
        </Link>

        <Link href="/admin/products" className={linkClass("/admin/products")}>
          Products
        </Link>

        <Link href="/admin/categories" className={linkClass("/admin/categories")}>
          Categories
        </Link>

        <Link href="/admin/orders" className={linkClass("/admin/orders")}>
          Orders
        </Link>

        <Link href="/admin/users" className={linkClass("/admin/users")}>
          Users
        </Link>

      </nav>

    </aside>
  );
}