import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, FileText, Mail } from "lucide-react";
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
  const companyName =
    (contacts && contacts.company_name) || "Сервис по ремонту холодильников";
  const email = contacts && contacts.email;
  const footerNote =
    (contacts && contacts.footer_note) ||
    "Информация на сайте не является публичной офертой";

  return (
    <footer
      id="contacts"
      className="mt-16 sm:mt-24 bg-slate-950 text-slate-200 border-t border-slate-800"
    >
      <div className="container-page py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src={refrigeratorLogo}
              alt="Ремонт холодильников"
              className="w-10 h-10 rounded-xl object-contain shrink-0 bg-white"
            />
            <div className="leading-tight">
              <div className="font-display font-semibold text-base text-white">
                Ремонт холодильников
              </div>
              <div className="text-xs text-slate-400">
                Минск • на дому за 30 мин
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Профессиональный ремонт холодильников всех популярных марок в Минске.
            Работаем с выездом на дом, фиксируем стоимость до начала ремонта.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-sm font-semibold mb-3 text-white">
            Контакты
          </div>
          <div className="space-y-2 text-sm">
            {phones.map((p) => (
              <a
                key={p}
                href={formatPhoneHref(p)}
                className="flex items-center gap-2 text-slate-200 hover:text-sky-300 transition-colors"
                data-testid={`footer-phone-${p}`}
              >
                <Phone className="w-4 h-4 text-sky-300" /> {p}
              </a>
            ))}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-300" /> {email}
              </a>
            )}
            <div
              className="flex items-start gap-2 text-slate-400"
              data-testid="footer-hours"
            >
              <Clock className="w-4 h-4 text-sky-300 mt-0.5" />
              <span>
                {hours}
                <br />
                {days}
              </span>
            </div>
            <div
              className="flex items-start gap-2 text-slate-400"
              data-testid="footer-address"
            >
              <MapPin className="w-4 h-4 text-sky-300 mt-0.5" />{" "}
              <span>{address}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-sm font-semibold mb-3 text-white">
            Бренды
          </div>
          <div className="grid grid-cols-2 gap-2">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                to={`/brand/${b.slug}`}
                className="text-xs sm:text-sm text-slate-400 hover:text-sky-300 transition-colors"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold mb-3 text-white">
            <FileText className="w-4 h-4 text-sky-300" /> Юридическая информация
          </div>
          <div className="space-y-2 text-xs leading-relaxed text-slate-400">
            <p>{companyName}</p>
            <p>{footerNote}</p>
            <p>
              Окончательная стоимость зависит от модели холодильника, характера неисправности и цены запчастей.
            </p>
            <p>
              Гарантия предоставляется на выполненные работы и установленные детали согласно условиям заказа.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page py-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-slate-500">
          <p
            data-testid="footer-disclaimer"
            className="max-w-3xl leading-relaxed"
          >
            Сайт носит информационный характер. Для точного расчета оставьте заявку или позвоните мастеру.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="hover:text-sky-300"
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
