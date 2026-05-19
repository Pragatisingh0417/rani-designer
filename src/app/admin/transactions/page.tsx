"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/app/lib/format";

export default function TransactionsPage() {

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await fetch("/api/orders");

                const data = await res.json();

                setOrders(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };

        fetchOrders();

    }, []);

    // ✅ SUMMARY
    const stats = useMemo(() => {

        const totalRevenue = orders
            .filter((o) => o.isPaid)
            .reduce((acc, item) => acc + item.total, 0);

        const totalPaid = orders.filter(
            (o) => o.isPaid
        ).length;

        const codPending = orders.filter(
            (o) =>
                o.paymentMethod === "COD" &&
                !o.isPaid
        ).length;

        const cancelled = orders.filter(
            (o) => o.status === "Cancelled"
        ).length;

        return {
            totalRevenue,
            totalPaid,
            codPending,
            cancelled,
        };

    }, [orders]);

    return (
        <section className="p-4 md:p-6 max-w-7xl mx-auto">

            {/* TITLE */}
            <div className="mb-8">

                <h1 className="text-2xl md:text-3xl font-semibold">
                    Transactions
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    Monitor all payments and order transactions
                </p>

            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Revenue
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {formatCurrency(stats.totalRevenue)}
                    </h2>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Paid Orders
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {stats.totalPaid}
                    </h2>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        COD Pending
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {stats.codPending}
                    </h2>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Cancelled
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {stats.cancelled}
                    </h2>
                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-2xl overflow-hidden">

                {/* DESKTOP */}
                <div className="hidden lg:block overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">

                            <tr className="text-left text-sm text-gray-600">

                                <th className="px-6 py-4 font-medium">
                                    Order
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Customer
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Amount
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Payment
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr
                                    key={order._id}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4">

                                        <div>

                                            <p className="font-medium">
                                                #{order._id.slice(-6)}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                {order.stripePaymentIntentId
                                                    || "COD"}
                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">
                                        {order.customerName}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        {formatCurrency(order.total)}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.paymentMethod === "ONLINE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-orange-100 text-orange-700"
                                            }`}>
                                            {order.paymentMethod}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.isPaid
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {order.isPaid
                                                ? "Paid"
                                                : "Pending"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt)
                                            .toLocaleDateString()}
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* MOBILE */}
                <div className="lg:hidden divide-y">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="p-4"
                        >

                            <div className="flex justify-between items-start gap-3">

                                <div>

                                    <p className="font-semibold">
                                        #{order._id.slice(-6)}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {order.customerName}
                                    </p>

                                </div>

                                <p className="font-semibold">
                                    {formatCurrency(order.total)}
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">

                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${order.paymentMethod === "ONLINE"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                    }`}>
                                    {order.paymentMethod}
                                </span>

                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${order.isPaid
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {order.isPaid
                                        ? "Paid"
                                        : "Pending"}
                                </span>

                            </div>

                            <p className="text-xs text-gray-400 mt-3">
                                {new Date(order.createdAt)
                                    .toLocaleDateString()}
                            </p>

                        </div>
                    ))}

                </div>

                {/* EMPTY */}
                {!loading && orders.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No transactions found.
                    </div>
                )}

                {/* LOADING */}
                {loading && (
                    <div className="p-10 text-center text-gray-500">
                        Loading transactions...
                    </div>
                )}

            </div>

        </section>
    );
}