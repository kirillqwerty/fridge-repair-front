import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Wrench, Clock, ShieldCheck } from "lucide-react";
import { api, formatPhoneHref } from "@/lib/api";

const BRAND_OPTIONS = [
  "Атлант", "Samsung", "LG", "BOSCH", "Indesit", "LIEBHERR",
  "Electrolux", "ARISTON", "BEKO", "SHARP", "DAEWOO", "AEG", "Другой",
];

const PROBLEM_OPTIONS = [
  "Не холодит",
  "Не морозит",
  "Шумит / вибрирует",
  "Намерзает лёд",
  "Не включается",
  "Ошибка на дисплее",
  "Нужна диагностика",
  "Другое",
];

export default function LeadForm({ contacts, defaultBrand = "", title, subtitle }) {
  const [form, setForm] = useState({ name: "", phone: "", brand: defaultBrand, problem: "", message: "", consent: true });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const phone = (contacts && contacts.phones && contacts.phones[0]) || "+375 (29) 609-54-31";

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Укажите имя и телефон");
      return;
    }
    if (!form.consent) {
      toast.error("Нужно согласие на обработку данных");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/leads", form);
      toast.success("Спасибо! Мы перезвоним вам в ближайшее время.");
      setDone(true);
      setForm({ name: "", phone: "", brand: defaultBrand, problem: "", message: "", consent: true });
      // Keep success visible for 60 seconds, then hide so user can submit another
      setTimeout(() => setDone(false), 60000);
    } catch (err) {
      const detail = (err && err.response && err.response.data && err.response.data.detail) || "Ошибка отправки";
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead" className="section-pad" data-testid="lead-section">
      <div className="container-page">
        <Card className="p-6 sm:p-8 lg:p-10 bg-card border-border soft-shadow overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                {title || "Закажите ремонт сегодня"}
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {subtitle || "Оставьте заявку — перезвоним за 2–3 минуты, назовём точную цену, приедем в день звонка."}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Диагностика 30 BYN — бесплатно при ремонте</li>
                <li className="flex items-center gap-2"><Wrench className="w-4 h-4 text-primary" /> Приезжаем в день обращения</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Гарантия 1 год на все работы</li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-sm">
                или позвоните:
                <a href={formatPhoneHref(phone)} className="font-display font-semibold text-primary hover:underline" data-testid="lead-section-phone">{phone}</a>
              </div>
            </div>

            <form
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={onSubmit}
              data-testid="lead-form"
              aria-labelledby="lead-form-title"
            >
              <div className="sm:col-span-1">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ваше имя" data-testid="lead-form-name-input" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+375 (29) ..." data-testid="lead-form-phone-input" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="brand">Бренд холодильника</Label>
                <Select value={form.brand || undefined} onValueChange={(v) => set("brand", v)}>
                  <SelectTrigger id="brand" data-testid="lead-form-brand-select"><SelectValue placeholder="Выберите бренд" /></SelectTrigger>
                  <SelectContent>
                    {BRAND_OPTIONS.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="problem">В чём проблема?</Label>
                <Select value={form.problem || undefined} onValueChange={(v) => set("problem", v)}>
                  <SelectTrigger id="problem" data-testid="lead-form-problem-select"><SelectValue placeholder="Выберите проблему" /></SelectTrigger>
                  <SelectContent>
                    {PROBLEM_OPTIONS.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Сообщение (необязательно)</Label>
                <Textarea id="message" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Опишите проблему подробнее…" data-testid="lead-form-problem-textarea" />
              </div>
              <div className="sm:col-span-2 flex items-start gap-3 text-xs text-muted-foreground">
                <Checkbox id="consent" checked={form.consent} onCheckedChange={(v) => set("consent", !!v)} data-testid="lead-form-consent-checkbox" />
                <label htmlFor="consent" className="leading-relaxed">
                  Я согласен на обработку персональных данных и на связь по указанному телефону.
                </label>
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={submitting} className="h-12 px-6 sm:flex-1 gap-2" data-testid="lead-form-submit-button">
                  <Wrench className="w-4 h-4" /> {submitting ? "Отправляем…" : "Вызвать мастера"}
                </Button>
                <a href={formatPhoneHref(phone)} className="sm:flex-1">
                  <Button type="button" variant="outline" className="w-full h-12 px-6 gap-2 border-border" data-testid="lead-form-call-button">
                    <Phone className="w-4 h-4" /> Позвонить
                  </Button>
                </a>
              </div>
              {done && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-foreground flex items-start gap-3" data-testid="lead-form-success">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-primary">Заявка принята!</div>
                    <div className="text-foreground/80 mt-0.5">Мы перезвоним вам в ближайшее время на указанный номер. Если срочно — звоните сами: {phone}</div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
