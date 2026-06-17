import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import LeadForm from "@/components/site/LeadForm";
import FloatingCallBar from "@/components/site/FloatingCallBar";
import SeoHead from "@/components/site/SeoHead";
import ReviewsExtended from "@/components/site/ReviewsExtended";
import FAQ from "@/components/site/FAQ";
import BrandsGrid from "@/components/site/BrandsGrid";
import AppLoader from "@/components/site/AppLoader";
import { api, formatPhoneHref } from "@/lib/api";
import { localBusinessSchema } from "@/lib/seo";
import { scrollToSection } from "@/lib/scroll";

const BRAND_TITLE_MAP = {
  atlant: "Атлант",
  sharp: "SHARP",
  lg: "LG",
  daewoo: "DAEWOO",
  samsung: "Samsung",
  electrolux: "Electrolux",
  indesit: "Indesit",
  beko: "BEKO",
  bosch: "BOSCH",
  ariston: "ARISTON",
  liebherr: "LIEBHERR",
  aeg: "AEG",
};

function priceLabel(s) {
  if (!s) return "—";
  if (s.price_from === 0 && (!s.price_to || s.price_to === 0))
    return "бесплатно";
  if (s.price_from && s.price_to && s.price_to !== s.price_from)
    return `${s.price_from}–${s.price_to} ${s.unit || "BYN"}`;
  return `${s.price_from || s.price_to} ${s.unit || "BYN"}`;
}

