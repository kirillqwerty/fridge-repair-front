import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fullUploadUrl } from "@/lib/api";

export default function Masters({ masters }) {
  const list = (masters || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <section id="team" className="section-pad bg-secondary/30" data-testid="team-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Мастера компании</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Реальные специалисты с опытом 10+ лет. Приедет к вам лично один из них.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="team-grid">
          {list.map((m) => (
            <Card key={m.id} className="p-5 bg-card border-border text-center lift-shadow">
              <Avatar className="w-20 h-20 mx-auto">
                {m.image_url ? <AvatarImage src={fullUploadUrl(m.image_url)} alt={m.name} /> : null}
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-display font-semibold">
                  {(m.name || "М").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mt-3 font-display text-lg font-semibold">{m.name}</div>
              <div className="text-xs text-primary font-medium">{m.role}</div>
              <div className="mt-2 text-sm text-foreground/80">{m.experience}</div>
              {m.specialization && <div className="mt-1 text-xs text-muted-foreground">{m.specialization}</div>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
