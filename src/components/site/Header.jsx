import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { formatPhoneHref } from "@/lib/api";

const BRANDS = [
  { slug: "atlant", name: "Атлант" },
  { slug: "samsung", name: "Samsung" },
  { slug: "lg", name: "LG" },
  { slug: "bosch", name: "BOSCH" },
  { slug: "indesit", name: "Indesit" },
  { slug: "liebherr", name: "LIEBHERR" },
  { slug: "electrolux", name: "Electrolux" },
  { slug: "ariston", name: "ARISTON" },
  { slug: "beko", name: "BEKO" },
  { slug: "sharp", name: "SHARP" },
  { slug: "daewoo", name: "DAEWOO" },
  { slug: "aeg", name: "AEG" },
];

export default function Header({ contacts }) {
  const phones = (contacts && contacts.phones) || ["+375 (29) 609-54-31"];
  const hours = (contacts && contacts.hours) || "Работаем 8:00 — 22:00";
  const address = (contacts && contacts.address) || "Минск, ул. Бельского, 14";
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      {/* Top contact strip (desktop only) */}
      <div className="hidden md:block border-b border-border/70 bg-accent/40">
        <div className="container-page flex items-center justify-between py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {hours} • без выходных
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {address}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {phones.map((p) => (
              <a key={p} href={formatPhoneHref(p)} className="font-medium text-foreground hover:text-primary transition-colors">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page flex items-center justify-between py-3 sm:py-4 gap-3">
        <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            {/* Snowflake-like simple mark */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-base sm:text-lg text-foreground">Ремонт холодильников</div>
            <div className="text-xs text-muted-foreground">Минск • на дому за 30 мин</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <a href="/#pricing" className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors">Цены</a>
          <a href="/#brands" className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors">Бренды</a>
          <a href="/#reviews" className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors">Отзывы</a>
          <a href="/#faq" className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors">FAQ</a>
          <a href="/#contacts" className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={formatPhoneHref(phones[0])} className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" data-testid="header-call-button" className="gap-2">
              <Phone className="w-4 h-4" /> {phones[0]}
            </Button>
          </a>
          <a href="/#lead">
            <Button size="sm" data-testid="header-cta-button" className="gap-2">
              Вызвать мастера
            </Button>
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="header-menu-button" aria-label="Меню">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] sm:w-[420px] bg-background">
              <div className="flex flex-col gap-6 mt-6">
                <div className="text-sm text-muted-foreground">{hours}, без выходных</div>
                {phones.map((p) => (
                  <a key={p} href={formatPhoneHref(p)} className="text-lg font-display font-semibold text-foreground hover:text-primary inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {p}
                  </a>
                ))}
                <div className="text-sm text-muted-foreground inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> {address}</div>
                <nav className="grid grid-cols-1 gap-1 mt-2">
                  <a onClick={() => setOpen(false)} href="/#pricing" className="py-2.5 text-base border-b border-border">Стоимость</a>
                  <a onClick={() => setOpen(false)} href="/#brands" className="py-2.5 text-base border-b border-border">Бренды</a>
                  <a onClick={() => setOpen(false)} href="/#portfolio" className="py-2.5 text-base border-b border-border">Портфолио</a>
                  <a onClick={() => setOpen(false)} href="/#reviews" className="py-2.5 text-base border-b border-border">Отзывы</a>
                  <a onClick={() => setOpen(false)} href="/#faq" className="py-2.5 text-base border-b border-border">FAQ</a>
                  <a onClick={() => setOpen(false)} href="/#lead" className="py-2.5 text-base border-b border-border">Заявка</a>
                </nav>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {BRANDS.slice(0, 8).map((b) => (
                    <Link key={b.slug} onClick={() => setOpen(false)} to={`/brand/${b.slug}`} className="px-3 py-2 rounded-lg border border-border text-sm hover:border-primary/40">
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
