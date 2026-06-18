import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChevronRight, Search } from "lucide-react";

const POPULAR_BRANDS = new Set([
  "atlant",
  "samsung",
  "lg",
  "bosch",
  "indesit",
  "liebherr",
]);

export default function BrandsGrid({ brands }) {
  const list = (brands || []).slice().sort((a, b) => {
    const aPopular = POPULAR_BRANDS.has(a.slug) ? 0 : 1;
    const bPopular = POPULAR_BRANDS.has(b.slug) ? 0 : 1;
    return aPopular - bPopular || (a.name || "").localeCompare(b.name || "");
  });

  return (
    <section id="brands" className="section-pad" data-testid="brands-section">
      <div className="container-page">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Выберите бренд холодильника
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Бренды работают как фильтр-навигатор: нажмите на марку и перейдите к цене, частым поломкам и особенностям ремонта.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
            <Search className="h-4 w-4 text-primary" /> Быстрая навигация
          </div>
        </div>

        <nav
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          data-testid="brands-grid"
          aria-label="Навигация по брендам холодильников"
        >
          {list.map((b) => (
            <Link key={b.slug} to={`/brand/${b.slug}`} data-testid={`brand-card-${b.slug}`}>
              <Card className="group p-4 sm:p-5 bg-card border-border h-full hover:border-primary/50 transition-colors lift-shadow">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-display text-lg sm:text-xl font-semibold truncate">
                    {b.name}
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {b.country || "Ремонт в Минске"}
                </div>
                <div className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Смотреть ремонт {b.name}
                </div>
              </Card>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
