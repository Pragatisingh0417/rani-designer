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
        <section className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto flex gap-6 p-6">

                {/* Sidebar */}
                <div className="w-[260px] bg-white rounded-2xl shadow-md p-4">

                    {/* User Info */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${activeTab === item.key
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

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl shadow-md p-6">

                    {/* 🔥 Dashboard */}
                    {activeTab === "dashboard" && (
                        <div>

                            <div className="mb-6 p-5 bg-gray-50 rounded-xl flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-semibold">
                                    {getInitial(user?.name)}
                                </div>

                                <div>
                                    <h1 className="text-xl font-semibold">
                                        Welcome, {user?.name || "User"} 👋
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-xl p-4">
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                    <p className="text-xl font-semibold mt-1">
                                        {orders.length}
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* 🔥 Orders */}
                    {activeTab === "orders" && (
                        <div>
                            <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

                            {orders.length === 0 ? (
                                <p className="text-gray-400">No orders yet.</p>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order._id} className="border-b pb-4">

                                            {/* Top */}
                                            <div className="flex justify-between mb-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Order #{order._id.slice(-6)}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(order.createdAt).toDateString()}
                                                    </p>
                                                </div>

                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                                                    {order.status}
                                                </span>
                                            </div>

                                            {/* Items */}
                                            {order.items?.map((item: any, i: number) => (
                                                <div key={i} className="flex gap-3 mb-3">
                                                    <img
                                                        src={item.image}
                                                        className="w-16 h-20 object-cover rounded-lg"
                                                    />

                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm font-medium">
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                            ))}

                                            {/* Bottom */}
                                            <div className="flex justify-between mt-2">
                                                <p className="font-semibold">
                                                    Total: {formatCurrency(order.total)}                        </p>

                                                <button className="text-sm text-gray-600 hover:text-black">
                                                    Invoice
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Profile */}
                    {activeTab === "profile" && (
                        <div>
                            <h1 className="text-2xl font-semibold mb-4">Profile</h1>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="w-full border p-3 rounded-lg"
                                />
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="w-full border p-3 rounded-lg"
                                />

                                <button className="bg-black text-white px-6 py-2 rounded-lg">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Address */}
                    {activeTab === "address" && (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Addresses</h1>

    {/* ➕ ADD FORM */}
    <div className="bg-white border rounded-2xl p-6 mb-8 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Add New Address
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          value={newAddress.fullName}
          placeholder="Full Name"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:border-black"
          onChange={(e) =>
            setNewAddress({ ...newAddress, fullName: e.target.value })
          }
        />

        <input
          value={newAddress.phone}
          placeholder="Phone Number"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:border-black"
          onChange={(e) =>
            setNewAddress({ ...newAddress, phone: e.target.value })
          }
        />

        <input
          value={newAddress.city}
          placeholder="City"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:border-black"
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
        />

        <input
          value={newAddress.pincode}
          placeholder="Pincode"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:border-black"
          onChange={(e) =>
            setNewAddress({ ...newAddress, pincode: e.target.value })
          }
        />
      </div>

      <textarea
        value={newAddress.address}
        placeholder="Full Address"
        className="border px-4 py-3 rounded-lg w-full mt-4 focus:outline-none focus:border-black"
        onChange={(e) =>
          setNewAddress({ ...newAddress, address: e.target.value })
        }
      />

      <button
        onClick={saveAddress}
        className="mt-5 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Save Address
      </button>
    </div>

    {/* 📍 ADDRESS LIST */}
    {addresses.length === 0 ? (
      <p className="text-gray-400">No saved addresses</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((addr: any) => (
          <div
            key={addr._id}
            className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition relative"
          >
            {/* Name + Action */}
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-lg">
                {addr.fullName}
              </p>

              <button
                onClick={() => deleteAddress(addr._id)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>

            {/* Phone */}
            <p className="text-sm text-gray-500 mb-2">
              📞 {addr.phone}
            </p>

            {/* Address */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {addr.address}, {addr.city}
            </p>

            <p className="text-sm text-gray-700">
              {addr.pincode}
            </p>

            {/* Optional badge */}
            <span className="inline-block mt-3 text-xs bg-gray-100 px-3 py-1 rounded-full">
              Default Address
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
)}
                    {/* Wishlist */}
                    {activeTab === "wishlist" && (
                        <div>
                            <h1 className="text-2xl font-semibold mb-6">Wishlist</h1>

                            {wishlist.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-gray-400 mb-2">
                                        Your wishlist is empty 💔
                                    </p>
                                    <a href="/products" className="text-black underline">
                                        Continue Shopping
                                    </a>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {wishlist.map((item: any) => (
                                        <div
                                            key={item._id}
                                            className="border rounded-xl p-3 hover:shadow transition"
                                        >
                                            {/* Image */}
                                            <img
                                                src={item.productId?.images?.[0] || "/placeholder.png"}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />

                                            {/* Name */}
                                            <p className="mt-3 text-sm font-medium">
                                                {item.productId?.name}
                                            </p>

                                            {/* Price */}
                                            <p className="text-sm text-gray-600">
                                                {formatCurrency(item.productId?.price)}
                                            </p>

                                            {/* Remove button */}
                                            <button
                                                onClick={async () => {
                                                    await fetch("/api/wishlist", {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            userId: user._id,
                                                            productId: item.productId._id,
                                                        }),
                                                    });

                                                    // 🔥 update UI instantly
                                                    setWishlist((prev: any[]) =>
                                                        prev.filter((w) => w._id !== item._id)
                                                    );
                                                }}
                                                className="text-xs text-red-500 mt-2 hover:underline"
                                            >
                                                Remove
                                            </button>
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