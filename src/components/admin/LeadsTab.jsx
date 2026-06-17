import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, Trash2, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function LeadsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/leads");
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (it) => {
    if (!window.confirm("Удалить заявку?")) return;
    try {
      await api.delete(`/leads/${it.id}`);
      toast.success("Удалено");
      await load();
    } catch {
      toast.error("Ошибка");
    }
  };

  if (loading) return <div className="text-muted-foreground">Загрузка…</div>;

  return (
    <div className="space-y-4" data-testid="admin-requests-table">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Заявки клиентов</h2>
          <p className="text-sm text-muted-foreground">{items.length} заявок, отсортированы по дате</p>
        </div>
        <Button variant="outline" onClick={load} className="gap-2"><RefreshCw className="w-4 h-4" /> Обновить</Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center bg-card border-border text-muted-foreground">
          Пока нет заявок. Они появятся здесь, как только клиенты отправят форму.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((l) => (
            <Card key={l.id} className="p-4 bg-card border-border">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">{l.name}</div>
                  <a href={`tel:${(l.phone || "").replace(/[^+\d]/g, "")}`} className="text-primary hover:underline text-sm inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {l.phone}</a>
                  {(l.brand || l.problem) && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {l.brand && <span className="text-[11px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{l.brand}</span>}
                      {l.problem && <span className="text-[11px] bg-secondary px-1.5 py-0.5 rounded border border-border">{l.problem}</span>}
                    </div>
                  )}
                  {l.message && (
                    <div className="mt-2 text-sm text-foreground/85 inline-flex items-start gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-0.5" /> {l.message}</div>
                  )}
                  <div className="mt-2 text-[11px] text-muted-foreground">{l.created_at}</div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => remove(l)} data-testid={`admin-lead-delete-${l.id}`}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
