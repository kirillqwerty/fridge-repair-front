import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadField from "@/components/admin/UploadField";
import { api } from "@/lib/api";

const EMPTY = { name: "", role: "Мастер", experience: "", specialization: "", image_url: "", order: 0 };

export default function MastersTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(EMPTY);
  const load = async () => { const { data } = await api.get("/masters"); setItems(data); };
  useEffect(() => { load(); }, []);
  const startNew = () => { setEditing(-1); setDraft({ ...EMPTY, order: items.length + 1 }); };
  const startEdit = (i) => { setEditing(i); setDraft({ ...items[i] }); };
  const cancel = () => { setEditing(null); setDraft(EMPTY); };
  const save = async () => {
    try {
      const payload = { ...draft, order: Number(draft.order) || 0 };
      if (editing === -1) await api.post("/masters", payload); else await api.put(`/masters/${draft.id}`, payload);
      toast.success("Сохранено"); cancel(); await load();
    } catch { toast.error("Ошибка"); }
  };
  const remove = async (it) => {
    if (!window.confirm("Удалить мастера?")) return;
    try { await api.delete(`/masters/${it.id}`); toast.success("Удалено"); await load(); } catch { toast.error("Ошибка"); }
  };

  return (
    <div className="space-y-5" data-testid="admin-masters">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Мастера</h2>
          <p className="text-sm text-muted-foreground">Сотрудники компании, отображаются на главной</p>
        </div>
        <Button onClick={startNew} className="gap-2"><Plus className="w-4 h-4" /> Новый мастер</Button>
      </div>
      {editing !== null && (
        <Card className="p-5 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><Label>Имя</Label><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div><Label>Роль</Label><Input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} /></div>
            <div><Label>Опыт</Label><Input value={draft.experience} onChange={(e) => setDraft({ ...draft, experience: e.target.value })} /></div>
            <div><Label>Специализация</Label><Input value={draft.specialization} onChange={(e) => setDraft({ ...draft, specialization: e.target.value })} /></div>
            <div className="md:col-span-2">
              <UploadField value={draft.image_url} onChange={(v) => setDraft({ ...draft, image_url: v })} label="Фото мастера" testid="admin-master-upload" />
            </div>
            <div><Label>Порядок</Label><Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: e.target.value })} /></div>
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
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-xs text-primary">{it.role}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{it.experience} • {it.specialization}</div>
              </div>
              <div className="flex flex-col gap-2">
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
