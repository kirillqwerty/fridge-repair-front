import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function BrandsGrid({ brands }) {
  const list = brands || [];
  return (
    <section id="brands" className="section-pad" data-testid="brands-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Какие бренды мы ремонтируем</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Нажмите на бренд, чтобы увидеть прайс и особенности ремонта</p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" data-testid="brands-grid">
          {list.map((b) => (
            <Link key={b.slug} to={`/brand/${b.slug}`} data-testid={`brand-card-${b.slug}`}>
              <Card className="p-4 sm:p-5 bg-card border-border h-full hover:border-primary/40 transition-colors lift-shadow">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg sm:text-xl font-semibold">{b.name}</div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{b.country}</div>
                <div className="mt-3 text-xs text-primary inline-flex items-center font-medium">
                  Ремонт {b.name}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
