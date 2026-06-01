import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Over Aylani',
  description:
    'Waarom Aylani bestaat, wat we geloven en hoe we werken. Persoonlijke leefstijlbegeleiding met aandacht voor wie je bent.',
}

const values = [
  {
    label: 'Eerlijkheid',
    body: 'Geen miracle cures of holle beloftes. Wat werkt, is gewoon en concreet. Wij zeggen wat is — ook als dat soms betekent dat we langzamer gaan.',
  },
  {
    label: 'Aandacht',
    body: 'Elke persoon is anders. We kijken naar jouw situatie, jouw tempo en jouw doelen. Niet naar een gemiddeld schema.',
  },
  {
    label: 'Eenvoud',
    body: 'Goede begeleiding maakt het leven niet ingewikkelder. We helpen je om dingen eenvoudiger te maken — zodat je ze ook volhoudt.',
  },
  {
    label: 'Continuïteit',
    body: 'Verandering kost tijd. Aylani is er niet voor de sprint, maar voor de lange adem. Voor blijvende gewoontes die bij jou passen.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO MET BOS ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <Image
          src="/images/bos.jpeg"
          alt="Persoon staat stil bij een houten hek in een gouden, zonnig bos"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Donkere overgang van onder — tekst leesbaarheid */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />
        {/* Subtiele linker fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
          <p className="text-honey text-xs font-sans tracking-widest uppercase mb-5">
            Over Aylani
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-white leading-none text-balance max-w-2xl">
            Waarom Aylani{' '}
            <span className="italic text-honey">bestaat</span>
          </h1>
        </div>
      </section>

      {/* ─── VERHAAL ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Tekst — brede kolom */}
            <div className="lg:col-span-7 space-y-7">
              <p className="font-serif text-2xl lg:text-3xl font-light text-charcoal leading-snug text-balance">
                Aylani is ontstaan vanuit een eenvoudige observatie: veel mensen weten wel
                wat beter zou zijn voor hun welzijn — maar het lukt gewoon niet om het te doen.
              </p>
              <div className="w-12 h-px bg-honey" />
              <p className="text-warm-500 text-lg leading-relaxed">
                Niet omdat ze het niet willen. Maar omdat het leven vol is en alles doorgaat.
                Coaches zijn er in overvloed, iedereen doet aan zelfheling en het aanbod loopt
                over — en AI laat het allemaal alleen maar sneller gaan. Wat ontbreekt is niet
                nóg een tip of programma, maar iemand die je écht begrijpt en concreet helpt.
              </p>
              <p className="text-warm-500 text-lg leading-relaxed">
                Aylani is gebouwd op één les uit eigen ervaring: het werkt pas als je het klein
                maakt. Stap voor stap, begrijpelijk, gecontroleerd. Geen generieke adviezen, geen
                zweverige wellness-taal, geen schuldgevoel als je een dag mist. Wel: eerlijke
                begeleiding, praktische tools en een ritme dat bij jou past.
              </p>
            </div>

            {/* Citaat kaart — smalle kolom */}
            <div className="lg:col-span-5">
              <div className="bg-warm-800 rounded-3xl p-8 text-cream-50">
                <p className="text-honey text-xs font-sans tracking-widest uppercase mb-5">
                  De merkbelofte
                </p>
                <p className="font-serif text-xl lg:text-2xl font-light italic leading-snug">
                  &ldquo;Voor wie vol in het leven staat — en er met kleine, concrete stappen meer uit wil halen.&rdquo;
                </p>
                <div className="border-t border-warm-700 mt-7 pt-7">
                  <p className="text-warm-300 text-sm leading-relaxed">
                    Persoonlijk. Praktisch. Duurzaam. We werken met jouw situatie als
                    startpunt en bouwen van daaruit. Stap voor stap, zonder druk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="label-text mb-4">Het team</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal text-balance max-w-xl">
              De mensen achter <span className="italic text-honey">Aylani</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Gert */}
            <div className="bg-cream rounded-3xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/gert_doris_vaderkind.jpg"
                  alt="Gert Kornet"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">Gert Kornet</h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Ondernemer', 'IT', 'Ervaringsdeskundige'].map((tag) => (
                    <span key={tag} className="text-xs font-sans tracking-wider uppercase text-honey border border-honey/30 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-warm-500 leading-relaxed">
                  Als ondernemer in een zittend IT-vak liep Gert tegen zijn eigen grenzen aan.
                  Geen goeroe loste dat op — wél een nuchtere aanpak die hij stap voor stap zelf
                  opbouwde: een coach voor overzicht en reflectie, een scherpe vraag van zijn
                  partner (welk probleem los je op, wat wil je bereiken?), en simpele tools om te
                  meten wat slaap, drinken en beweging écht met hem deden.
                </p>
                <p className="text-warm-500 leading-relaxed mt-4">
                  Wat hem opviel: het is eigenlijk heel simpel, kost weinig tijd en geeft snel
                  resultaat — zolang het bij je past. Hij is een doener, en bouwde Aylani zodat
                  je die aanpak niet zelf bij elkaar hoeft te puzzelen.
                </p>
              </div>
            </div>

            {/* Nikki */}
            <div className="bg-cream rounded-3xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/nikki_klimmen.JPG"
                  alt="Nikki"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">Nikki</h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Gedragswetenschapper', 'Ayurveda specialist', 'Voedingsdeskundige'].map((tag) => (
                    <span key={tag} className="text-xs font-sans tracking-wider uppercase text-honey border border-honey/30 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-warm-500 leading-relaxed">
                  Nikki verbindt gedragswetenschap, Ayurveda en voedingsleer tot een aanpak die
                  écht werkt. Warm en verbindend, met een levenservaring die diep gaat — ze weet
                  wat veerkracht vraagt. Die diepgang vertaalt ze naar voeding en gewoontes die je
                  merkt in je energie en je hoofd.
                </p>
                <p className="text-warm-500 leading-relaxed mt-4">
                  Waar Gert en Nikki elkaar raken: energie en oplossingsgerichtheid. Het kán — en
                  het wordt pas waardevol als je het klein en toepasbaar maakt. Geen poespas,
                  gewoon doen.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── VISIE MET LANDSCHAPSFOTO ─────────────────────────────── */}
      <section className="relative py-36 overflow-hidden">
        <Image
          src="/images/duinen-water.jpeg"
          alt="Wijd duinlandschap met water en lucht"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-honey text-xs font-sans tracking-widest uppercase mb-7">
              Onze visie
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-white leading-tight mb-8 text-balance">
              Rust, energie en ritme zijn geen luxe.{' '}
              <span className="italic text-honey">Ze zijn het fundament.</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              We geloven dat iedereen recht heeft op een leven met meer balans — niet als
              eindbestemming, maar als dagelijkse werkelijkheid. Niet perfect, maar goed
              genoeg om goed te functioneren en gewoon jezelf te zijn.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WAARDEN ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto van klimmen — toont energie, menselijkheid */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/nikki_klimmen.JPG"
                alt="Mensen klimmen met plezier en energie door de natuur"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              {/* Label onderaan foto */}
              <div className="absolute bottom-0 inset-x-0 p-7">
                <p className="text-white/80 text-sm font-sans">
                  Bewegen. Uitdagen. Resultaat zien. Op jouw tempo.
                </p>
              </div>
            </div>

            {/* Waarden */}
            <div>
              <p className="label-text mb-4">Wat we geloven</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-10 text-balance">
                De waarden die ons werk sturen
              </h2>
              <div className="space-y-8">
                {values.map((value, i) => (
                  <div key={value.label} className="flex gap-6 pb-8 border-b border-warm-200 last:border-0 last:pb-0">
                    <span className="font-serif text-4xl font-light text-warm-200 leading-none flex-shrink-0 mt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="label-text mb-2">{value.label}</p>
                      <p className="text-warm-500 leading-relaxed">{value.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="label-text mb-5">Duidelijkheid over wat wij doen</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-8 text-balance">
              Leefstijlbegeleiding — geen medische zorg
            </h2>
            <div className="space-y-5 text-warm-500 leading-relaxed text-lg">
              <p>
                Aylani biedt persoonlijke leefstijlbegeleiding. We helpen je bij het
                opbouwen van gezonde gewoontes, het verminderen van stress, het verbeteren
                van slaap en het vinden van meer ritme in je dag.
              </p>
              <p>
                Wat we <strong className="text-charcoal font-medium">niet</strong> doen:
                medische diagnoses stellen, behandelingen voorschrijven of zorgtrajecten
                begeleiden. Aylani is geen vervanging voor de huisarts, psycholoog of
                andere zorgverlener.
              </p>
              <p>
                Heb je klachten of twijfels over je gezondheid? Ga dan altijd naar je
                huisarts of een gekwalificeerde zorgverlener. Aylani werkt het best{' '}
                <em>naast</em> medische zorg — niet in plaats daarvan.
              </p>
            </div>

            <div className="mt-10 p-6 bg-warm-100 border border-warm-200 rounded-2xl">
              <p className="text-warm-600 text-sm leading-relaxed">
                <strong className="text-charcoal font-medium">Disclaimer:</strong>{' '}
                De informatie en begeleiding via Aylani zijn uitsluitend bedoeld als
                ondersteuning bij een gezonde leefstijl. Niets op dit platform is bedoeld
                als medisch advies, diagnose of behandeling. Raadpleeg bij
                gezondheidsvragen altijd een gekwalificeerde zorgverlener.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-6 text-balance">
            Klaar om kennis te maken?
          </h2>
          <p className="text-warm-500 max-w-md mx-auto mb-10 leading-relaxed">
            Bekijk het aanbod en ontdek wat het beste bij je past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/aanbod" size="lg">Bekijk het aanbod</Button>
            <Button href="/login" variant="ghost" size="lg">Inloggen</Button>
          </div>
        </div>
      </section>
    </>
  )
}
