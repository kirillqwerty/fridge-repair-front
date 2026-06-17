import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      setUsername("");
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUsername(data.username || "");
    } catch (e) {
      localStorage.removeItem("admin_token");
      setToken("");
      setUsername("");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async (u, p) => {
    const { data } = await api.post("/auth/login", { username: u, password: p });
    localStorage.setItem("admin_token", data.access_token);
    setToken(data.access_token);
    setUsername(data.username);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken("");
    setUsername("");
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, loading, login, logout, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
