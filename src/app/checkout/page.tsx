"use client";

import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "ONLINE",
  });

  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  // 🔥 Fetch addresses
  useEffect(() => {
    if (!user?._id) return;

    fetch(`/api/address?userId=${user._id}`)
      .then((res) => res.json())
      .then(setAddresses);
  }, [user]);

  // 🔥 Handle dropdown select
  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);

    const addr = addresses.find((a) => a._id === id);
    if (!addr) return;

    setForm((prev) => ({
      ...prev,
      name: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      zip: addr.pincode,
    }));
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (!user?._id) return alert("Login first");
    if (!user?._id) {
  setShowLoginPopup(true);
  return;
}
    if (cart.length === 0) return alert("Cart empty");

    setLoading(true);

    const orderData = {
      userId: user._id.toString(),

      customerName: form.name,
      customerEmail: form.email,

      items: cart.map((item: any) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images?.[0] || "",
      })),

      total,

      paymentMethod: form.paymentMethod,

      shippingAddress: {
        fullName: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.zip,
      },
    };

    try {

      // ✅ CREATE ORDER FIRST
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const order = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error("Order creation failed");
      }

      // ✅ CASH ON DELIVERY
      if (form.paymentMethod === "COD") {

        clearCart();

        alert("Order placed successfully 🎉");

        window.location.href = "/";

        return;
      }

      // ✅ ONLINE PAYMENT (STRIPE)
      const stripeRes = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: cart,
          orderId: order._id,
        }),
      });

      const stripeData = await stripeRes.json();

      // ✅ REDIRECT TO STRIPE
      if (stripeData.url) {
        window.location.href = stripeData.url;
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };


  
  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">

      <h1 className="text-3xl font-semibold mb-10 text-center">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* 🧾 LEFT */}
        <div>

          {/* 🔥 ADDRESS DROPDOWN */}
          {addresses.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Select Saved Address
              </label>

              <select
                value={selectedAddressId}
                onChange={(e) => handleSelectAddress(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg"
              >
                <option value="">Choose address</option>

                {addresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.fullName}, {addr.address}, {addr.city} - {addr.pincode}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 🔥 SELECTED ADDRESS PREVIEW */}
          {selectedAddressId && (
            <div className="bg-gray-50 border rounded-xl p-4 mb-6">
              {(() => {
                const addr = addresses.find(
                  (a) => a._id === selectedAddressId
                );
                if (!addr) return null;

                return (
                  <>
                    <p className="font-semibold">{addr.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {addr.phone}
                    </p>
                    <p className="text-sm">
                      {addr.address}, {addr.city}
                    </p>
                    <p className="text-sm">{addr.pincode}</p>
                  </>
                );
              })()}
            </div>
          )}

          {/* 🧾 FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border px-4 py-3 rounded-lg"
                required
              />

              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="POST CODE"
                className="border px-4 py-3 rounded-lg"
                required
              />
            </div>

            {/* 💳 PAYMENT */}
            <div>
              <p className="font-medium mb-2">Payment Method</p>

              <label className="flex gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={form.paymentMethod === "ONLINE"}
                  onChange={handleChange}
                />
                Pay Online
              </label>

              <label className="flex gap-2 mt-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              {loading ? "Processing..." : "Place Order"}
            </button>

          </form>
        </div>

        {/* 🛒 RIGHT */}
        <div className="border rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {cart.map((item: any) => (
              <div key={item._id} className="flex gap-4">

                <img
                  src={item.images?.[0]}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    £{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  £{item.price * item.quantity}
                </p>

              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>£{total}</span>
          </div>

        </div>

      </div>
    
    {/* 🔐 LOGIN POPUP */ }
  {
    showLoginPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

        <div className="bg-white w-full max-w-md rounded-2xl p-8 relative animate-in fade-in zoom-in duration-200">

          {/* Close */}
          <button
            onClick={() => setShowLoginPopup(false)}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold text-center mb-3">
            Login Required
          </h2>

          <p className="text-gray-500 text-center text-sm">
            You need to login before placing an order.
          </p>

          <p className="text-center text-sm mt-6">
            Please{" "}
            <a
              href="/login"
              className="text-red-600 font-medium underline hover:text-red-700"
            >
              Login
            </a>
          </p>

        </div>
      </div>
    )
  }
    
    </div>
  );
}