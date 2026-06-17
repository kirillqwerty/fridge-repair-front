import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, CheckCircle2 } from "lucide-react";

function priceLabel(s) {
  if (!s) return "—";
  if (s.price_from === 0 && (!s.price_to || s.price_to === 0)) return "бесплатно";
  if (s.price_from && s.price_to && s.price_to !== s.price_from) return `${s.price_from}–${s.price_to} ${s.unit || "BYN"}`;
  return `${s.price_from || s.price_to} ${s.unit || "BYN"}`;
}

function CostExample({ title, items, total }) {
  return (
    <Card className="p-5 bg-card border-border lift-shadow">
      <div className="font-semibold text-base mb-3">{title}</div>
      <ul className="space-y-1.5 text-sm">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center justify-between border-b border-dashed border-border/70 py-1">
            <span className="text-muted-foreground">{it.label}</span>
            <span className="tabular-nums font-medium">{it.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
        <span className="text-sm font-semibold text-foreground">Итого</span>
        <span className="font-display font-semibold text-lg text-primary tabular-nums">{total}</span>
      </div>
    </Card>
  );
}

export default function Pricing({ services }) {
  const list = (services || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <section id="pricing" className="section-pad bg-secondary/30" data-testid="pricing-section">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Стоимость ремонта</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Прозрачные цены — никаких скрытых платежей. Цены в белорусских рублях.
            </p>
          </div>
          <a href="#lead">
            <Button className="gap-2" data-testid="pricing-calc-cta-button">
              <Calculator className="w-4 h-4" /> Рассчитать стоимость
            </Button>
          </a>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block" data-testid="pricing-table">
          <Card className="overflow-hidden bg-card border-border">
            <div className="grid grid-cols-12 px-5 py-3 bg-secondary/60 border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <div className="col-span-6">Услуга</div>
              <div className="col-span-3">Примечание</div>
              <div className="col-span-3 text-right">Цена</div>
            </div>
            <div className="divide-y divide-border">
              {list.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className={`grid grid-cols-12 px-5 py-3 items-center text-sm ${idx % 2 ? "bg-secondary/20" : ""}`}
                >
                  <div className="col-span-6 font-medium text-foreground">{s.name}</div>
                  <div className="col-span-3 text-muted-foreground">{s.note || "—"}</div>
                  <div className="col-span-3 text-right font-display font-semibold tabular-nums text-foreground">{priceLabel(s)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2">
          {list.map((s, idx) => (
            <Card key={s.id || idx} className="p-4 bg-card border-border">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium">{s.name}</div>
                  {s.note && <div className="text-xs text-muted-foreground mt-1">{s.note}</div>}
                </div>
                <div className="text-right font-display font-semibold tabular-nums whitespace-nowrap">{priceLabel(s)}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Examples */}
        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold mb-4">Примеры сметы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CostExample
              title="Ремонт компрессора (не холодит)"
              items={[
                { label: "Диагностика", value: "30 BYN (беспл. при ремонте)" },
                { label: "Запчасть", value: "120 BYN" },
                { label: "Работа", value: "60 BYN" },
              ]}
              total="180 BYN"
            />
            <CostExample
              title="Замена термостата"
              items={[
                { label: "Диагностика", value: "бесплатно" },
                { label: "Термостат", value: "45 BYN" },
                { label: "Установка", value: "40 BYN" },
              ]}
              total="85 BYN"
            />
            <CostExample
              title="Заправка фреоном"
              items={[
                { label: "Поиск утечки", value: "40 BYN" },
                { label: "Пайка трассы", value: "30 BYN" },
                { label: "Фреон + работа", value: "60 BYN" },
              ]}
              total="130 BYN"
            />
          </div>
          <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
            Цены фиксируются ДО начала ремонта. Без доплат и сюрпризов.
          </div>
        </div>
      </div>
    </section>
  );
}
