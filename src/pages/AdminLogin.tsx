import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Navbar } from "../components/Navbar";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login, isLoading, error, clearError } = useAdminAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      // Error is handled by context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e3] to-[#f0e6d2]">
      {/* <Navbar /> */}
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with brand colors */}
            <div className="bg-gradient-to-r from-[#1a5c52] to-[#2a7d6f] px-8 py-12">
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Admin Panel
              </h1>
              <p className="text-[#c9a776] text-center text-sm">
                Duovrai - Gestion Administrative
              </p>
            </div>

            {/* Form Content */}
            <div className="px-8 py-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#1a5c52] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors({
                          ...validationErrors,
                          email: undefined,
                        });
                      }
                    }}
                    placeholder="admin@duovrai.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      validationErrors.email
                        ? "border-red-400 focus:ring-red-400 bg-red-50"
                        : "border-gray-300 focus:ring-[#1a5c52] focus:border-transparent"
                    }`}
                    disabled={isLoading}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#1a5c52] mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (validationErrors.password) {
                          setValidationErrors({
                            ...validationErrors,
                            password: undefined,
                          });
                        }
                      }}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        validationErrors.password
                          ? "border-red-400 focus:ring-red-400 bg-red-50"
                          : "border-gray-300 focus:ring-[#1a5c52] focus:border-transparent"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                      disabled={isLoading}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-[#1a5c52] to-[#2a7d6f] text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-3 text-xs text-gray-500">Admin Access</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Info Message */}
              <p className="text-xs text-gray-600 text-center">
                Contact your administrator for credentials.
              </p>
            </div>

            {/* Footer with brand accent */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-center text-xs text-gray-500">
                <span className="text-[#b8962e] font-semibold">Duovrai</span> ©
                2024
              </p>
            </div>
          </div>

          {/* Support Text */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Having trouble?{" "}
              <a
                href="mailto:support@duovrai.com"
                className="text-[#1a5c52] hover:text-[#2a7d6f] font-semibold"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
