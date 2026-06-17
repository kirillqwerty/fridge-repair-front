import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ({ faq }) {
  const list = (faq || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  if (list.length === 0) return null;
  return (
    <section id="faq" className="section-pad" data-testid="faq-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Частые вопросы</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Ответы на вопросы, которые чаще всего задают клиенты</p>
        </div>
        <Accordion type="single" collapsible className="mt-6 max-w-3xl" data-testid="faq-accordion">
          {list.map((q) => (
            <AccordionItem key={q.id} value={q.id} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:text-primary">{q.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/80 leading-relaxed">{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
