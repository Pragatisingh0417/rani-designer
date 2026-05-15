"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const [dateFilter, setDateFilter] = useState("all");
  const [customRange, setCustomRange] = useState({
    from: "",
    to: "",
  });


  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Reset page on search/filter
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  // 🔍 FILTER + SEARCH (safe)
  const filtered = orders.filter((order) => {
    const matchesSearch =
      order._id?.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const now = new Date();

    let matchesDate = true;

    if (dateFilter === "week") {
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      matchesDate = new Date(order.createdAt) >= lastWeek;
    }

    if (dateFilter === "month") {
      const lastMonth = new Date();
      lastMonth.setDate(now.getDate() - 30);
      matchesDate = new Date(order.createdAt) >= lastMonth;
    }

    if (dateFilter === "year") {
      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);
      matchesDate = new Date(order.createdAt) >= lastYear;
    }

    if (dateFilter === "custom") {
      if (customRange.from && customRange.to) {
        const from = new Date(customRange.from);
        const to = new Date(customRange.to);
        matchesDate =
          new Date(order.createdAt) >= from &&
          new Date(order.createdAt) <= to;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // 📄 PAGINATION
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  // 📦 SELECT ONE
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ✅ FIXED SELECT ALL
  const selectAll = () => {
    const currentIds = paginated.map((o) => o._id);

    const allSelected = currentIds.every((id) =>
      selected.includes(id)
    );

    if (allSelected) {
      setSelected((prev) =>
        prev.filter((id) => !currentIds.includes(id))
      );
    } else {
      setSelected((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  // 🔄 SINGLE STATUS UPDATE
  const updateStatus = async (id: string, status: string) => {
    setLoading(true);

    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    await fetchOrders();
    setLoading(false);
  };

  // 📦 BULK UPDATE
  const handleBulkUpdate = async (status: string) => {
    setLoading(true);

    await Promise.all(
      selected.map((id) =>
        fetch(`/api/orders/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        })
      )
    );

    setSelected([]);
    await fetchOrders();
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-semibold mb-6">
        Orders</h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex gap-4 mb-4 items-center">

        {/* 🔍 Search */}
        <input
          placeholder="Search by name or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />

        {/* 📦 Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        {/* 📅 Date Filter (NEW) */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
          <option value="custom">Custom Range</option>
        </select>

      </div>

      {dateFilter === "custom" && (
        <div className="flex gap-3 mb-4">
          <input
            type="date"
            value={customRange.from}
            onChange={(e) =>
              setCustomRange({ ...customRange, from: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={customRange.to}
            onChange={(e) =>
              setCustomRange({ ...customRange, to: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />
        </div>
      )}

      {/* 📦 BULK ACTION */}
      {selected.length > 0 && (
        <div className="mb-4 flex gap-3 items-center">
          <span className="text-sm text-gray-600">
            {selected.length} selected
          </span>

          <select
            onChange={(e) => handleBulkUpdate(e.target.value)}
            className="border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Bulk Action
            </option>
            <option value="Confirmed">Mark as Confirmed</option>
            <option value="Shipped">Mark as Shipped</option>
            <option value="Delivered">Mark as Delivered</option>
            <option value="Cancelled">Cancel Orders</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">
                <input type="checkbox" onChange={selectAll} />
              </th>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              {/* ✅ NEW */}
              <th className="p-4">Payment Method</th>
              <th className="p-4">Payment Status</th>

              <th className="p-4"> Order Status</th>
              <th className="p-4">Invoice</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">

                {/* Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(order._id)}
                    onChange={() => toggleSelect(order._id)}
                  />
                </td>

                {/* Order */}
                <td className="p-4">
                  <div className="flex items-center gap-3">

                    {/* Images */}
                    <div className="flex gap-1">
                      {order.items?.slice(0, 3).map((item: any, i: number) => (
                        <img
                          key={i}
                          src={item.image || "/placeholder.png"}
                          className="w-10 h-10 rounded-md object-cover border"
                        />
                      ))}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="font-medium text-sm">
                        {order.items?.length > 1
                          ? `${order.items[0].name} +${order.items.length - 1} more`
                          : order.items?.[0]?.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order._id}
                      </p>
                    </div>

                  </div>
                </td>

                {/* Customer */}
                <td className="p-4">{order.customerName}</td>

                {/* Date */}
                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Amount */}
                <td className="p-4 font-semibold">
                  £{order.total}
                </td>

                {/* Status */}
                {/* <td className="p-4">
                  <select
                    disabled={loading}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className={`border px-2 py-1 rounded ${
                      order.status === "Pending"
                        ? "bg-yellow-50"
                        : order.status === "Shipped"
                        ? "bg-blue-50"
                        : order.status === "Delivered"
                        ? "bg-green-50"
                        : ""
                    }`}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td> */}
                {/* ✅ PAYMENT METHOD */}
                <td className="p-4">
                  {order.paymentMethod === "ONLINE" ? (
                    <span className="text-green-600 font-medium">
                      Online
                    </span>
                  ) : (
                    <span className="text-orange-500 font-medium">
                      COD
                    </span>
                  )}
                </td>

                {/* ✅ PAYMENT STATUS */}
                <td className="p-4">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </td>

                {/* ORDER STATUS */}
               <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        order.status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "Confirmed"
          ? "bg-purple-100 text-purple-700"
          : order.status === "Shipped"
          ? "bg-blue-100 text-blue-700"
          : order.status === "Delivered"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }
    `}
  >
    {order.status}
  </span>
</td>
                {/* Invoice */}
                <td className="p-4">
                  <button
                    onClick={() =>
                      window.open(`/admin/orders/${order._id}/invoice`, "_blank")
                    }
                    className="text-green-600"
                  >
                    Print
                  </button>
                </td>

                {/* Action */}
                <td className="p-4">
                  <Link
                    href={`/admin/orders/${order._id}`}
                    className="text-blue-600"
                  >
                    View →
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {Math.ceil(filtered.length / ITEMS_PER_PAGE)}
        </span>

        <button
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}