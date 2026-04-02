"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); // ✅ MUST be inside

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "ONLINE", // 👈 NEW
  });

  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
     const orderData = {
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

      // ✅ COD FLOW
      if (form.paymentMethod === "COD") {
        const res = await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify(orderData),
        });

        if (res.ok) {
            clearCart(); // 🔥 clears cart properly

          alert("Order placed successfully 🎉");
          window.location.href = "/";
        }
      }

      // ✅ ONLINE (STRIPE) FLOW
      else {
        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        }
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 
                pt-40 sm:pt-24 lg:pt-20
                pb-10 sm:pb-14 lg:pb-20">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-20">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Inputs */}
          {[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email" },
            { name: "phone", label: "Phone Number" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-3 focus:outline-none focus:border-black"
              />
              <label className="text-sm text-gray-500">
                {field.label}
              </label>
            </div>
          ))}

          {/* Address */}
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full border rounded px-4 py-3"
          />

          {/* City + ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
          </div>

          {/* 💳 PAYMENT METHOD */}
          <div>
            <p className="font-medium mb-2">Payment Method</p>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={form.paymentMethod === "ONLINE"}
                onChange={handleChange}
              />
              Pay Online (Card)
            </label>

            <label className="flex items-center gap-2 mt-2">
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

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

        </form>

        {/* 🛒 ORDER SUMMARY (same as yours) */}
        <div className="border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[350px] overflow-y-auto">
            {cart.map((item: any) => (
              <div key={item._id} className="flex items-center gap-4">

                <img
                  src={item.images?.[0] || "/placeholder.png"}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    £{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="font-semibold text-sm">
                  £{item.price * item.quantity}
                </div>

              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>£{total}</span>
          </div>

        </div>
      </div>
    </div>
  );
}