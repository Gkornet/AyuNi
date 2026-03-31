import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Aanbod',
  description:
    'Van gratis kennis tot intensieve begeleiding. Ontdek wat bij jou past.',
}

const freeItems = [
  'Praktische artikelen over slaap, energie en dagritme',
  'Korte oefeningen voor meer rust in je dag',
  'Tips die je direct kunt toepassen',
  'Inzichten over leefstijl zonder de hype',
]

const tiers = [
  {
    id: 'instap',
    badge: 'Instap',
    name: 'Zelfstandig starten',
    price: '€ 47',
    period: 'per maand',
    tagline: 'Voor wie zelf aan de slag wil met duidelijke begeleiding.',
    description:
      'Een gestructureerde start met een persoonlijk plan, wekelijkse focuspunten en toegang tot de volledige kennisbank. Je werkt op je eigen tempo, met de tools van Aylani als kompas.',
    features: [
      'Persoonlijk startplan gebaseerd op jouw situatie',
      'Toegang tot de volledige kennisbank',
      'Wekelijkse focuspunten en micro-oefeningen',
      'Maandelijkse check-in via het platform',
      'Voortgang bijhouden in je persoonlijke dashboard',
    ],
    cta: 'Begin met instap',
    featured: false,
    note: null,
  },
  {
    id: 'begeleiding',
    badge: 'Begeleiding',
    name: 'Persoonlijk traject',
    price: '€ 147',
    period: 'per maand',
    tagline: 'Voor wie écht resultaat wil en begeleiding op maat zoekt.',
    description:
      'Intensievere ondersteuning met regelmatige 1-op-1 contactmomenten, een plan dat meebeweegt met jouw leven en directe feedback. Je staat er niet alleen voor.',
    features: [
      'Alles van het instapplan',
      '2x per maand 1-op-1 videocall (45 min)',
      'Persoonlijk actieplan met wekelijkse aanpassingen',
      'Directe berichtenmogelijkheid via het platform',
      'Prioritaire reactietijd',
      'Kwartaalreview met voortgangsrapport',
    ],
    cta: 'Start begeleiding',
    featured: true,
    note: 'Meest gekozen',
  },
  {
    id: 'premium',
    badge: 'Premium',
    name: 'Intensief traject',
    price: 'Op aanvraag',
    period: null,
    tagline: 'Voor wie dieper wil gaan en maximale aandacht wil.',
    description:
      'Volledige 1-op-1 begeleiding met wekelijkse sessies, realtime ondersteuning en een plan dat volledig om jou gebouwd is. Voor mensen in transitie of met complexere vragen.',
    features: [
      'Alles van het begeleidingsplan',
      'Wekelijkse 1-op-1 videocall (60 min)',
      'Onbeperkte berichtenmogelijkheid',
      'Dagelijkse check-in mogelijkheid',
      'Prioritaire aandacht en snelle respons',
      'Persoonlijke intake en afsluiting',
      'Toegang tot exclusieve materialen',
    ],
    cta: 'Plan een gesprek',
    featured: false,
    note: 'Beperkte plekken',
  },
]

const faqs = [
  {
    q: 'Is Aylani geschikt voor mensen zonder leefstijlervaring?',
    a: "Ja. Aylani is juist bedoeld voor mensen die willen beginnen of opnieuw willen beginnen. Je hoeft geen ervaring te hebben met coaching of welzijnsprogramma's.",
  },
  {
    q: 'Wat is het verschil tussen leefstijlbegeleiding en therapie?',
    a: 'Leefstijlbegeleiding richt zich op praktische gewoontes en dagelijkse patronen. Therapie gaat dieper in op psychologische processen. Aylani is geen therapie en geen vervanging voor medische zorg.',
  },
  {
    q: 'Kan ik stoppen wanneer ik wil?',
    a: 'Ja. Maandelijkse abonnementen zijn maandelijks opzegbaar. Voor trajecten gelden specifieke afspraken die vooraf worden besproken.',
  },
  {
    q: 'Hoe snel merk ik verschil?',
    a: 'Dat verschilt per persoon. Veel mensen merken al na een paar weken verschil in focus en energie. Duurzame verandering kost tijd — en dat is juist het uitgangspunt van Aylani.',
  },
]

