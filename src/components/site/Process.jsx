import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Process({ steps }) {
  const list = (steps || []).slice().sort((a, b) => (a.step || 0) - (b.step || 0));
  return (
    <section id="process" className="section-pad" data-testid="process-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Как мы работаем</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Прозрачный процесс из 10 шагов — всё от звонка до гарантии</p>
        </div>

        <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3" data-testid="process-steps">
          {list.map((s) => (
            <li key={s.id || s.step}>
              <Card className="p-4 bg-card border-border lift-shadow">
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-display font-semibold p-0">{s.step}</Badge>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    {s.description && <div className="text-sm text-muted-foreground mt-0.5">{s.description}</div>}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
