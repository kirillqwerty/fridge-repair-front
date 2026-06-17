import { Phone, ShieldCheck, Star, Wrench, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPhoneHref } from "@/lib/api";

const TOP_BRANDS = [
  { slug: "lg", name: "LG" },
  { slug: "samsung", name: "Samsung" },
  { slug: "bosch", name: "BOSCH" },
  { slug: "ariston", name: "ARISTON" },
  { slug: "electrolux", name: "Electrolux" },
];

export default function Hero({ contacts, stats }) {
  const phone =
    (contacts && contacts.phones && contacts.phones[0]) ||
    "+375 (29) 609-54-31";
  const rating = (stats && stats.rating) || 5.0;
  const reviewsCount = (stats && stats.reviews_count) || 234;
  const arrival = (stats && stats.arrival_minutes) || 30;

  return (
    <section
      className="relative overflow-hidden hero-repair-bg hero-fullscreen"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-white/68 sm:bg-white/58" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="container-page section-pad relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <Badge
                variant="secondary"
                data-testid="hero-rating-badge"
                className="gap-1 bg-card border border-border"
              >
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />{" "}
                {rating.toFixed(1)}/5 • {reviewsCount}+ отзывов
              </Badge>
              <Badge
                variant="secondary"
                className="bg-card border border-border gap-1"
              >
                <Truck className="w-3.5 h-3.5 text-primary" /> Выезд за{" "}
                {arrival} мин
              </Badge>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance">
              Ремонт холодильников в Минске{" "}
              <span className="text-primary">на дому</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Быстрый выезд мастера в день звонка. Оригинальные запчасти,
              фиксированные цены, гарантия 1 год на все работы.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#lead">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto h-12 px-6"
                  data-testid="hero-call-master-button"
                >
                  <Wrench className="w-4 h-4" /> Вызвать мастера
                </Button>
              </a>
              <a href={formatPhoneHref(phone)}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 w-full sm:w-auto h-12 px-6 border-border"
                  data-testid="hero-call-phone-button"
                >
                  <Phone className="w-4 h-4" /> {phone}
                </Button>
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="inline-flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary mt-0.5" /> Гарантия
                1 год на работы и запчасти
              </li>
              <li className="inline-flex items-start gap-2">
                <Truck className="w-4 h-4 text-primary mt-0.5" /> Выездной
                ремонт на дому
              </li>
              <li className="inline-flex items-start gap-2">
                <Star className="w-4 h-4 text-primary mt-0.5" /> Диагностика
                бесплатно при ремонте
              </li>
              <li className="inline-flex items-start gap-2">
                <Wrench className="w-4 h-4 text-primary mt-0.5" /> Работаем без
                выходных 8:00–22:00
              </li>
            </ul>
          </div>

          {/* Trust card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-5 sm:p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {rating.toFixed(1)}/5 — {reviewsCount}+ проверенных отзывов
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-semibold text-foreground tabular-nums">
                    {(stats && stats.years_experience) || 19}+
                  </div>
                  <div className="text-xs text-muted-foreground">лет опыта</div>
                </div>
              </div>
              <div className="my-4 h-px bg-border" />
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-display font-semibold text-foreground tabular-nums">
                    {(stats && stats.repairs_done) || 2300}+
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    ремонтов
                  </div>
                </div>
                <div>
                  <div className="text-xl font-display font-semibold text-foreground tabular-nums">
                    {(stats && stats.guarantee_months) || 12} мес
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    гарантия
                  </div>
                </div>
                <div>
                  <div className="text-xl font-display font-semibold text-foreground tabular-nums">
                    {arrival} мин
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    приезд
                  </div>
                </div>
              </div>
              <div className="my-4 h-px bg-border" />
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Ремонтируем бренды
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  data-testid="hero-brands-strip"
                >
                  {TOP_BRANDS.map((b) => (
                    <Link
                      key={b.slug}
                      to={`/brand/${b.slug}`}
                      className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
