"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch(`/api/orders/${id}`);
    const data = await res.json();
    setOrder(data);
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

     <div className="flex justify-between items-center">
  <h1 className="text-2xl font-semibold">Order Details</h1>

  <a
    href={`tel:${order.shippingAddress?.phone}`}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    📞 Call Customer
  </a>
</div>

      {/* 🧾 Basic Info */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> £{order.total}</p>
        
      </div>

      {/* 👤 Customer */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.customerName}</p>
        <p className="text-sm text-gray-600">{order.customerEmail}</p>
      </div>

      {/* 📍 Address */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Shipping Address</h2>
        <p>{order.shippingAddress?.fullName}</p>
        <p>{order.shippingAddress?.phone}</p>
        <p>
          {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.pincode}
        </p>
      </div>

      {/* 🛍️ Items */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Items</h2>

        <div className="space-y-4">
          {order.items.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 items-center">

              <img
                src={item.image || "/placeholder.png"}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  £{item.price} × {item.quantity}
                </p>
              </div>

              <div className="font-semibold">
                £{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}