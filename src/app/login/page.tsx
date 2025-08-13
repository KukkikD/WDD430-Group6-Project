"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Check for registration success message
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('registered') === '1') {
      setRegistrationSuccess('You have registered successfully! You can now sign in.');
    }
  }, []);

  // Clear registration success message when user starts typing
  const clearRegistrationSuccess = () => {
    if (registrationSuccess) {
      setRegistrationSuccess(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);
    setRegistrationSuccess(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        setSuccessMsg("Signed in successfully. Redirecting...");
        
        // Force redirect to homepage after a short delay
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        {registrationSuccess && (
          <div className="mb-4 rounded-lg border border-green-300 bg-green-50 text-green-800 px-4 py-3 text-center relative shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-600 text-xl">✅</span>
              <span className="font-medium">{registrationSuccess}</span>
            </div>
            <button
              onClick={() => setRegistrationSuccess(null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800 text-lg font-bold hover:bg-green-200 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 rounded-lg border border-green-300 bg-green-50 text-green-800 px-4 py-3 text-center relative shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-600 text-xl">✅</span>
              <span className="font-medium">{successMsg}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearRegistrationSuccess();
              }}
              onFocus={clearRegistrationSuccess}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearRegistrationSuccess();
                }}
                onFocus={clearRegistrationSuccess}
                required
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600 mt-6">
          Don't have an account yet?{" "}
          <Link
            href="/register-choice"
            className="font-medium text-purple-600 hover:underline"
          >
            Create One
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Account Types
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                🛍️ <strong>Buyers:</strong> Browse and purchase handcrafted products
              </p>
              <p>
                🛠️ <strong>Sellers:</strong> List and sell your handmade creations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}