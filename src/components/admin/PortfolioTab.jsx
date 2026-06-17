import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadField from "@/components/admin/UploadField";
import { api } from "@/lib/api";

const EMPTY = { title: "", description: "", before_url: "", after_url: "", brand: "", order: 0 };

export default function PortfolioTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(EMPTY);

  const load = async () => { const { data } = await api.get("/portfolio"); setItems(data); };
  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing(-1); setDraft({ ...EMPTY, order: items.length + 1 }); };
  const startEdit = (i) => { setEditing(i); setDraft({ ...items[i] }); };
  const cancel = () => { setEditing(null); setDraft(EMPTY); };

  const save = async () => {
    try {
      const payload = { ...draft, order: Number(draft.order) || 0 };
      if (editing === -1) await api.post("/portfolio", payload);
      else await api.put(`/portfolio/${draft.id}`, payload);
      toast.success("Сохранено");
      cancel();
      await load();
    } catch { toast.error("Ошибка"); }
  };
  const remove = async (it) => {
    if (!window.confirm("Удалить?")) return;
    try { await api.delete(`/portfolio/${it.id}`); toast.success("Удалено"); await load(); } catch { toast.error("Ошибка"); }
  };

  return (
    <div className="space-y-5" data-testid="admin-portfolio">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Портфолио (до/после)</h2>
          <p className="text-sm text-muted-foreground">Карточки ремонтов с фото</p>
        </div>
        <Button onClick={startNew} className="gap-2"><Plus className="w-4 h-4" /> Новая карточка</Button>
      </div>
      {editing !== null && (
        <Card className="p-5 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2"><Label>Название</Label><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Описание</Label><Textarea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
            <div><Label>Бренд</Label><Input value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} /></div>
            <div><Label>Порядок</Label><Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: e.target.value })} /></div>
            <UploadField value={draft.before_url} onChange={(v) => setDraft({ ...draft, before_url: v })} label="Фото «ДО»" testid="admin-portfolio-before" />
            <UploadField value={draft.after_url} onChange={(v) => setDraft({ ...draft, after_url: v })} label="Фото «ПОСЛЕ»" testid="admin-portfolio-after" />
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={save} className="gap-2"><Save className="w-4 h-4" /> Сохранить</Button>
            <Button variant="ghost" onClick={cancel}>Отмена</Button>
          </div>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it, idx) => (
          <Card key={it.id} className="p-4 bg-card border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.brand}</div>
                <p className="mt-1 text-sm text-foreground/80 line-clamp-3">{it.description}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button size="sm" variant="outline" onClick={() => startEdit(idx)}>Ред.</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(it)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
