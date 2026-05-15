"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const verifyEmail = async () => {

      try {

        const res = await fetch(
          "/api/auth/verify-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Verification failed");
          setLoading(false);
          return;
        }

        setSuccess(true);

        // ✅ Redirect to login after 3 sec
        setTimeout(() => {
          router.push("/login");
        }, 3000);

      } catch (err) {

        console.error(err);

        setError("Something went wrong");
      }

      setLoading(false);
    };

    if (token) {
      verifyEmail();
    }

  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

        {loading && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Verifying Email...
            </h1>

            <p className="text-gray-500">
              Please wait
            </p>
          </>
        )}

        {!loading && success && (
          <>
            <h1 className="text-3xl font-semibold text-green-600 mb-4">
              Email Verified ✅
            </h1>

            <p className="text-gray-600">
              Your account has been verified.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Redirecting to login...
            </p>
          </>
        )}

        {!loading && error && (
          <>
            <h1 className="text-3xl font-semibold text-red-500 mb-4">
              Verification Failed ❌
            </h1>

            <p className="text-gray-600">
              {error}
            </p>
          </>
        )}

      </div>
    </div>
  );
}