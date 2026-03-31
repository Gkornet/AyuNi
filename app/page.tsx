import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Aylani — Rust. Energie. Ritme.',
}

const pillars = [
  {
    image: '/images/hangmat.jpg',
    imageAlt: 'Twee mensen rusten uit in een hangmat in het bos',
    imagePosition: 'object-center',
    label: 'Rust',
    headline: 'Ruimte voor jezelf',
    body: 'Minder druk in je hoofd, meer ruimte in je dag. Echte rust is geen luxe — het is de basis waarop alles staat. Aylani helpt je dat op te bouwen én vol te houden.',
  },
  {
    image: '/images/nikki_klimmen.JPG',
    imageAlt: 'Persoon klimt met energie door een touwparcours',
    imagePosition: 'object-center',
    label: 'Energie',
    headline: 'Duurzame kracht',
    body: 'Geen quick fixes of extreme schema\'s. Duurzame energie begint bij kleine, slimme keuzes die passen bij wie jij bent. Elke dag een beetje beter, niet perfect.',
  },
  {
    image: '/images/duinen.jpeg',
    imageAlt: 'Wijd open duinlandschap met wolkenlucht',
    imagePosition: 'object-center',
    label: 'Ritme',
    headline: 'Een dag die klopt',
    body: 'Structuur zonder stijfheid. Een ritme dat bij jou past — niet bij het ideaalplaatje. Aylani begeleidt je bij gewoontes die je dag soepeler maken.',
  },
]

const forWhoPains = [
  'Je agenda is vol — en je wil ook meer ruimte voor jezelf',
  'Je slaapt, maar wil je echt uitgerust voelen',
  'Je zorgt goed voor anderen — en bent klaar om ook voor jezelf te kiezen',
  'Je weet wat er anders kan — je zoekt een aanpak die ook echt werkt',
  'Je hoofd werkt hard — ook als de dag er al op zit',
]

const forWhoWants = [
  'Meer rust in je hoofd en je dag',
  'Betere energie zonder alles op de kop te zetten',
  'Dagelijkse gewoontes die wél blijven hangen',
  'Iemand die je begrijpt en concreet helpt',
  'Begeleiding die past bij hoe jij leeft',
]

