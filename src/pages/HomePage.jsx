import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Pricing from "@/components/site/Pricing";
import Portfolio from "@/components/site/Portfolio";
import Guarantees from "@/components/site/Guarantees";
import Process from "@/components/site/Process";
import Masters from "@/components/site/Masters";
import BrandsGrid from "@/components/site/BrandsGrid";
import ReviewsExtended from "@/components/site/ReviewsExtended";
import FAQ from "@/components/site/FAQ";
import LeadForm from "@/components/site/LeadForm";
import FloatingCallBar from "@/components/site/FloatingCallBar";
import SeoHead from "@/components/site/SeoHead";
import AppLoader from "@/components/site/AppLoader";
import { useSiteData } from "@/lib/hooks";
import { localBusinessSchema, faqSchema } from "@/lib/seo";

export default function HomePage() {
  const { data, loading, error } = useSiteData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 bg-background text-foreground">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Не удалось загрузить сайт
          </h1>
          <p className="mt-2 text-muted-foreground">
            Проверьте подключение к backend или обновите страницу.
          </p>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <AppLoader
        title="Загрузка сайта"
        subtitle="Получаем услуги, цены и отзывы"
      />
    );
  }

  const phone =
    (data.contacts && data.contacts.phones && data.contacts.phones[0]) ||
    "+375 (29) 609-54-31";
  const businessSchema = localBusinessSchema(data.contacts, data.stats);
  const fSchema = faqSchema(data.faq);
  const title =
    "Ремонт холодильников в Минске — выезд за 30 минут, гарантия 1 год";
  const description =
    "Профессиональный ремонт холодильников всех популярных марок на дому в Минске. Гарантия 1 год, фиксированные цены, без выходных 8:00–22:00.";
  const publicUrl = process.env.PUBLIC_URL || "";
  const siteBaseUrl =
    typeof window !== "undefined" ? `${window.location.origin}${publicUrl}` : "";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SeoHead
        title={title}
        description={description}
        canonical={siteBaseUrl ? `${siteBaseUrl}/` : undefined}
        ogImage={
          siteBaseUrl
            ? `${siteBaseUrl}/assets/refrigerator_repair_logo.png`
            : undefined
        }
        jsonLd={businessSchema}
      />
      {fSchema && <SeoHead jsonLd={fSchema} />}

      <Header contacts={data.contacts} />

      <main className="flex-1">
        <Hero contacts={data.contacts} stats={data.stats} />
        <BrandsGrid brands={data.brands} />
        <Pricing services={data.services} />
        <Masters masters={data.masters} />
        <ReviewsExtended reviews={data.reviews} />
        <Portfolio portfolio={data.portfolio} />
        <Guarantees guarantees={data.guarantees} />
        <Process steps={data.process_steps} />
        <FAQ faq={data.faq} />
        <LeadForm contacts={data.contacts} />
      </main>

      <Footer contacts={data.contacts} />
      <FloatingCallBar phone={phone} />
    </div>
  );
}
