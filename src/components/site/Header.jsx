import { Link, useNavigate } from "react-router-dom";
import { Phone, MapPin, Clock, Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { formatPhoneHref } from "@/lib/api";
import { scrollToSection, scrollToSectionWhenReady } from "@/lib/scroll";
import refrigeratorLogo from "@/assets/refrigerator_repair_logo.png";

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

const NAV_LINKS = [
  { id: "brands", label: "Бренды" },
  { id: "pricing", label: "Цены" },
  { id: "team", label: "Мастера" },
  { id: "reviews", label: "Отзывы" },
  { id: "portfolio", label: "Портфолио" },
  { id: "guarantees", label: "Условия" },
  { id: "process", label: "Как работаем" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты", mobile: false },
  { id: "lead", label: "Заявка", desktop: false },
];

export default function Header({ contacts }) {
  const phones = (contacts && contacts.phones) || ["+375 (29) 609-54-31"];
  const hours = (contacts && contacts.hours) || "Работаем 8:00 — 22:00";
  const address = (contacts && contacts.address) || "Минск, ул. Бельского, 14";
  const telegramLink = contacts && contacts.telegram_link;
  const viberLink = contacts && contacts.viber_link;
  const primaryPhone = phones[0];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => (event) => {
    event.preventDefault();
    setOpen(false);

    if (scrollToSection(sectionId)) return;

    navigate("/");
    window.setTimeout(() => scrollToSectionWhenReady(sectionId), 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="hidden lg:block border-b border-border/70 bg-accent/40">
        <div className="container-page !max-w-[1560px] flex items-center justify-between gap-6 py-2 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-5">
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5" />
              {hours}
            </span>

            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{address}</span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            {phones.map((p, index) => (
              <a
                key={p}
                href={formatPhoneHref(p)}
                className={`font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap ${
                  index > 0 ? "hidden xl:inline" : ""
                }`}
              >
                {p}
              </a>
            ))}

            {(telegramLink || viberLink) && (
              <span className="hidden xl:inline-flex items-center gap-1 text-primary whitespace-nowrap">
                <MessageCircle className="w-3.5 h-3.5" />
                Мессенджеры
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container-page !max-w-[1560px] flex items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 group"
          data-testid="header-logo"
        >
          <img
            src={refrigeratorLogo}
            alt="Ремонт холодильников"
            className="w-10 h-10 rounded-xl object-contain shrink-0 sm:w-11 sm:h-11"
          />

          <div className="leading-tight min-w-0 max-[420px]:hidden">
            <div className="font-display font-semibold text-base sm:text-lg text-foreground whitespace-nowrap">
              Ремонт холодильников
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              Минск • на дому за 30 мин
            </div>
          </div>
        </Link>

        <nav className="hidden 2xl:flex flex-1 items-center justify-center gap-1 px-4">
          {NAV_LINKS.filter((link) => link.desktop !== false).map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleSectionClick(link.id)}
              className="px-3 py-2 text-sm text-foreground/80 hover:text-primary rounded-md hover:bg-accent/60 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={formatPhoneHref(primaryPhone)}
            className="hidden lg:inline-flex"
          >
            <Button
              variant="outline"
              size="sm"
              data-testid="header-call-button"
              className="gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              {primaryPhone}
            </Button>
          </a>

          <a href="#lead" onClick={handleSectionClick("lead")}>
            <Button
              size="sm"
              data-testid="header-cta-button"
              className="gap-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Вызвать мастера</span>
              <span className="sm:hidden">Вызвать</span>
            </Button>
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="2xl:hidden shrink-0"
                data-testid="header-menu-button"
                aria-label="Меню"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] sm:w-[420px] bg-background overflow-y-auto"
            >
              <div className="flex flex-col gap-6 mt-6">
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">
                    Ремонт холодильников
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {hours}, без выходных
                  </div>
                </div>

                <div className="grid gap-3">
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={formatPhoneHref(p)}
                      className="text-lg font-display font-semibold text-foreground hover:text-primary inline-flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {p}
                    </a>
                  ))}

                  <div className="text-sm text-muted-foreground inline-flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{address}</span>
                  </div>
                </div>

                <nav className="grid grid-cols-1 gap-1 mt-2">
                  {NAV_LINKS.filter((link) => link.mobile !== false).map(
                    (link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={handleSectionClick(link.id)}
                        className="py-2.5 text-base border-b border-border"
                      >
                        {link.mobileLabel || link.label}
                      </a>
                    ),
                  )}
                </nav>

                <div>
                  <div className="text-sm font-semibold mb-2">
                    Быстрый выбор бренда
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {BRANDS.slice(0, 8).map((b) => (
                      <Link
                        key={b.slug}
                        onClick={() => setOpen(false)}
                        to={`/brand/${b.slug}`}
                        className="px-3 py-2 rounded-lg border border-border text-sm hover:border-primary/40"
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
