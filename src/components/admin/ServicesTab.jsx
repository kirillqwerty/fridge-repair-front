import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function ServicesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/services");
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setRow = (idx, patch) => {
    setItems((prev) => prev.map((x, i) => (i === idx ? { ...x, ...patch } : x)));
  };

  const addRow = () => {
    setItems((prev) => [...prev, { id: "", name: "Новая услуга", price_from: 0, price_to: 0, unit: "BYN", note: "", order: (prev.length + 1) }]);
  };

  const saveAll = async () => {
    try {
      const payload = items.map((it, idx) => ({
        ...it,
        order: it.order || (idx + 1),
        price_from: Number(it.price_from) || 0,
        price_to: Number(it.price_to) || 0,
      }));
      const { data } = await api.put("/services", payload);
      setItems(data);
      toast.success("Сохранено");
    } catch (e) {
      toast.error("Ошибка сохранения");
    }
  };

  const deleteRow = async (idx) => {
    const it = items[idx];
    if (!it.id) {
      // not yet saved
      setItems((prev) => prev.filter((_, i) => i !== idx));
      return;
    }
    if (!window.confirm("Удалить услугу?")) return;
    try {
      await api.delete(`/services/${it.id}`);
      setItems((prev) => prev.filter((_, i) => i !== idx));
      toast.success("Удалено");
    } catch (e) {
      toast.error("Ошибка удаления");
    }
  };

  if (loading) return <div className="text-muted-foreground">Загрузка…</div>;

  return (
    <div className="space-y-4" data-testid="admin-services-table">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Услуги и цены</h2>
          <p className="text-sm text-muted-foreground">Это общий прайс для главной страницы. Отдельные прайсы брендов редактируются во вкладке «Бренды».</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addRow} className="gap-2" data-testid="admin-services-add"><Plus className="w-4 h-4" /> Добавить</Button>
          <Button onClick={saveAll} className="gap-2" data-testid="admin-services-save"><Save className="w-4 h-4" /> Сохранить</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {items.map((it, idx) => (
          <Card key={it.id || idx} className="p-4 bg-card border-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-4">
                <Label>Название</Label>
                <Input value={it.name} onChange={(e) => setRow(idx, { name: e.target.value })} data-testid={`admin-service-name-${idx}`} />
              </div>
              <div className="md:col-span-2">
                <Label>Цена от</Label>
                <Input type="number" min="0" value={it.price_from} onChange={(e) => setRow(idx, { price_from: e.target.value })} data-testid={`admin-service-from-${idx}`} />
              </div>
              <div className="md:col-span-2">
                <Label>Цена до</Label>
                <Input type="number" min="0" value={it.price_to} onChange={(e) => setRow(idx, { price_to: e.target.value })} data-testid={`admin-service-to-${idx}`} />
              </div>
              <div className="md:col-span-3">
                <Label>Примечание</Label>
                <Input value={it.note} onChange={(e) => setRow(idx, { note: e.target.value })} />
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <Button variant="ghost" size="icon" onClick={() => deleteRow(idx)} aria-label="Удалить" data-testid={`admin-service-delete-${idx}`}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
