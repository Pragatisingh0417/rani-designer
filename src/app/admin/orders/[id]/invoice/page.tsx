"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InvoicePage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder);
  }, []);

  useEffect(() => {
    if (order) {
      setTimeout(() => {
        window.print(); // ✅ auto print ONLY this page
      }, 500);
    }
  }, [order]);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white text-black">

      <h1 className="text-2xl font-bold mb-6">Invoice</h1>

      {/* 🧾 Order Info */}
      <div className="mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* 👤 Customer */}
      <div className="mb-6">
        <h2 className="font-semibold">Customer</h2>
        <p>{order.customerName}</p>
        <p>{order.shippingAddress?.phone}</p>
      </div>

      {/* 📍 Address */}
      <div className="mb-6">
        <h2 className="font-semibold">Address</h2>
        <p>
          {order.shippingAddress?.address},{" "}
          {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.pincode}
        </p>
      </div>

      {/* 🛍️ Items */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item: any, i: number) => (
            <tr key={i} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">£{item.price}</td>
              <td className="text-center">
                £{item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 💰 Total */}
      <div className="text-right mt-6 text-lg font-semibold">
        Total: £{order.total}
      </div>

    </div>
  );
}