"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
export default function SignupPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("Account created successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Image */}
      <div className="relative hidden md:block">
        <Image
          src="/images/diamond.webp"
          alt="Jewellery"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Signup Form */}
      <div className="flex items-center justify-center bg-black">

        <div className="w-full max-w-md bg-white p-8 shadow-md rounded">

          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* Password */}
            <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    onChange={handleChange}
    className="w-full border p-3 rounded pr-10"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-500"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

            {/* Confirm Password */}
           <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    required
    onChange={handleChange}
    className="w-full border p-3 rounded pr-10"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-500"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 font-medium underline">
                Login
              </a>
            </p>

          </form>

          {message && (
            <p className="text-center mt-4 text-sm text-red-500">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}