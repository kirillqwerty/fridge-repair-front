import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import UploadField from "@/components/admin/UploadField";
import { api } from "@/lib/api";

const EMPTY = { author: "", city: "Минск", rating: 5, date: "", text: "", brand: "", problem: "", image_url: "", featured: false, order: 0 };

export default function ReviewsTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // index | -1 for new | null
  const [draft, setDraft] = useState(EMPTY);

  const load = async () => {
    const { data } = await api.get("/reviews");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setEditing(-1);
    setDraft({ ...EMPTY, order: items.length + 1 });
  };
  const startEdit = (idx) => {
    setEditing(idx);
    setDraft({ ...items[idx] });
  };
  const cancel = () => { setEditing(null); setDraft(EMPTY); };

  const save = async () => {
    try {
      const payload = { ...draft, rating: Number(draft.rating) || 5, order: Number(draft.order) || 0 };
      if (editing === -1) {
        await api.post("/reviews", payload);
        toast.success("Отзыв добавлен");
      } else {
        await api.put(`/reviews/${draft.id}`, payload);
        toast.success("Отзыв обновлён");
      }
      cancel();
      await load();
    } catch (e) {
      toast.error("Ошибка сохранения");
    }
  };

  const remove = async (it) => {
    if (!window.confirm("Удалить отзыв?")) return;
    try {
      await api.delete(`/reviews/${it.id}`);
      toast.success("Удалено");
      await load();
    } catch {
      toast.error("Ошибка");
    }
  };

  return (
    <div className="space-y-5" data-testid="admin-reviews-table">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Отзывы</h2>
          <p className="text-sm text-muted-foreground">Создавайте и редактируйте отзывы клиентов, добавляйте фото</p>
        </div>
        <Button onClick={startNew} className="gap-2" data-testid="admin-reviews-add"><Plus className="w-4 h-4" /> Новый отзыв</Button>
      </div>

      {editing !== null && (
        <Card className="p-5 bg-card border-border">
          <div className="font-medium mb-3">{editing === -1 ? "Новый отзыв" : `Редактирование: ${items[editing].author}`}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><Label>Автор</Label><Input value={draft.author} onChange={(e) => setDraft((d) => ({ ...d, author: e.target.value }))} /></div>
            <div><Label>Город</Label><Input value={draft.city} onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))} /></div>
            <div><Label>Рейтинг (1–5)</Label><Input type="number" min="1" max="5" value={draft.rating} onChange={(e) => setDraft((d) => ({ ...d, rating: e.target.value }))} /></div>
            <div><Label>Дата (YYYY-MM-DD)</Label><Input value={draft.date} onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))} /></div>
            <div><Label>Бренд</Label><Input value={draft.brand} onChange={(e) => setDraft((d) => ({ ...d, brand: e.target.value }))} /></div>
            <div><Label>Проблема</Label><Input value={draft.problem} onChange={(e) => setDraft((d) => ({ ...d, problem: e.target.value }))} /></div>
            <div className="md:col-span-2"><Label>Текст отзыва</Label><Textarea rows={4} value={draft.text} onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))} /></div>
            <div className="md:col-span-2">
              <UploadField value={draft.image_url} onChange={(v) => setDraft((d) => ({ ...d, image_url: v }))} label="Фото клиента (необязательно)" testid="admin-review-upload" />
            </div>
            <div className="flex items-center gap-2"><Checkbox id="featured" checked={draft.featured} onCheckedChange={(v) => setDraft((d) => ({ ...d, featured: !!v }))} /><Label htmlFor="featured">Показывать в social-proof (вверху)</Label></div>
            <div><Label>Порядок</Label><Input type="number" value={draft.order} onChange={(e) => setDraft((d) => ({ ...d, order: e.target.value }))} /></div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={save} className="gap-2" data-testid="admin-reviews-save"><Save className="w-4 h-4" /> Сохранить</Button>
            <Button variant="ghost" onClick={cancel}>Отмена</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it, idx) => (
          <Card key={it.id} className="p-4 bg-card border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold">{it.author}</div>
                  <div className="flex">{Array.from({ length: it.rating || 5 }).map((_, i) => (<Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />))}</div>
                  {it.featured && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">витрина</span>}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{[it.city, it.brand, it.problem].filter(Boolean).join(" • ")}</div>
                <p className="mt-2 text-sm text-foreground/85 line-clamp-3">{it.text}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(idx)} data-testid={`admin-review-edit-${idx}`}>Ред.</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(it)} data-testid={`admin-review-delete-${idx}`}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
