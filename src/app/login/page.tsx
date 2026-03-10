"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

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
        setLoading(false);
        return;
      }

    login(data.user, data.token);

      router.push("/");
      router.refresh();

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Image */}
      <div className="relative hidden md:block">
        <Image
          src="/images/gold.webp"
          alt="Rings Collection"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-center bg-black">

        <div className="w-full max-w-md bg-white shadow-md p-8 rounded">

          <h1 className="text-2xl font-semibold mb-6 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email"
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

            <button
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">
              {error}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}