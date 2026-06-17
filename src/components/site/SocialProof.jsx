import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { fullUploadUrl } from "@/lib/api";

export default function SocialProof({ reviews, stats }) {
  const featured = (reviews || []).filter((r) => r.featured).slice(0, 4);
  const items = featured.length > 0 ? featured : (reviews || []).slice(0, 4);
  return (
    <section className="section-pad accent-strip-bg" data-testid="social-proof-section">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Нам доверяют минчане</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Реальные отзывы клиентов — без прикрас и накруток</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-card border border-border rounded-full px-3 py-1.5" data-testid="social-proof-stats">
            {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />)}
            <span className="font-semibold">{((stats && stats.rating) || 5).toFixed(1)}/5</span>
            <span className="text-muted-foreground">• {(stats && stats.reviews_count) || 234} отзывов</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="social-proof-short-reviews">
          {items.map((r) => (
            <Card key={r.id} className="p-5 bg-card border-border lift-shadow">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  {r.image_url ? (
                    <AvatarImage src={fullUploadUrl(r.image_url)} alt={r.author} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {(r.author || "К").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold leading-tight">{r.author}</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: r.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed line-clamp-5">«{r.text}»</p>
              {(r.brand || r.problem) && (
                <div className="mt-3 text-xs text-muted-foreground">{[r.brand, r.problem].filter(Boolean).join(" • ")}</div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat value={`${(stats && stats.reviews_count) || 234}+`} label="отзывов" />
          <Stat value={`${(stats && stats.years_experience) || 19} лет`} label="опыта" />
          <Stat value={`${(stats && stats.repairs_done) || 2300}+`} label="ремонтов" />
          <Stat value={`${(stats && stats.guarantee_months) || 12} мес`} label="гарантия" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 text-center soft-shadow">
      <div className="font-display text-xl sm:text-2xl font-semibold text-foreground tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
