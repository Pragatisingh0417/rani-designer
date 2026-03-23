"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {

  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Order placed successfully 🎉");
  };

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 lg:px-10 pb-16">

      <h1 className="text-3xl font-semibold mb-10 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Floating Input */}
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
                className="peer w-full border rounded px-4 pt-5 pb-2 focus:outline-none focus:border-black"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm">
                {field.label}
              </label>
            </div>
          ))}

          {/* Address */}
          <div className="relative">
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="peer w-full border rounded px-4 pt-5 pb-2 focus:outline-none focus:border-black"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm">
              Address
            </label>
          </div>

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

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Place Order
          </button>

        </form>

        {/* 🛒 ORDER SUMMARY */}
        <div className="border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[350px] overflow-y-auto">

            {cart.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-4"
              >

                {/* Image */}
                <img
                  src={item.images?.[0] || "/placeholder.png"}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    £{item.price} × {item.quantity}
                  </p>
                </div>

                {/* Price */}
                <div className="font-semibold text-sm">
                  £{item.price * item.quantity}
                </div>

              </div>
            ))}

          </div>

          {/* Total */}
          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>£{total}</span>
          </div>

        </div>
      </div>

    </div>
  );
}