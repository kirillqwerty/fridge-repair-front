import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fullUploadUrl } from "@/lib/api";

export default function ReviewsExtended({ reviews }) {
  const list = (reviews || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  if (list.length === 0) return null;
  return (
    <section id="reviews" className="section-pad bg-secondary/30" data-testid="reviews-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Отзывы наших клиентов</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Развёрнутые отзывы с указанием бренда холодильника и решённой проблемы</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="reviews-long-list">
          {list.map((r) => (
            <Card key={r.id} className="p-5 bg-card border-border lift-shadow">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  {r.image_url ? <AvatarImage src={fullUploadUrl(r.image_url)} alt={r.author} /> : null}
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{(r.author || "К").charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 justify-between flex-wrap">
                    <div>
                      <div className="font-semibold leading-tight">{r.author}</div>
                      <div className="text-xs text-muted-foreground">{r.city || "Минск"}{r.date ? ` • ${r.date}` : ""}</div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: r.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/85 leading-relaxed">«{r.text}»</p>
                  {(r.brand || r.problem) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {r.brand && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{r.brand}</span>}
                      {r.problem && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded border border-border">{r.problem}</span>}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
