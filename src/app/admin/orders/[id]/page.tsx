"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {

  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch(`/api/orders/${id}`);
    const data = await res.json();

    setOrder(data);
    setStatus(data.status);
  };

  // ✅ SAVE STATUS
  const saveStatus = async () => {

    try {

      setLoading(true);

      await fetch(`/api/orders/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      await fetchOrder();

      alert("Order updated successfully ✨");

    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-semibold">
          Order Details
        </h1>

        <a
          href={`tel:${order.shippingAddress?.phone}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          📞 Call Customer
        </a>

      </div>

      {/* BASIC INFO */}
      <div className="bg-white p-5 rounded-xl shadow space-y-3">

        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <p>
          <strong>Total:</strong> £{order.total}
        </p>

        {/* STATUS */}
        <div className="pt-4 border-t">

          <label className="block text-sm font-medium mb-2">
            Order Status
          </label>

          <div className="flex gap-3 items-center">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={saveStatus}
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>

      {/* CUSTOMER */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-semibold mb-2">
          Customer
        </h2>

        <p>{order.customerName}</p>

        <p className="text-sm text-gray-600">
          {order.customerEmail}
        </p>

      </div>

      {/* ADDRESS */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-semibold mb-2">
          Shipping Address
        </h2>

        <p>{order.shippingAddress?.fullName}</p>

        <p>{order.shippingAddress?.phone}</p>

        <p>
          {order.shippingAddress?.address},{" "}
          {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.pincode}
        </p>

      </div>

      {/* ITEMS */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Items
        </h2>

        <div className="space-y-4">

          {order.items.map((item: any, i: number) => (

            <div
              key={i}
              className="flex gap-4 items-center"
            >

              <img
                src={item.image || "/placeholder.png"}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div className="flex-1">

                <p className="font-medium">
                  {item.name}
                </p>

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