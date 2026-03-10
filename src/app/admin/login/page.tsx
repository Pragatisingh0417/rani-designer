"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    if (data.user.role !== "admin") {
      setError("Not authorized");
      return;
    }

    localStorage.setItem("adminToken", data.token);

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md bg-white shadow-md p-8 rounded">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-black text-white py-3 rounded">
            Login
          </button>

        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}