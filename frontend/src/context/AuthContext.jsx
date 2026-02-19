import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

function safeParseUser(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function makeIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idemp-${Date.now()}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeParseUser(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const [isSystemUser, setIsSystemUser] = useState(() => localStorage.getItem("isSystemUser") === "true");

  const setAuthState = (nextUser, token) => {
    setUser(nextUser);
    if (token) localStorage.setItem("token", token);
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const clearAuthState = () => {
    setUser(null);
    setIsSystemUser(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isSystemUser");
  };

  const refreshSystemRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSystemUser(false);
      localStorage.setItem("isSystemUser", "false");
      return false;
    }

    setCheckingRole(true);
    try {
      await api.post("/api/transactions/system/initial-funds", {
        toAccount: "",
        amount: "",
        idempotencyKey: makeIdempotencyKey(),
      });
      setIsSystemUser(true);
      localStorage.setItem("isSystemUser", "true");
      return true;
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) {
        setIsSystemUser(true);
        localStorage.setItem("isSystemUser", "true");
        return true;
      }
      if (status === 403) {
        setIsSystemUser(false);
        localStorage.setItem("isSystemUser", "false");
        return false;
      }
      if (status === 401) {
        clearAuthState();
      }
      return false;
    } finally {
      setCheckingRole(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", { email, password });
      const { user: userData, token } = res.data;
      setAuthState(userData, token);
      await refreshSystemRole();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/register", { name, email, password });
      const { user: userData, token } = res.data;
      setAuthState(userData, token);
      await refreshSystemRole();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // noop
    } finally {
      clearAuthState();
    }
  };

  useEffect(() => {
    const onUnauthorized = () => clearAuthState();
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      refreshSystemRole();
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      checkingRole,
      isSystemUser,
      isAuthenticated: Boolean(user && localStorage.getItem("token")),
      login,
      register,
      logout,
      refreshSystemRole,
    }),
    [user, loading, checkingRole, isSystemUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