export default function AanbodPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Subtiele foto rechtsboven als sfeeraccent */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <Image
            src="/images/hangmat.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-cream/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="label-text mb-6">Het aanbod</p>
            <h1 className="font-serif text-5xl lg:text-7xl font-light text-charcoal leading-none mb-8 text-balance">
              Begin waar<br />
              <span className="italic text-honey">jij staat</span>
            </h1>
            <p className="text-warm-500 text-lg leading-relaxed">
              Van gratis kennis tot intensieve persoonlijke begeleiding.
              Er is een plek voor je, wat je situatie ook is.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GRATIS ───────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-text mb-4">Gratis beginnen</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-5 text-balance">
                Kennisbank & inspiratie
              </h2>
              <p className="text-warm-500 leading-relaxed mb-8">
                Wil je eerst verkennen wat Aylani voor je kan betekenen? Begin met de
                gratis kennisbank. Praktisch, direct toepasbaar en zonder bullshit.
              </p>
              <ul className="space-y-3 mb-8">
                {freeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-warm-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Button href="/dashboard" variant="outline">
                Bekijk de kennisbank
              </Button>
            </div>

            {/* Sfeerkaart gratis */}
            <div className="relative rounded-3xl overflow-hidden h-72 lg:h-80">
              <Image
                src="/images/bos.jpeg"
                alt="Rust en ruimte in de natuur"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8">
                <p className="font-serif text-3xl font-light text-white mb-1">Gratis</p>
                <p className="text-white/65 text-sm">Altijd toegankelijk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTAKE ───────────────────────────────────────────────── */}
      <section className="py-24 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Tekst */}
            <div>
              <p className="label-text mb-4">Stap 0 — Gratis</p>
              <h2 className="font-serif text-3xl lg:text-5xl font-light text-charcoal mb-6 text-balance">
                Weet wat bij jou past —<br />
                <span className="italic text-honey">in 5 minuten</span>
              </h2>
              <p className="text-warm-500 leading-relaxed mb-6">
                Voordat je kiest, leer je jezelf eerst scherper kennen. De Aylani-intake
                is een persoonlijk gesprek dat jouw energiepatroon, ritme en sterke punten
                in kaart brengt. Geen vragenlijst — een echte conversatie.
              </p>
              <p className="text-warm-500 leading-relaxed mb-10">
                Het resultaat: een concreet profiel met inzichten en een eerste stap die
                jij vandaag nog kunt zetten. Helemaal gratis.
              </p>

              {/* Hoe het werkt */}
              <div className="space-y-5 mb-10">
                {[
                  {
                    step: '01',
                    title: 'Vertel hoe jij in je dag staat',
                    desc: 'De coach stelt je gerichte vragen over energie, slaap, stress en ritme.',
                  },
                  {
                    step: '02',
                    title: 'De coach luistert en past aan',
                    desc: 'Geen script. Elke vraag volgt op wat jij zegt — compact en to the point.',
                  },
                  {
                    step: '03',
                    title: 'Ontvang je persoonlijk profiel',
                    desc: 'Concreet, herkenbaar en met een eerste stap die bij jou past.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-5">
                    <span className="font-serif text-3xl font-light text-honey/50 leading-none mt-0.5 w-8 flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-medium text-charcoal text-sm mb-1">{item.title}</p>
                      <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button href="/intake" size="lg">
                Start de intake →
              </Button>
            </div>

            {/* Profiel-preview kaart */}
            <div className="relative">
              <div className="bg-charcoal rounded-3xl p-8 text-cream-50 relative overflow-hidden">
                {/* Decoratief element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-honey/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                <p className="text-xs font-sans tracking-widest uppercase text-honey mb-6">
                  Voorbeeld profiel
                </p>
                <h3 className="font-serif text-2xl font-medium text-cream-50 mb-2">
                  Stille Doorzetter
                </h3>
                <p className="text-warm-300 text-sm italic mb-5">
                  &ldquo;Levert sterk werk — maar laadt op in stilte, niet in drukte.&rdquo;
                </p>
                <p className="text-warm-400 text-sm leading-relaxed mb-7">
                  Je werkt gedisciplineerd en haalt veel uit jezelf. Je energie piekt in de
                  ochtend en daalt scherp na een volle sociale dag. Je beste dag begint
                  rustig en eindigt bewust.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Patronen</p>
                    <div className="flex flex-wrap gap-2">
                      {['Ochtendfocus', 'Sociale energiedip', 'Structuurzoeker'].map((tag) => (
                        <span key={tag} className="text-xs bg-warm-700 text-warm-300 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-warm-700 pt-4">
                    <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Eerste stap</p>
                    <p className="text-warm-300 text-sm leading-relaxed">
                      Plan morgen één blok van 20 minuten voor jezelf — vóór 9 uur, zonder agenda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtiele schaduw / diepte */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-charcoal/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BETAALDE TIERS ───────────────────────────────────────── */}
      <section className="py-24 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="label-text mb-4">Begeleiding</p>
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-charcoal text-balance">
              Kies wat bij jou past
            </h2>
            <p className="text-warm-500 mt-4 leading-relaxed">
              Alle plannen zijn maandelijks opzegbaar. Geen verborgen kosten.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col relative ${
                  tier.featured
                    ? 'bg-charcoal text-cream-50 ring-2 ring-honey'
                    : 'bg-cream-50 border border-warm-200'
                }`}
              >
                {tier.note && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-honey text-white text-xs font-medium font-sans tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                      {tier.note}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-sans tracking-widest uppercase mb-2 text-honey">
                    {tier.badge}
                  </p>
                  <h3 className={`font-serif text-2xl font-medium mb-3 ${tier.featured ? 'text-cream-50' : 'text-charcoal'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${tier.featured ? 'text-warm-300' : 'text-warm-500'}`}>
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-6">
                  <span className={`font-serif text-4xl font-light ${tier.featured ? 'text-cream-50' : 'text-charcoal'}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className={`text-sm ml-2 ${tier.featured ? 'text-warm-400' : 'text-muted'}`}>
                      {tier.period}
                    </span>
                  )}
                </div>

                <div className={`border-t mb-6 ${tier.featured ? 'border-warm-700' : 'border-warm-200'}`} />

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex-shrink-0 ${tier.featured ? 'text-honey' : 'text-sage'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className={`text-sm leading-relaxed ${tier.featured ? 'text-warm-300' : 'text-warm-500'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button href="/login" variant={tier.featured ? 'primary' : 'ghost'}>
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-warm-400 text-xs mt-8 max-w-lg mx-auto">
            Aylani is leefstijlbegeleiding en geen vervanging voor medische zorg of behandeling.
            Bij gezondheidsvragen raden we altijd aan eerst een arts te raadplegen.
          </p>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="label-text mb-4">Vragen</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-12 text-balance">
              Veelgestelde vragen
            </h2>
            <div className="space-y-8">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-warm-200 pb-8 last:border-0 last:pb-0">
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-warm-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-36 overflow-hidden">
        <Image
          src="/images/zandpad.jpeg"
          alt="Open pad in de natuur"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-5xl font-light text-white mb-6 text-balance">
            Nog niet zeker? Begin gewoon gratis.
          </h2>
          <p className="text-white/65 max-w-md mx-auto mb-10 leading-relaxed">
            Maak een gratis account aan, verken de kennisbank en kijk of Aylani bij je past.
          </p>
          <Button href="/login" size="lg">
            Maak gratis een account
          </Button>
        </div>
      </section>
    </>
  )
}
