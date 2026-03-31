import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mijn omgeving',
  description: 'Jouw persoonlijke Aylani-omgeving.',
}

const habitDays = [
  { day: 'Ma', done: true },
  { day: 'Di', done: true },
  { day: 'Wo', done: false },
  { day: 'Do', done: true },
  { day: 'Vr', done: false },
  { day: 'Za', done: false },
  { day: 'Zo', done: false },
]

const kennisbankItems = [
  {
    category: 'Slaap',
    title: 'Waarom je \'s ochtends moe bent — en wat je eraan kunt doen',
    readTime: '4 min',
    href: '#',
  },
  {
    category: 'Energie',
    title: 'De 3-2-1 methode voor meer focus zonder meer koffie',
    readTime: '3 min',
    href: '#',
  },
  {
    category: 'Ritme',
    title: 'Een ochtendritme dat écht werkt als je kinderen hebt',
    readTime: '5 min',
    href: '#',
  },
]

const checkInOptions = [
  { label: 'Uitgerust', value: 4 },
  { label: 'Goed', value: 3 },
  { label: 'Druk', value: 2 },
  { label: 'Moe', value: 1 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-cream pt-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Welcome header */}
        <div className="mb-12">
          <p className="label-text mb-2">Jouw omgeving</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-light text-charcoal">
            Welkom terug{' '}
            <span className="italic text-honey">[naam]</span>
          </h1>
          <p className="text-warm-500 mt-2">
            Hoe staat de dag ervoor?
          </p>
        </div>

        {/* Top grid: Focus + Check-in */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Jouw focus */}
          <div className="lg:col-span-2 bg-charcoal text-cream-50 rounded-3xl p-8">
            <p className="text-xs font-sans tracking-widest uppercase text-honey mb-4">
              Jouw focus deze week
            </p>
            <h2 className="font-serif text-2xl font-light leading-snug mb-5">
              &ldquo;Kies elke dag één ding dat echt telt — de rest volgt vanzelf.&rdquo;
            </h2>
            <div className="border-t border-warm-700 pt-5">
              <p className="text-warm-300 text-sm leading-relaxed mb-4">
                Deze week staat in het teken van <strong className="text-warm-200">slaapritme</strong>.
                Probeer drie ochtenden achter elkaar op hetzelfde tijdstip op te staan, ook in het weekend.
                Noteer hoe je je voelt.
              </p>
              <div className="flex items-center gap-3">
                <span className="bg-honey/20 text-honey-200 text-xs font-medium px-3 py-1 rounded-full">
                  Week 2 van 8
                </span>
                <span className="text-warm-500 text-xs">Gestart op 17 maart</span>
              </div>
            </div>
          </div>

          {/* Check-in */}
          <div className="bg-cream-50 border border-warm-200 rounded-3xl p-7">
            <p className="text-xs font-sans tracking-widest uppercase text-muted mb-5">
              Hoe voel je je vandaag?
            </p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {checkInOptions.map((opt) => (
                <button
                  key={opt.label}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-warm-200 hover:bg-warm-100 hover:border-warm-300 transition-all duration-200 group"
                >
                  <span className="text-sm font-sans text-warm-600 group-hover:text-charcoal transition-colors duration-200">
                    {opt.label}
                  </span>
                  <span className="flex gap-0.5">
                    {[1,2,3,4].map((i) => (
                      <span key={i} className={`w-1.5 h-3 rounded-sm ${i <= opt.value ? 'bg-honey' : 'bg-warm-200'}`} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-warm-400 text-center leading-relaxed">
              Je check-ins helpen ons je begeleiding te verfijnen.
            </p>
          </div>
        </div>

        {/* Second row: Ritme + Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Jouw ritme */}
          <div className="bg-cream-50 border border-warm-200 rounded-3xl p-7">
            <p className="text-xs font-sans tracking-widest uppercase text-muted mb-5">
              Jouw ritme — deze week
            </p>
            <div className="flex gap-2 mb-5">
              {habitDays.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-warm-400 font-sans">{d.day}</span>
                  <div
                    className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                      d.done
                        ? 'bg-sage-100 border border-sage-200'
                        : 'bg-cream-200 border border-warm-200'
                    }`}
                  >
                    {d.done ? (
                      <svg className="w-3 h-3 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-warm-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-warm-400 leading-relaxed">
              3 van 7 dagen afgerond. Je bent goed op weg.
            </p>
          </div>

          {/* Quick actions */}
          <div className="lg:col-span-2 bg-gradient-sage rounded-3xl p-7">
            <p className="text-xs font-sans tracking-widest uppercase text-sage-dark mb-5">
              Snelle acties
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Plan je dag in', icon: '📋', desc: 'Wat moet er vandaag echt af?' },
                { label: 'Vijf minuten pauze', icon: '⏱️', desc: 'Even weg van het scherm' },
                { label: 'Schrijf op wat er speelt', icon: '✏️', desc: 'Hoofd leegmaken op papier' },
                { label: 'Boek een sessie', icon: '📅', desc: 'Plan je volgende check-in' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-start gap-4 p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-sage-100 transition-all duration-200 text-left group"
                >
                  <span className="text-xl mt-0.5">{action.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal group-hover:text-honey transition-colors duration-200">
                      {action.label}
                    </p>
                    <p className="text-xs text-warm-500 mt-0.5">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kennisbank */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label-text mb-1">Kennisbank</p>
              <h2 className="font-serif text-2xl font-light text-charcoal">
                Aanbevolen voor jou
              </h2>
            </div>
            <Link
              href="/kennisbank"
              className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200"
            >
              Alles bekijken →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {kennisbankItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="bg-cream-50 border border-warm-200 rounded-2xl p-6 hover:border-warm-300 hover:shadow-sm transition-all duration-200 group"
              >
                <p className="text-xs font-sans tracking-wider uppercase text-honey mb-3">
                  {item.category}
                </p>
                <h3 className="font-serif text-lg font-medium text-charcoal leading-snug mb-4 group-hover:text-honey transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-warm-400">{item.readTime} leestijd</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Upgrade nudge */}
        <div className="bg-honey-50 border border-honey-100 rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="label-text mb-1">Upgrade je begeleiding</p>
            <p className="font-serif text-xl font-light text-charcoal">
              Wil je meer persoonlijke aandacht?
            </p>
            <p className="text-warm-500 text-sm mt-1 leading-relaxed">
              Schakel over naar begeleiding met persoonlijke check-ins en een plan op maat.
            </p>
          </div>
          <Button href="/aanbod" variant="outline" size="sm" className="flex-shrink-0">
            Bekijk opties
          </Button>
        </div>

        {/* Placeholder note */}
        <div className="mt-8 bg-warm-100 border border-warm-200 rounded-2xl px-5 py-4">
          <p className="text-xs text-warm-500 text-center leading-relaxed">
            <span className="font-medium text-warm-600">Dashboard v1:</span>{' '}
            In volgende versies worden check-ins opgeslagen, wordt de ritme-tracker live, en
            wordt de kennisbank dynamisch gevuld. Auth via NextAuth.js of Clerk volgt binnenkort.
          </p>
        </div>

      </div>
    </div>
  )
}
