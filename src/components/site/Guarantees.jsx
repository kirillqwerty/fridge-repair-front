import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { Check } from "lucide-react";

function Icon({ name, className }) {
  const Cmp = Icons[name] || Icons.ShieldCheck;
  return <Cmp className={className} />;
}

function Group({ data }) {
  return (
    <Card className="p-5 bg-card border-border lift-shadow">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon name={data.icon} className="w-5 h-5" />
        </div>
        <div className="font-display text-lg font-semibold">{data.title}</div>
      </div>
      <ul className="mt-4 space-y-2">
        {(data.items || []).map((it, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {it}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function Guarantees({ guarantees }) {
  if (!guarantees) return null;
  return (
    <section id="guarantees" className="section-pad bg-secondary/30" data-testid="guarantees-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Условия и гарантии</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Объединили главные условия работы, оплаты и гарантий в одном разделе</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="guarantees-groups">
          <Group data={guarantees.result} />
          <Group data={guarantees.work} />
          <Group data={guarantees.payment} />
        </div>
      </div>
    </section>
  );
}
