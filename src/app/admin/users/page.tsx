"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-semibold mb-6">
        Users
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Spent</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">

                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.totalOrders}
                </td>

                <td className="p-4 font-semibold">
                  £{user.totalSpend}
                </td>

                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/users/${user._id}`}
                    className="text-blue-600"
                  >
                    View →
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}