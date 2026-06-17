import { Card } from "@/components/ui/card";
import { fullUploadUrl } from "@/lib/api";
import { ImageIcon } from "lucide-react";

function BeforeAfter({ item }) {
  const beforeUrl = item.before_url ? fullUploadUrl(item.before_url) : "";
  const afterUrl = item.after_url ? fullUploadUrl(item.after_url) : "";
  return (
    <Card className="overflow-hidden bg-card border-border lift-shadow">
      <div className="grid grid-cols-2 gap-px bg-border">
        <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center overflow-hidden">
          {beforeUrl ? (
            <img src={beforeUrl} alt={`До ремонта: ${item.title}`} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground text-xs gap-1">
              <ImageIcon className="w-6 h-6" /> ДО
            </div>
          )}
          <span className="absolute top-2 left-2 bg-background/90 border border-border rounded-md px-2 py-0.5 text-[11px] font-medium">ДО</span>
        </div>
        <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center overflow-hidden">
          {afterUrl ? (
            <img src={afterUrl} alt={`После ремонта: ${item.title}`} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground text-xs gap-1">
              <ImageIcon className="w-6 h-6" /> ПОСЛЕ
            </div>
          )}
          <span className="absolute top-2 left-2 bg-primary/95 text-primary-foreground rounded-md px-2 py-0.5 text-[11px] font-medium">ПОСЛЕ</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</div>}
        {item.brand && <div className="text-[11px] text-primary mt-2 inline-block bg-primary/10 px-2 py-0.5 rounded">{item.brand}</div>}
      </div>
    </Card>
  );
}

export default function Portfolio({ portfolio }) {
  const items = portfolio || [];
  if (items.length === 0) return null;
  return (
    <section id="portfolio" className="section-pad" data-testid="portfolio-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Портфолио: до и после</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Реальные ремонты наших мастеров — визуальное доказательство качества</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="before-after-carousel">
          {items.map((p) => (
            <BeforeAfter key={p.id} item={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
