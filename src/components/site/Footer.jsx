import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";
import { formatPhoneHref } from "@/lib/api";
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

export default function Footer({ contacts }) {
  const phones = (contacts && contacts.phones) || [
    "+375 (29) 609-54-31",
    "+375 (29) 77-000-83",
  ];
  const hours = (contacts && contacts.hours) || "Работаем 8:00 — 22:00";
  const days = (contacts && contacts.days) || "Без выходных";
  const address = (contacts && contacts.address) || "Минск, ул. Бельского, 14";
  const footerNote =
    (contacts && contacts.footer_note) ||
    "Информация на сайте не является публичной офертой";

  return (
    <footer
      id="contacts"
      className="mt-16 sm:mt-24 bg-secondary/40 border-t border-border"
    >
      <div className="container-page py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src={refrigeratorLogo}
              alt="Ремонт холодильников"
              className="w-10 h-10 rounded-xl object-contain shrink-0"
            />
            <div className="leading-tight">
              <div className="font-display font-semibold text-base text-foreground">
                Ремонт холодильников
              </div>
              <div className="text-xs text-muted-foreground">
                Минск • на дому за 30 мин
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Профессиональный ремонт холодильников всех популярных марок в
            Минске. Гарантия 1 год на все работы.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-sm font-semibold mb-3 text-foreground">
            Контакты
          </div>
          <div className="space-y-2 text-sm">
            {phones.map((p) => (
              <a
                key={p}
                href={formatPhoneHref(p)}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                data-testid={`footer-phone-${p}`}
              >
                <Phone className="w-4 h-4 text-primary" /> {p}
              </a>
            ))}
            <div
              className="flex items-start gap-2 text-muted-foreground"
              data-testid="footer-hours"
            >
              <Clock className="w-4 h-4 text-primary mt-0.5" />
              <span>
                {hours}
                <br />
                {days}
              </span>
            </div>
            <div
              className="flex items-start gap-2 text-muted-foreground"
              data-testid="footer-address"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5" />{" "}
              <span>{address}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="text-sm font-semibold mb-3 text-foreground">
            Бренды, с которыми работаем
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                to={`/brand/${b.slug}`}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-muted-foreground">
          <p
            data-testid="footer-disclaimer"
            className="max-w-2xl leading-relaxed"
          >
            {footerNote}
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="hover:text-primary"
              data-testid="footer-admin-link"
            >
              Админ
            </Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
