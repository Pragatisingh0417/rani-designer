"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ✅ Password match check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

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

      // ❌ Error
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // ✅ Success
      setSuccess(
        "Verification email sent ✨ Please verify your email before login."
      );

      // ✅ Clear form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // ✅ Redirect after 3 sec
      setTimeout(() => {
        router.push("/login");
      }, 3000);

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
          src="/images/j-2.jpg"
          alt="Jewellery"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-amber-50 px-4">

        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">

          <h1 className="text-3xl font-semibold mb-2 text-center">
            Create Account
          </h1>

          <p className="text-gray-500 text-sm text-center mb-6">
            Join Rani Designer ✨
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:border-black"
            />

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

            {/* CONFIRM PASSWORD */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={form.confirmPassword}
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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* LOGIN */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-red-600 font-medium underline"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}