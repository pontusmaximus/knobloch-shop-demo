import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Wir haben für unser neues Mehrfamilienhaus eine 12er-Anlage in V2A geordert. Vom ersten Anruf bis zur Montage hat alles reibungslos geklappt. Die Qualität ist makellos.",
    author: "Andreas Beck",
    role: "Bauträger · Stuttgart",
    rating: 5,
  },
  {
    quote:
      "Der Konfigurator hat uns als Architektenbüro begeistert — endlich Live-Preise und sofort eine PDF für die Bauherren. Empfehlen wir aktiv weiter.",
    author: "Dipl.-Ing. Lisa Hartmann",
    role: "Architektin · Berlin",
    rating: 5,
  },
  {
    quote:
      "Anthrazit-pulverbeschichtet, Aufputz, mit beleuchteter Hausnummer — sieht an unserer Fassade fantastisch aus. Lieferung in 4 Tagen.",
    author: "Familie Wagner",
    role: "Privatkunden · München",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Über 100.000 Anlagen weltweit installiert
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl text-balance">
              Stimmen unserer Kund:innen.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full border bg-card px-4 py-2 shadow-sm">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">4,8 / 5</span>
              <span className="text-muted-foreground"> · 2.140 Bewertungen</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-pretty">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t pt-4">
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
