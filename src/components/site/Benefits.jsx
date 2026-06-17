import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";

function Icon({ name, className }) {
  const Cmp = Icons[name] || Icons.Check;
  return <Cmp className={className} />;
}

export default function Benefits({ benefits }) {
  const items = benefits || [];
  return (
    <section id="benefits" className="section-pad" data-testid="benefits-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Выгоды для вас</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Почему стоит заказать ремонт именно у нас</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="benefits-grid">
          {items.map((b) => (
            <Card key={b.id} className="p-5 bg-card border-border lift-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name={b.icon} className="w-5 h-5" />
              </div>
              <div className="mt-4 font-display text-lg font-semibold">{b.title}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
