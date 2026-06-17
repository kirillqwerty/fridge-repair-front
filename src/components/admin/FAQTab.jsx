import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

const EMPTY = { question: "", answer: "", order: 0 };

export default function FAQTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(EMPTY);
  const load = async () => { const { data } = await api.get("/faq"); setItems(data); };
  useEffect(() => { load(); }, []);
  const startNew = () => { setEditing(-1); setDraft({ ...EMPTY, order: items.length + 1 }); };
  const startEdit = (i) => { setEditing(i); setDraft({ ...items[i] }); };
  const cancel = () => { setEditing(null); setDraft(EMPTY); };
  const save = async () => {
    try {
      const payload = { ...draft, order: Number(draft.order) || 0 };
      if (editing === -1) await api.post("/faq", payload); else await api.put(`/faq/${draft.id}`, payload);
      toast.success("Сохранено"); cancel(); await load();
    } catch { toast.error("Ошибка"); }
  };
  const remove = async (it) => {
    if (!window.confirm("Удалить вопрос?")) return;
    try { await api.delete(`/faq/${it.id}`); toast.success("Удалено"); await load(); } catch { toast.error("Ошибка"); }
  };

  return (
    <div className="space-y-5" data-testid="admin-faq">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">FAQ</h2>
          <p className="text-sm text-muted-foreground">Частые вопросы на главной странице и брендах</p>
        </div>
        <Button onClick={startNew} className="gap-2"><Plus className="w-4 h-4" /> Новый вопрос</Button>
      </div>
      {editing !== null && (
        <Card className="p-5 bg-card border-border">
          <div className="space-y-3">
            <div><Label>Вопрос</Label><Input value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} /></div>
            <div><Label>Ответ</Label><Textarea rows={4} value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} /></div>
            <div className="w-32"><Label>Порядок</Label><Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: e.target.value })} /></div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={save} className="gap-2"><Save className="w-4 h-4" /> Сохранить</Button>
            <Button variant="ghost" onClick={cancel}>Отмена</Button>
          </div>
        </Card>
      )}
      <div className="space-y-2">
        {items.map((it, idx) => (
          <Card key={it.id} className="p-4 bg-card border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium">{it.question}</div>
                <p className="text-sm text-foreground/85 mt-1 line-clamp-3">{it.answer}</p>
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
