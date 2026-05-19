"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { formatCurrency } from "@/app/lib/format";

import {
    User,
    Package,
    MapPin,
    Heart,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

export default function Account() {
    const { user, logout } = useAuth();

    const [activeTab, setActiveTab] = useState("dashboard");
    const [orders, setOrders] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);

    const menu = [
        { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { key: "orders", label: "My Orders", icon: Package },
        { key: "profile", label: "Profile", icon: User },
        { key: "address", label: "Addresses", icon: MapPin },
        { key: "wishlist", label: "Wishlist", icon: Heart },
    ];
    const [newAddress, setNewAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    // 🔥 Fetch user orders
    useEffect(() => {
        if (!user?._id) return;

        fetch(`/api/orders/user?userId=${user._id}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(Array.isArray(data) ? data : []);
            });
    }, [user]);

    // 🔥 Avatar initial
    const getInitial = (name: string) => {
        return name?.charAt(0).toUpperCase() || "U";
    };
    //wishlist 
    useEffect(() => {
        if (!user?._id) return;

        fetch(`/api/wishlist?userId=${user._id}`)
            .then((res) => res.json())
            .then((data) => setWishlist(data));
    }, [user]);


    //address
    useEffect(() => {
        if (!user?._id) return;

        fetch(`/api/address?userId=${user._id}`)
            .then((res) => res.json())
            .then(setAddresses);
    }, [user]);

    // ✅ SAVE ADDRESS
    const saveAddress = async () => {
        if (!user?._id) return;

        try {
            await fetch("/api/address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newAddress,
                    userId: user._id,
                }),
            });

            // 🔥 refresh list
            const res = await fetch(`/api/address?userId=${user._id}`);
            const data = await res.json();
            setAddresses(data);

            // 🔥 reset form
            setNewAddress({
                fullName: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
            });

        } catch (err) {
            console.error(err);
        }
    };

    // ✅ DELETE ADDRESS
    const deleteAddress = async (id: string) => {
        console.log("Deleting ID:", id); // 👈 ADD THIS

        try {
            await fetch(`/api/address/${id}`, {
                method: "DELETE",
            });

            // 🔥 instant UI update
            setAddresses((prev: any[]) =>
                prev.filter((addr) => addr._id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <section className="min-h-screen bg-[#f5f5f6] py-4 md:py-10 py-40">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 p-3 md:p-6">

                {/* MOBILE MENU */}
                <div className="lg:hidden overflow-x-auto no-scrollbar">
                    <div className="flex gap-2 min-w-max pb-2">
                        {menu.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.key}
                                    onClick={() => setActiveTab(item.key)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm whitespace-nowrap transition font-medium ${activeTab === item.key
                                        ? "bg-blue-900 text-white"
                                        : "bg-white text-gray-700"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </button>
                            );
                        })}

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-50 text-red-500 whitespace-nowrap"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* DESKTOP SIDEBAR */}
                <div className="hidden lg:block w-[260px] bg-white rounded-2xl shadow-sm p-4 h-fit">

                    {/* User Info */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                            {getInitial(user?.name)}
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Hello,</p>
                            <p className="font-medium">{user?.name || "User"}</p>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col gap-2">
                        {menu.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.key}
                                    onClick={() => setActiveTab(item.key)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition font-medium ${activeTab === item.key
                                        ? "bg-blue-900 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 mt-6 w-full rounded-xl text-sm text-red-500 hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 md:p-6 overflow-hidden">

                    {/* DASHBOARD */}
                    {activeTab === "dashboard" && (
                        <div>

                            <div className="mb-6 p-4 md:p-5 bg-gray-50 rounded-2xl flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-semibold shrink-0">
                                    {getInitial(user?.name)}
                                </div>

                                <div className="min-w-0">
                                    <h1 className="text-lg md:text-xl font-semibold truncate">
                                        Welcome, {user?.name || "User"} 👋
                                    </h1>

                                    <p className="text-sm text-gray-500 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                <div className="border rounded-2xl p-4 bg-white">
                                    <p className="text-sm text-gray-500">
                                        Total Orders
                                    </p>

                                    <p className="text-2xl font-semibold mt-2">
                                        {orders.length}
                                    </p>
                                </div>

                                <div className="border rounded-2xl p-4 bg-white">
                                    <p className="text-sm text-gray-500">
                                        Wishlist
                                    </p>

                                    <p className="text-2xl font-semibold mt-2">
                                        {wishlist.length}
                                    </p>
                                </div>

                                <div className="border rounded-2xl p-4 bg-white">
                                    <p className="text-sm text-gray-500">
                                        Addresses
                                    </p>

                                    <p className="text-2xl font-semibold mt-2">
                                        {addresses.length}
                                    </p>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ORDERS */}
                    {activeTab === "orders" && (
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold mb-6">
                                My Orders
                            </h1>

                            {orders.length === 0 ? (
                                <p className="text-gray-400">No orders yet.</p>
                            ) : (
                                <div className="space-y-5">

                                    {orders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="border rounded-2xl p-4 md:p-5"
                                        >

                                            {/* Top */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Order #{order._id.slice(-6)}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {new Date(order.createdAt).toDateString()}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`text-xs px-3 py-1 rounded-full capitalize w-fit font-medium
    ${order.status === "delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status === "cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : order.status === "shipped"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>

                                            {/* Items */}
                                            <div className="space-y-4">
                                                {order.items?.map((item: any, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="flex gap-3"
                                                    >

                                                        <img
                                                            src={item.image}
                                                            className="w-20 h-24 object-cover rounded-xl"
                                                        />

                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium line-clamp-2">
                                                                {item.name}
                                                            </p>

                                                            <p className="text-sm text-gray-500 mt-1">
                                                                Qty: {item.quantity}
                                                            </p>

                                                            <p className="text-sm font-semibold mt-2">
                                                                {formatCurrency(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bottom */}
                                            <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-5 pt-4 border-t">

                                                <div className="space-y-1">

                                                    <p className="font-semibold">
                                                        Total: {formatCurrency(order.total)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Payment:
                                                        <span
                                                            className={`ml-2 font-medium ${order.paymentMethod === "ONLINE"
                                                                ? "text-green-600"
                                                                : "text-orange-500"
                                                                }`}
                                                        >
                                                            {order.paymentMethod === "ONLINE"
                                                                ? "Online"
                                                                : "Cash on Delivery"}
                                                        </span>
                                                    </p>

                                                    <p className="text-sm">
                                                        Status:
                                                        <span
                                                            className={`ml-2 font-medium ${order.isPaid
                                                                ? "text-green-600"
                                                                : "text-yellow-600"
                                                                }`}
                                                        >
                                                            {order.isPaid ? "Paid" : "Pending"}
                                                        </span>
                                                    </p>

                                                </div>

                                                <div className="flex gap-3">

                                                    <button className="text-sm text-gray-600 hover:text-black text-left md:text-right">
                                                        Invoice
                                                    </button>

                                                    {/* CANCEL BUTTON */}
                                                    {order.status !== "cancelled" &&
                                                        order.status !== "delivered" && (
                                                            <button
                                                                onClick={async () => {

                                                                    const confirmCancel = window.confirm(
                                                                        "Are you sure you want to cancel this order?"
                                                                    );

                                                                    if (!confirmCancel) return;

                                                                    try {

                                                                        const res = await fetch(`/api/orders/${order._id}`, {
                                                                            method: "PUT",
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                            },
                                                                            body: JSON.stringify({
                                                                                status: "cancelled",
                                                                            }),
                                                                        });

                                                                        if (res.ok) {

                                                                            // 🔥 instant UI update
                                                                            setOrders((prev: any[]) =>
                                                                                prev.map((o) =>
                                                                                    o._id === order._id
                                                                                        ? { ...o, status: "cancelled" }
                                                                                        : o
                                                                                )
                                                                            );

                                                                            alert("Order cancelled successfully");

                                                                        } else {
                                                                            alert("Failed to cancel order");
                                                                        }

                                                                    } catch (error) {
                                                                        console.error(error);
                                                                        alert("Something went wrong");
                                                                    }
                                                                }}
                                                                className="text-sm text-red-500 hover:text-red-700 font-medium"
                                                            >
                                                                Cancel Order
                                                            </button>
                                                        )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROFILE */}
                    {activeTab === "profile" && (
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold mb-6">
                                Profile
                            </h1>

                            <div className="space-y-4 max-w-2xl">

                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="w-full border p-3 rounded-xl"
                                />

                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="w-full border p-3 rounded-xl"
                                />

                                <button className="bg-black text-white px-6 py-3 rounded-xl">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ADDRESS */}
                    {activeTab === "address" && (
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold mb-6">
                                Addresses
                            </h1>

                            {/* FORM */}
                            <div className="border rounded-2xl p-4 md:p-6 mb-8">

                                <h2 className="text-lg font-semibold mb-4">
                                    Add New Address
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <input
                                        value={newAddress.fullName}
                                        placeholder="Full Name"
                                        className="border px-4 py-3 rounded-xl"
                                        onChange={(e) =>
                                            setNewAddress({
                                                ...newAddress,
                                                fullName: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        value={newAddress.phone}
                                        placeholder="Phone Number"
                                        className="border px-4 py-3 rounded-xl"
                                        onChange={(e) =>
                                            setNewAddress({
                                                ...newAddress,
                                                phone: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        value={newAddress.city}
                                        placeholder="City"
                                        className="border px-4 py-3 rounded-xl"
                                        onChange={(e) =>
                                            setNewAddress({
                                                ...newAddress,
                                                city: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        value={newAddress.pincode}
                                        placeholder="Pincode"
                                        className="border px-4 py-3 rounded-xl"
                                        onChange={(e) =>
                                            setNewAddress({
                                                ...newAddress,
                                                pincode: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <textarea
                                    value={newAddress.address}
                                    placeholder="Full Address"
                                    className="border px-4 py-3 rounded-xl w-full mt-4"
                                    rows={4}
                                    onChange={(e) =>
                                        setNewAddress({
                                            ...newAddress,
                                            address: e.target.value,
                                        })
                                    }
                                />

                                <button
                                    onClick={saveAddress}
                                    className="mt-5 bg-black text-white px-6 py-3 rounded-xl"
                                >
                                    Save Address
                                </button>
                            </div>

                            {/* ADDRESS LIST */}
                            {addresses.length === 0 ? (
                                <p className="text-gray-400">
                                    No saved addresses
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {addresses.map((addr: any) => (
                                        <div
                                            key={addr._id}
                                            className="border rounded-2xl p-5"
                                        >

                                            <div className="flex justify-between items-start gap-3 mb-3">

                                                <p className="font-semibold text-lg">
                                                    {addr.fullName}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        deleteAddress(addr._id)
                                                    }
                                                    className="text-xs text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <p className="text-sm text-gray-500 mb-2">
                                                📞 {addr.phone}
                                            </p>

                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {addr.address}, {addr.city}
                                            </p>

                                            <p className="text-sm text-gray-700 mt-1">
                                                {addr.pincode}
                                            </p>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* WISHLIST */}
                    {activeTab === "wishlist" && (
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold mb-6">
                                Wishlist
                            </h1>

                            {wishlist.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-gray-400 mb-2">
                                        Your wishlist is empty 💔
                                    </p>

                                    <a
                                        href="/products"
                                        className="text-black underline"
                                    >
                                        Continue Shopping
                                    </a>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

                                    {wishlist.map((item: any) => (
                                        <div
                                            key={item._id}
                                            className="border rounded-2xl overflow-hidden bg-white"
                                        >

                                            <img
                                                src={
                                                    item.productId?.images?.[0] ||
                                                    "/placeholder.png"
                                                }
                                                className="w-full aspect-[3/4] object-cover"
                                            />

                                            <div className="p-3">

                                                <p className="text-sm font-medium line-clamp-2 min-h-[40px]">
                                                    {item.productId?.name}
                                                </p>

                                                <p className="text-sm text-gray-600 mt-1">
                                                    {formatCurrency(
                                                        item.productId?.price
                                                    )}
                                                </p>

                                                <button
                                                    onClick={async () => {
                                                        await fetch("/api/wishlist", {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                userId: user._id,
                                                                productId:
                                                                    item.productId._id,
                                                            }),
                                                        });

                                                        setWishlist((prev: any[]) =>
                                                            prev.filter(
                                                                (w) =>
                                                                    w._id !== item._id
                                                            )
                                                        );
                                                    }}
                                                    className="text-xs text-red-500 mt-3"
                                                >
                                                    Remove
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}