export default function BrandPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [site, setSite] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Set the title immediately based on slug so users/SEO get an instant indicator
    const known = BRAND_TITLE_MAP[slug];
    if (known) {
      document.title = `Ремонт холодильников ${known} в Минске — гарантия, выезд 30 мин`;
    }
    window.scrollTo(0, 0);
    Promise.all([api.get(`/brands/${slug}`), api.get("/site-data")])
      .then(([brand, site]) => {
        if (mounted) {
          setData(brand.data);
          setSite(site.data);
        }
      })
      .catch(() => mounted && setError(true));
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container-page py-20 text-center">
          <h1 className="font-display text-3xl font-semibold">
            Бренд не найден
          </h1>
          <p className="text-muted-foreground mt-2">
            Проверьте URL или вернитесь на главную
          </p>
          <Link to="/" className="inline-block mt-4">
            <Button>На главную</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data || !site) {
    return (
      <AppLoader
        title="Загрузка страницы бренда"
        subtitle="Подбираем услуги и цены для выбранной марки"
      />
    );
  }

  const brand = data.brand;
  const contacts = data.contacts;
  const services = data.services || [];
  const reviews = data.reviews || [];
  const phone =
    (contacts && contacts.phones && contacts.phones[0]) ||
    "+375 (29) 609-54-31";
  const title = `Ремонт холодильников ${brand.name} в Минске — гарантия, выезд 30 мин`;
  const description =
    brand.meta_description ||
    `Ремонт холодильников ${brand.name} в Минске на дому. Гарантия 1 год. Звоните: ${phone}.`;
  const publicUrl = process.env.PUBLIC_URL || "";
  const siteBaseUrl =
    typeof window !== "undefined" ? `${window.location.origin}${publicUrl}` : "";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item:
          siteBaseUrl ? `${siteBaseUrl}/` : "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: brand.name,
        item:
          typeof window !== "undefined"
            ? window.location.href
            : `/brand/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SeoHead
        title={title}
        description={description}
        canonical={
          typeof window !== "undefined" ? window.location.href : undefined
        }
        ogImage={
          siteBaseUrl
            ? `${siteBaseUrl}/assets/refrigerator_repair_logo.png`
            : undefined
        }
        jsonLd={localBusinessSchema(contacts, site.stats)}
      />
      <SeoHead jsonLd={breadcrumb} />

      <Header contacts={contacts} />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative hero-bg overflow-hidden"
          data-testid="brand-page-hero"
        >
          <div className="absolute inset-0 noise-overlay" />
          <div className="container-page section-pad relative">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="w-4 h-4" /> На главную
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-7">
                <Badge
                  variant="secondary"
                  className="bg-card border border-border"
                >
                  {brand.country}
                </Badge>
                <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                  Ремонт холодильников{" "}
                  <span className="text-primary">{brand.name}</span> в Минске
                </h1>
                {brand.intro && (
                  <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {brand.intro}
                  </p>
                )}
                {brand.price_overrides && brand.price_overrides.length > 0 && (
                  <p className="mt-3 text-xs text-primary font-medium">
                    Для этой марки используется отдельный редактируемый прайс.
                  </p>
                )}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#lead"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection("lead");
                    }}
                  >
                    <Button
                      size="lg"
                      className="gap-2 w-full sm:w-auto h-12 px-6"
                    >
                      <Wrench className="w-4 h-4" /> Вызвать мастера{" "}
                      {brand.name}
                    </Button>
                  </a>
                  <a href={formatPhoneHref(phone)}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 w-full sm:w-auto h-12 px-6 border-border"
                    >
                      <Phone className="w-4 h-4" /> {phone}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <Card className="p-5 sm:p-6 bg-card border-border soft-shadow">
                  <div className="font-display text-lg font-semibold">
                    Особенности ремонта {brand.name}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {(brand.features || []).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Issues */}
        {brand.common_issues && brand.common_issues.length > 0 && (
          <section className="section-pad">
            <div className="container-page">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Частые поломки {brand.name}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Починим всё в день обращения
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {brand.common_issues.map((it, idx) => (
                  <Card
                    key={idx}
                    className="p-5 bg-card border-border lift-shadow"
                  >
                    <div className="text-sm">{it}</div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        <section id="pricing" className="section-pad bg-secondary/30">
          <div className="container-page">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Прайс на ремонт холодильников {brand.name}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Цены в белорусских рублях. Фиксированная стоимость, оригинальные
              запчасти.
            </p>

            <Card
              className="mt-6 overflow-hidden bg-card border-border"
              data-testid="brand-price-list"
            >
              <div className="hidden md:grid grid-cols-12 px-5 py-3 bg-secondary/60 border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <div className="col-span-6">Услуга</div>
                <div className="col-span-3">Примечание</div>
                <div className="col-span-3 text-right">Цена</div>
              </div>
              <div className="divide-y divide-border">
                {services.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`grid md:grid-cols-12 px-5 py-3 items-center text-sm ${idx % 2 ? "md:bg-secondary/20" : ""}`}
                  >
                    <div className="md:col-span-6 font-medium">{s.name}</div>
                    <div className="md:col-span-3 text-muted-foreground text-xs md:text-sm">
                      {s.note || "—"}
                    </div>
                    <div className="md:col-span-3 md:text-right font-display font-semibold tabular-nums mt-1 md:mt-0">
                      {priceLabel(s)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad" data-testid="brand-cta">
          <LeadForm
            contacts={contacts}
            defaultBrand={brand.name}
            title={`Вызов мастера по ${brand.name}`}
            subtitle={`Приедет специалист по ${brand.name} с запчастями. Диагностика бесплатно при ремонте, гарантия 1 год.`}
          />
        </section>

        {/* Reviews specific to brand if any */}
        {reviews.length > 0 && <ReviewsExtended reviews={reviews} />}

        {/* FAQ */}
        {site.faq && site.faq.length > 0 && <FAQ faq={site.faq} />}

        {/* Other brands */}
        {site.brands && (
          <section className="section-pad bg-secondary/30">
            <div className="container-page">
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                Другие бренды, которые мы ремонтируем
              </h3>
              <BrandsGrid brands={site.brands.filter((b) => b.slug !== slug)} />
            </div>
          </section>
        )}
      </main>

      <Footer contacts={contacts} />
      <FloatingCallBar phone={phone} />
    </div>
  );
}
