import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

export default function ContactsTab() {
  const [data, setData] = useState(null);

  useEffect(() => { api.get("/contacts").then(({ data }) => setData(data)); }, []);

  if (!data) return <div className="text-muted-foreground">Загрузка…</div>;

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const setPhone = (idx, v) => setData((d) => ({ ...d, phones: d.phones.map((p, i) => (i === idx ? v : p)) }));
  const addPhone = () => setData((d) => ({ ...d, phones: [...(d.phones || []), ""] }));
  const removePhone = (idx) => setData((d) => ({ ...d, phones: d.phones.filter((_, i) => i !== idx) }));

  const save = async () => {
    try {
      const payload = { ...data, phones: (data.phones || []).filter(Boolean) };
      const { data: saved } = await api.put("/contacts", payload);
      setData(saved);
      toast.success("Контакты обновлены");
    } catch {
      toast.error("Ошибка");
    }
  };

  return (
    <div className="space-y-5" data-testid="admin-contacts-form">
      <div>
        <h2 className="font-display text-xl font-semibold">Контакты</h2>
        <p className="text-sm text-muted-foreground">Телефоны, время работы, адрес и дисклеймер в подвале сайта</p>
      </div>
      <Card className="p-5 bg-card border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Название компании</Label>
            <Input value={data.company_name || ""} onChange={(e) => set("company_name", e.target.value)} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Телефоны</Label>
              <Button size="sm" variant="outline" onClick={addPhone} className="gap-1"><Plus className="w-3.5 h-3.5" /> Добавить</Button>
            </div>
            {(data.phones || []).map((p, idx) => (
              <div key={idx} className="flex gap-2">
                <Input value={p} onChange={(e) => setPhone(idx, e.target.value)} data-testid={`admin-contacts-phone-${idx}`} />
                <Button size="icon" variant="ghost" onClick={() => removePhone(idx)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            ))}
          </div>
          <div><Label>Время работы</Label><Input value={data.hours || ""} onChange={(e) => set("hours", e.target.value)} data-testid="admin-contacts-hours" /></div>
          <div><Label>Дни работы</Label><Input value={data.days || ""} onChange={(e) => set("days", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Адрес</Label><Input value={data.address || ""} onChange={(e) => set("address", e.target.value)} data-testid="admin-contacts-address" /></div>
          <div><Label>Email</Label><Input value={data.email || ""} onChange={(e) => set("email", e.target.value)} /></div>
          <div><Label>Telegram</Label><Input value={data.telegram_link || ""} onChange={(e) => set("telegram_link", e.target.value)} placeholder="https://t.me/..." /></div>
          <div><Label>Viber</Label><Input value={data.viber_link || ""} onChange={(e) => set("viber_link", e.target.value)} placeholder="viber://..." /></div>
          <div><Label>WhatsApp</Label><Input value={data.whatsapp_link || ""} onChange={(e) => set("whatsapp_link", e.target.value)} placeholder="https://wa.me/..." /></div>
          <div className="md:col-span-2">
            <Label>Дисклеймер (в подвале сайта)</Label>
            <Textarea rows={2} value={data.footer_note || ""} onChange={(e) => set("footer_note", e.target.value)} />
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={save} className="gap-2" data-testid="admin-contacts-save"><Save className="w-4 h-4" /> Сохранить</Button>
        </div>
      </Card>
    </div>
  );
}
