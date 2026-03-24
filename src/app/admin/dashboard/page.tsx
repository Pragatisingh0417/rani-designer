"use client";

import { RevenueChart } from "@/app/components/RevenueChart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/format";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);

      const ordersRes = await fetch("/api/orders/recent");
      const ordersData = await ordersRes.json();
      setRecentOrders(ordersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const topProduct = stats?.topProducts?.[0];

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-black">
        Dashboard
      </h1>

      {/* 🔥 Stats */}
      <div className="grid md:grid-cols-3 gap-10 mb-6">
        <StatCard
          title="Total revenue"
          value={formatCurrency(stats.totalRevenue)}
          growth={stats.growth}
        />
        <StatCard
          title="Orders"
          value={stats.totalOrders}
        />
        <StatCard
          title="Visitors"
          value={stats.totalVisitors}
        />
        
      </div>

      {/* 🔥 Chart */}
      <div className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="text-sm text-gray-500 mb-3">
          Revenue overview
        </h2>
        <RevenueChart />
      </div>

      {/* 🔥 Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 🛍️ Top Product */}
        <div className="bg-white border rounded-xl p-5">
          <h2 className="text-sm text-gray-500 mb-4">
            Top product
          </h2>

          {topProduct ? (
            <div className="flex items-center gap-4">
              <img
                src={
  topProduct.image?.startsWith("/uploads")
    ? topProduct.image
    : `/uploads/${topProduct.image}`
}
                className="w-16 h-16 rounded-lg object-cover border"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {topProduct.name}
                </p>

                <p className="text-xs text-gray-500">
                  {topProduct.sales || 0} sales
                </p>

                <Link
                  href={`/admin/products/edit/${topProduct._id}`}
                  className="text-xs text-[#03228f] hover:underline"
                >
                  View product →
                </Link>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                #1
              </span>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              No product data
            </p>
          )}
        </div>

        {/* 📦 Recent Orders */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-500">
              Recent orders
            </h2>

            <Link
              href="/admin/orders"
              className="text-xs text-[#03228f]"
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
                  <div
                    key={order._id}
                    className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item?.image
                            ? `/uploads/${item.image}`
                            : "/placeholder.png"
                        }
                        className="w-10 h-10 rounded object-cover border"
                      />

                      <div>
                        <p className="text-gray-800">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item?.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-800 font-medium">
                        {formatCurrency(order.total)}
                      </p>

                      <span
                        className={`text-xs ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, growth }: any) {
  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-sm transition">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-xl font-semibold mt-1 text-gray-900">
        {value}
      </h3>

      {growth !== undefined && (
        <p
          className={`text-xs mt-1 ${
            growth >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}% from last month
        </p>
      )}
    </div>
  );
}