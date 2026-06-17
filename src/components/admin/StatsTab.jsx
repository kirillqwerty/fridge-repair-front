import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function StatsTab() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get("/stats").then(({ data }) => setData(data)); }, []);
  if (!data) return <div className="text-muted-foreground">Загрузка…</div>;
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const save = async () => {
    try {
      const payload = {
        rating: Number(data.rating) || 5,
        reviews_count: Number(data.reviews_count) || 0,
        years_experience: Number(data.years_experience) || 0,
        repairs_done: Number(data.repairs_done) || 0,
        guarantee_months: Number(data.guarantee_months) || 12,
        arrival_minutes: Number(data.arrival_minutes) || 30,
      };
      const { data: saved } = await api.put("/stats", payload);
      setData(saved);
      toast.success("Сохранено");
    } catch { toast.error("Ошибка"); }
  };
  return (
    <div className="space-y-5 max-w-2xl" data-testid="admin-stats">
      <div>
        <h2 className="font-display text-xl font-semibold">Статистика</h2>
        <p className="text-sm text-muted-foreground">Отображается в hero и social-proof</p>
      </div>
      <Card className="p-5 bg-card border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><Label>Рейтинг (1–5)</Label><Input type="number" step="0.1" min="0" max="5" value={data.rating} onChange={(e) => set("rating", e.target.value)} /></div>
          <div><Label>Количество отзывов</Label><Input type="number" value={data.reviews_count} onChange={(e) => set("reviews_count", e.target.value)} /></div>
          <div><Label>Лет опыта</Label><Input type="number" value={data.years_experience} onChange={(e) => set("years_experience", e.target.value)} /></div>
          <div><Label>Сделано ремонтов</Label><Input type="number" value={data.repairs_done} onChange={(e) => set("repairs_done", e.target.value)} /></div>
          <div><Label>Гарантия (мес)</Label><Input type="number" value={data.guarantee_months} onChange={(e) => set("guarantee_months", e.target.value)} /></div>
          <div><Label>Выезд (мин)</Label><Input type="number" value={data.arrival_minutes} onChange={(e) => set("arrival_minutes", e.target.value)} /></div>
        </div>
        <div className="mt-4">
          <Button onClick={save} className="gap-2"><Save className="w-4 h-4" /> Сохранить</Button>
        </div>
      </Card>
    </div>
  );
}
