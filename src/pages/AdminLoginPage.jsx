import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, User, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import SeoHead from "@/components/site/SeoHead";

export default function AdminLoginPage() {
  const { login, username, loading } = useAuth();
  const nav = useNavigate();
  const [u, setU] = useState("admin");
  const [p, setP] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && username) nav("/admin", { replace: true });
  }, [loading, username, nav]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(u, p);
      toast.success("Добро пожаловать в админ-панель");
      nav("/admin", { replace: true });
    } catch (err) {
      const detail = (err && err.response && err.response.data && err.response.data.detail) || "Ошибка входа";
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center hero-bg px-4">
      <SeoHead title="Вход в админ-панель" description="Административный вход" />
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="font-display text-lg font-semibold">Админ-панель</div>
        </div>
        <Card className="p-6 sm:p-8 bg-card border-border soft-shadow">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Вход</h1>
          <p className="text-sm text-muted-foreground mt-1">Введите логин и пароль администратора</p>
          <form className="mt-5 space-y-4" onSubmit={onSubmit} data-testid="admin-login-form">
            <div>
              <Label htmlFor="username">Логин</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="username" autoComplete="username" value={u} onChange={(e) => setU(e.target.value)} className="pl-9" data-testid="admin-username-input" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" autoComplete="current-password" value={p} onChange={(e) => setP(e.target.value)} className="pl-9" data-testid="admin-password-input" />
              </div>
            </div>
            <Button type="submit" className="w-full h-11" disabled={submitting} data-testid="admin-login-submit-button">
              {submitting ? "Вход…" : "Войти"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Логин по умолчанию: <code className="bg-secondary px-1.5 py-0.5 rounded">admin</code> / <code className="bg-secondary px-1.5 py-0.5 rounded">admin123</code>. После первого входа обязательно поменяйте пароль.
            </p>
          </form>
        </Card>
        <div className="text-center mt-4 text-xs text-muted-foreground">
          <a href="/" className="hover:text-primary">← на главную</a>
        </div>
      </div>
    </div>
  );
}
