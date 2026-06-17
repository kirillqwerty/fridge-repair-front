export const SITE_NAME = "Сервис ремонта холодильников в Минске";
export const SITE_PHONE = "+375 (29) 609-54-31";
export const SITE_ADDRESS = "Минск, ул. Бельского, 14";

export function localBusinessSchema(contacts, stats) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: "",
    "@id": "",
    url: typeof window !== "undefined" ? window.location.origin : "",
    telephone: (contacts && contacts.phones && contacts.phones[0]) || SITE_PHONE,
    priceRange: "30-380 BYN",
    address: {
      "@type": "PostalAddress",
      streetAddress: (contacts && contacts.address) || SITE_ADDRESS,
      addressLocality: "Минск",
      addressCountry: "BY",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (stats && stats.rating) || 5,
      reviewCount: (stats && stats.reviews_count) || 234,
    },
    areaServed: "Минск",
  };
}

export function faqSchema(faq) {
  if (!Array.isArray(faq) || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
