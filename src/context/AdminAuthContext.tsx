import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

interface AdminAuthContextProps {
  user: AdminUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(
  undefined,
);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const fetchWithTimeout = async (
  resource: RequestInfo,
  init: RequestInit,
  timeout = 15000,
) => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(resource, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/api/v1/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        let errorMessage = "Login failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Keep default message if response is not JSON
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      console.log("Login response received:", data);

      // Update state directly (no localStorage due to browser restrictions)
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setUser(data.admin);

      console.log("State updated with user and tokens");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.name === "AbortError"
            ? "Le serveur ne répond pas. Veuillez réessayer plus tard."
            : err.message
          : "An error occurred during login";
      console.error("Login error:", errorMessage, err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken && !!user,
        login,
        logout,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
