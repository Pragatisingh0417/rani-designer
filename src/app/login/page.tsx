"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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
      setSuccess("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ❌ Error
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // ✅ Success
      setSuccess("Login successful");

      login(data.user, data.token);

      // ✅ Redirect admin
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }

      router.refresh();

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="relative hidden md:block">
        <Image
          src="/images/j-1.jpg"
          alt="Login"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-amber-50 px-4">

        <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl">

          <h1 className="text-3xl font-semibold mb-2 text-center">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm text-center mb-6">
            Login to continue shopping ✨
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:border-black"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg pr-10 focus:outline-none focus:border-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
                {success}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* SIGNUP */}
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-red-600 font-medium underline"
              >
                Signup
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}