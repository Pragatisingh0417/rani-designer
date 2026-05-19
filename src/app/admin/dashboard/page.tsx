"use client";

import { RevenueChart } from "@/app/components/RevenueChart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/format";
import { Euro, ShoppingCart, Users } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/orders/recent"),
      ]);

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();

      setStats(statsData);
      setRecentOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-40"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const topProduct = stats?.topProducts?.[0];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your store performance
        </p>
      </div>

      {/* 🔥 Stats */}
     <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6">

  <StatCard
    title="Total Revenue"
    value={formatCurrency(stats?.totalRevenue || 0)}
    growth={stats?.growth}
    icon={<Euro size={18} />}
  />

  <StatCard
    title="Orders"
    value={stats?.totalOrders || 0}
    icon={<ShoppingCart size={18} />}
  />

  <StatCard
    title="Paid Orders"
    value={stats?.paidOrders || 0}
    icon={<Euro size={18} />}
  />

  <StatCard
    title="COD Orders"
    value={stats?.codOrders || 0}
    icon={<ShoppingCart size={18} />}
  />

  <StatCard
    title="Cancelled"
    value={stats?.cancelledOrders || 0}
    icon={<Users size={18} />}
  />

</div>

      {/* 📊 Chart */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-sm font-medium text-gray-600 mb-4">
          Revenue Overview
        </h2>

        <RevenueChart data={stats?.monthlyRevenue || []} />
      </div>

      {/* 🔽 Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🛍️ Top Product */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Top Product
          </h2>

          {topProduct ? (
            <div className="flex items-center gap-4">

              <img
                src={
                  topProduct?.image
                    ? topProduct.image.startsWith("/")
                      ? topProduct.image
                      : `/uploads/${topProduct.image}`
                    : "/placeholder.png"
                }
                className="w-16 h-16 rounded-xl object-cover border shadow-sm"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {topProduct.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {topProduct.sales || 0} sales
                </p>

                <Link
                  href={`/admin/products/edit/${topProduct._id}`}
                  className="text-xs text-[#03228f] mt-1 inline-block hover:underline"
                >
                  View product →
                </Link>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md shadow-sm">
                #1
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No product data
            </p>
          )}
        </div>

        {/* 📦 Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-600">
              Recent Orders
            </h2>

            <Link
              href="/admin/orders"
              className="text-xs text-[#03228f] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-400">
                No recent orders
              </p>
            ) : (
              recentOrders.map((order: any) => {
                const item = order.items?.[0];

                return (
                  <Link
                    key={order._id}
                    href={`/admin/orders/${order._id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3">

                      <img
                        src={
                          item?.image
                            ? item.image.startsWith("/")
                              ? item.image
                              : `/uploads/${item.image}`
                            : "/placeholder.png"
                        }
                        className="w-10 h-10 rounded-md object-cover border shadow-sm"
                      />

                      <div>
                        <p className="text-sm text-gray-900">
                          {order.customerName || "Guest"}
                        </p>

                        <p className="text-xs text-gray-500 line-clamp-1">
                          {order.items?.length > 1
                            ? `${item?.name} +${order.items.length - 1} more`
                            : item?.name || "Product"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.total || 0)}
                      </p>

                      <span
                        className={`text-xs font-medium ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Shipped"
                            ? "text-blue-600"
                            : order.status === "Pending"
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// 🔥 Premium Stat Card
function StatCard({ title, value, growth, icon }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{title}</p>

        <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-2 text-gray-900">
        {value}
      </h3>

      {growth !== undefined && (
        <p
          className={`text-xs mt-1 ${
            growth >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
        </p>
      )}
    </div>
  );
}