const offerPreview = [
  {
    label: 'Gratis',
    title: 'Inspiratie & kennisbank',
    desc: 'Praktische artikelen, korte oefeningen en eerlijke inzichten. Geen spam, geen hype — gewoon bruikbare kennis.',
    cta: 'Ontdek de kennisbank',
    href: '/aanbod',
    featured: false,
  },
  {
    label: 'Begeleiding',
    title: 'Persoonlijk traject',
    desc: 'Wekelijkse check-ins, een persoonlijk plan en concrete actiestappen. Samen bouwen we aan rust, energie en ritme in jouw leven.',
    cta: 'Bekijk begeleiding',
    href: '/aanbod',
    featured: true,
  },
  {
    label: 'Premium',
    title: 'Intensief & persoonlijk',
    desc: 'Voor wie dieper wil gaan. Intensieve 1-op-1 begeleiding met volledige aandacht voor jouw situatie, tempo en doelen.',
    cta: 'Meer over premium',
    href: '/aanbod',
    featured: false,
  },
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/images/zandpad.jpeg"
          alt="Zandpad dat wegloopt in het open landschap"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient: sterk links zodat tekst leesbaar is, open rechts */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-charcoal/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-2xl">
            <p className="text-honey text-xs font-sans tracking-widest uppercase mb-7">
              Leefstijlbegeleiding
            </p>
            <h1 className="font-serif text-6xl lg:text-8xl font-light text-white leading-none mb-8">
              Rust.{' '}
              <em className="italic text-honey not-italic" style={{ fontStyle: 'italic' }}>
                Energie.
              </em>{' '}
              Ritme.
            </h1>
            <p className="font-sans text-lg lg:text-xl text-white/75 leading-relaxed max-w-lg mb-12">
              Persoonlijke leefstijlbegeleiding voor drukke ouders en professionals.
              Voor mensen die veel dragen — en ook weer goed voor zichzelf willen leren zorgen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/aanbod" size="lg">
                Bekijk het aanbod
              </Button>
              <Button href="/about" variant="light" size="lg">
                Meer over Aylani
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* ─── EMPATHIE ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Foto */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden order-2 lg:order-1 shadow-xl">
              <Image
                src="/images/gert_doris_vaderkind.jpg"
                alt="Ouder en kind genieten samen van een zonnige dag"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle bottom fade to cream */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream/30 to-transparent" />
            </div>

            {/* Tekst */}
            <div className="order-1 lg:order-2">
              <p className="label-text mb-5">Klinkt dit herkenbaar?</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-8 text-balance">
                Je draagt veel.<br />
                <span className="italic text-honey">Je doet het goed.</span>
              </h2>
              <p className="text-warm-500 text-lg leading-relaxed mb-5">
                Je werkt hard, zorgt voor anderen en houdt alles draaiende. Juist
                daarom is dit het moment om te investeren in jezelf. Niet met grote
                ingrepen of rigide schema&#39;s — maar met een aanpak die past bij hoe jij bent.
              </p>
              <p className="text-warm-500 text-lg leading-relaxed mb-10">
                Aylani helpt je concreet: meer energie, beter slaapritme en
                dagelijkse gewoontes die je ook volhoudt.
              </p>
              <ul className="space-y-3">
                {forWhoPains.map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-honey flex-shrink-0" />
                    <span className="text-warm-600 leading-relaxed">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DRIE PIJLERS ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-warm-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-honey text-xs font-sans tracking-widest uppercase mb-4">
              De drie pijlers
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-cream-50 leading-tight text-balance">
              Wat Aylani voor je doet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="relative rounded-3xl overflow-hidden h-[520px] group"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  className={`object-cover ${pillar.imagePosition} transition-transform duration-700 group-hover:scale-105`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Dark gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-honey text-xs font-sans tracking-widest uppercase mb-2">
                    {pillar.label}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-white mb-3">
                    {pillar.headline}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOOR WIE ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Wensen lijst */}
            <div>
              <p className="label-text mb-5">Voor wie</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-10 text-balance">
                Aylani is voor jou als je wil
              </h2>
              <ul className="space-y-5">
                {forWhoWants.map((want, i) => (
                  <li key={i} className="flex items-start gap-4 pb-5 border-b border-warm-200 last:border-0 last:pb-0">
                    <span className="mt-1 w-5 h-5 rounded-full bg-honey-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-honey-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-warm-600 leading-relaxed">{want}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote block */}
            <div className="bg-charcoal rounded-3xl p-10 text-cream-50">
              <div className="mb-8">
                <svg className="w-8 h-8 text-honey mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-serif text-2xl lg:text-3xl font-light italic leading-snug text-cream-100">
                  Voor mensen die veel dragen en ook weer goed voor zichzelf willen leren zorgen.
                </p>
              </div>
              <div className="border-t border-warm-700 pt-8">
                <p className="text-warm-300 text-sm leading-relaxed mb-8">
                  Aylani is er voor drukke ouders en professionals die het beste willen geven
                  — aan hun werk, hun gezin, hun omgeving. En die tegelijk voelen dat ze ook
                  zelf iets nodig hebben.
                </p>
                <Button href="/aanbod" variant="outline">
                  Bekijk wat past bij jou
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AANBOD PREVIEW ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="label-text mb-4">Het aanbod</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight text-balance">
              Begin waar jij staat
            </h2>
            <p className="text-warm-500 mt-4 leading-relaxed">
              Of je nu wilt verkennen of meteen wilt starten — er is een passende plek voor jou.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerPreview.map((offer) => (
              <div
                key={offer.title}
                className={`rounded-3xl p-8 flex flex-col ${
                  offer.featured
                    ? 'bg-charcoal text-cream-50 ring-2 ring-honey'
                    : 'bg-cream-50 border border-warm-200 text-charcoal'
                }`}
              >
                <p className="text-xs font-sans tracking-widest uppercase mb-3 text-honey">
                  {offer.label}
                </p>
                <h3 className={`font-serif text-2xl font-medium mb-4 ${offer.featured ? 'text-cream-50' : 'text-charcoal'}`}>
                  {offer.title}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 mb-8 ${offer.featured ? 'text-warm-300' : 'text-warm-500'}`}>
                  {offer.desc}
                </p>
                <Button href={offer.href} variant={offer.featured ? 'primary' : 'ghost'} size="sm">
                  {offer.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTAKE CTA ───────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-text mb-4">Persoonlijke intake</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal mb-6 text-balance">
                Ontdek wat bij jou past — in 5 minuten
              </h2>
              <p className="text-warm-500 text-lg leading-relaxed mb-4">
                De Aylani Intake brengt in kaart hoe jij bent opgebouwd en geeft je
                concrete handvatten voor ritme, energie en voeding die werken in jouw leven.
              </p>
              <p className="text-warm-500 leading-relaxed mb-8">
                Geen vragenlijst. Geen standaard advies. Een persoonlijk gesprek dat
                direct resultaat oplevert — vanuit je kracht, niet vanuit wat er ontbreekt.
              </p>
              <Button href="/intake" size="lg">
                Start de intake
              </Button>
            </div>
            <div className="bg-warm-800 rounded-3xl p-8 text-cream-50 space-y-5">
              {[
                { n: '01', t: 'Persoonlijk gesprek', b: 'Geen vragenlijst. Echte vragen, echte antwoorden.' },
                { n: '02', t: 'Jouw profiel', b: 'Op basis van wat jij vertelt — herkenbaar en direct.' },
                { n: '03', t: 'Concreet eerste stap', b: 'Niet een plan voor later. Eén actie voor vandaag.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-5 pb-5 border-b border-warm-700 last:border-0 last:pb-0">
                  <span className="font-serif text-3xl font-light text-warm-600 flex-shrink-0 leading-none mt-1">{item.n}</span>
                  <div>
                    <p className="text-xs font-sans tracking-widest uppercase text-honey mb-1">{item.t}</p>
                    <p className="text-warm-300 text-sm leading-relaxed">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA MET LANDSCHAPSFOTO ───────────────────────────────── */}
      <section className="relative py-40 overflow-hidden">
        <Image
          src="/images/duinen-water.jpeg"
          alt="Serene duinen met water"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-honey text-xs font-sans tracking-widest uppercase mb-6">
            Klaar voor de volgende stap?
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-white leading-tight mb-6 max-w-2xl mx-auto text-balance">
            Begin vandaag met beter voor jezelf zorgen
          </h2>
          <p className="text-white/65 text-lg max-w-md mx-auto mb-12 leading-relaxed">
            Geen verplichting. Geen hype. Alleen eerlijke begeleiding die past bij jouw leven.
          </p>
          <Button href="/aanbod" size="lg">
            Bekijk het aanbod
          </Button>
          <p className="mt-8 text-white/35 text-xs">
            Aylani is leefstijlbegeleiding en geen vervanging voor medische zorg.
          </p>
        </div>
      </section>
    </>
  )
}
