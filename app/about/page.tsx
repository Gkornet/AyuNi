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
      <section className="relative h-[90vh] flex items-end overflow-hidden">
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
                Niet omdat ze het niet willen. Maar omdat het leven druk is. We leven in
                een tijd van eindeloze informatie. Er is geen tekort aan tips, hacks en
                programma&#39;s. Maar drukke ouders en professionals hebben geen behoefte aan
                meer content. Ze hebben behoefte aan iemand die hen écht begrijpt — en
                concreet helpt.
              </p>
              <p className="text-warm-500 text-lg leading-relaxed">
                Aylani is gebouwd op dat principe. Geen generieke adviezen. Geen zweverige
                wellness-taal. Geen schuldgevoel als je een dag mist. Wel: eerlijke
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
                  &ldquo;Voor mensen die veel dragen en ook weer goed voor zichzelf willen leren zorgen.&rdquo;
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
