import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function PasswordTab() {
  const { logout } = useAuth();
  const [current, setCurrent] = useState("");
  const [next1, setNext1] = useState("");
  const [next2, setNext2] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (next1.length < 6) { toast.error("Новый пароль: минимум 6 символов"); return; }
    if (next1 !== next2) { toast.error("Пароли не совпадают"); return; }
    setBusy(true);
    try {
      await api.post("/auth/change-password", { current_password: current, new_password: next1 });
      toast.success("Пароль обновлён — войдите заново");
      setTimeout(() => { logout(); window.location.href = "/admin/login"; }, 600);
    } catch (e) {
      const detail = (e && e.response && e.response.data && e.response.data.detail) || "Ошибка";
      toast.error(detail);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5 max-w-md" data-testid="admin-password">
      <div>
        <h2 className="font-display text-xl font-semibold">Смена пароля</h2>
        <p className="text-sm text-muted-foreground">После смены потребуется повторный вход</p>
      </div>
      <Card className="p-5 bg-card border-border">
        <form onSubmit={submit} className="space-y-3">
          <div><Label>Текущий пароль</Label><Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required data-testid="admin-password-current" /></div>
          <div><Label>Новый пароль</Label><Input type="password" value={next1} onChange={(e) => setNext1(e.target.value)} required data-testid="admin-password-new" /></div>
          <div><Label>Повторите новый пароль</Label><Input type="password" value={next2} onChange={(e) => setNext2(e.target.value)} required data-testid="admin-password-new2" /></div>
          <Button type="submit" className="gap-2" disabled={busy} data-testid="admin-password-submit"><Save className="w-4 h-4" /> {busy ? "Сохранение…" : "Сменить пароль"}</Button>
        </form>
      </Card>
    </div>
  );
}
