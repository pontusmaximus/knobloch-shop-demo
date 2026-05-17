import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/data/faqs";

export function FaqSection({ title, faqs, id }: { title?: string; faqs: Faq[]; id?: string }) {
  const heading = title ?? "Häufige Fragen";
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id={id ?? "faq"} className="border-b py-16 lg:py-24">
      <div className="container max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">FAQ</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl text-balance">
            {heading}
          </h2>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl border bg-card">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="px-6 last:border-b-0">
              <AccordionTrigger className="py-5 text-left text-base font-semibold">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground text-pretty">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </div>
    </section>
  );
}
