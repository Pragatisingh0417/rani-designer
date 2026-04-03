"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setOrders(data.orders);
      });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        {user.name}
      </h1>

      {/* USER INFO */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <p>Email: {user.email}</p>
        <p>User ID: {user._id}</p>
      </div>

      {/* ORDERS */}
      <h2 className="text-xl font-semibold mb-4">
        Orders
      </h2>

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg"
            >
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: £{order.total}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}