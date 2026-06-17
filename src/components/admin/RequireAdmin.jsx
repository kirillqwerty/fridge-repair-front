import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function RequireAdmin({ children }) {
  const { username, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Проверка доступа…</div>;
  }
  if (!username) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
