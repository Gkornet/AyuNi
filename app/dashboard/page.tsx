import type { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mijn omgeving',
  description: 'Jouw persoonlijke Aylani-omgeving.',
}

const quickLinks = [
  { href: '/intake', label: 'De intake', sub: 'Ken jezelf in 5 min' },
  { href: '/kennisbank', label: 'Kennisbank', sub: 'Artikelen & tips' },
  { href: '/aanbod', label: 'Membership', sub: 'De volledige bibliotheek' },
  { href: '/about', label: 'Over Aylani', sub: 'Verhaal & aanpak' },
]

export default async function DashboardPage() {
  const user = await currentUser()
  const supabase = createServerClient()

  // Meest recente intake van deze gebruiker
  const { data: intake } = await supabase
    .from('intake_results')
    .select('*')
    .eq('clerk_id', user?.id ?? '')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Gepubliceerde artikelen voor kennisbank-sectie
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title, category, read_time_minutes')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const firstName = user?.firstName ?? 'daar'
  const vandaag = new Date().toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-screen bg-cream pt-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Welcome header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="label-text mb-2">Jouw omgeving</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-light text-charcoal">
              Welkom terug{' '}
              <span className="italic text-honey">{firstName}</span>
            </h1>
          </div>
          <p className="text-warm-400 text-sm first-letter:uppercase">{vandaag}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── HOOFDKOLOM ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Focus voor vandaag — de doener/energie-laag (sage) */}
            {intake?.eerste_stap ? (
              <div className="bg-sage-50 border border-sage-100 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <p className="text-xs font-sans tracking-widest uppercase text-sage-dark">
                    Focus voor vandaag
                  </p>
                </div>
                <p className="font-serif text-2xl font-light text-charcoal leading-snug">
                  {intake.eerste_stap}
                </p>
                <p className="text-warm-500 text-sm mt-4 leading-relaxed">
                  Eén kleine stap. Klein, dichtbij jezelf — gewoon doen.
                </p>
              </div>
            ) : (
              <div className="bg-sage-50 border border-sage-100 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <p className="text-xs font-sans tracking-widest uppercase text-sage-dark">
                      Begin hier
                    </p>
                  </div>
                  <p className="font-serif text-2xl font-light text-charcoal leading-snug">
                    Doe de intake en ontdek jouw leefstijlprofiel
                  </p>
                  <p className="text-warm-500 text-sm mt-2 leading-relaxed">
                    5 minuten. Persoonlijk gesprek. Eén concrete eerste stap.
                  </p>
                </div>
                <Button href="/intake" size="sm" className="flex-shrink-0">
                  Start de intake →
                </Button>
              </div>
            )}

            {/* Profiel — de rust/diepte (charcoal) */}
            {intake && (
              <div className="bg-charcoal text-cream-50 rounded-3xl p-8">
                <p className="text-xs font-sans tracking-widest uppercase text-honey mb-4">Jouw profiel</p>
                <h2 className="font-serif text-3xl font-medium text-cream-50 mb-1">{intake.profiel_naam}</h2>
                <p className="text-warm-300 italic mb-5">&ldquo;{intake.profiel_tagline}&rdquo;</p>
                <p className="text-warm-400 text-sm leading-relaxed mb-6 max-w-2xl">{intake.profiel_beschrijving}</p>
                <div className="flex flex-wrap gap-2">
                  {(intake.patronen as string[])?.map((p) => (
                    <span key={p} className="text-xs bg-warm-700 text-warm-300 px-3 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Kennisbank */}
            {articles && articles.length > 0 && (
              <div className="bg-cream-50 border border-warm-200 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="label-text mb-1">Kennisbank</p>
                    <h2 className="font-serif text-2xl font-light text-charcoal">Aanbevolen voor jou</h2>
                  </div>
                  <Link href="/kennisbank" className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200">
                    Alles bekijken →
                  </Link>
                </div>
                <div className="space-y-3">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/kennisbank/${article.slug}`}
                      className="flex items-center justify-between gap-4 bg-cream border border-warm-200 rounded-2xl px-5 py-4 hover:border-warm-300 hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-sans tracking-wider uppercase text-honey mb-1">{article.category}</p>
                        <h3 className="font-serif text-lg font-medium text-charcoal leading-snug truncate group-hover:text-honey transition-colors duration-200">
                          {article.title}
                        </h3>
                      </div>
                      <span className="text-xs text-warm-400 whitespace-nowrap flex-shrink-0">{article.read_time_minutes} min</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── ZIJKOLOM ───────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Snel naar — app-achtige navigatie */}
            <div className="bg-cream-50 border border-warm-200 rounded-3xl p-6">
              <p className="label-text mb-4">Snel naar</p>
              <nav className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-cream transition-colors duration-200 group"
                  >
                    <div>
                      <p className="text-sm font-medium text-charcoal group-hover:text-honey transition-colors duration-200">{link.label}</p>
                      <p className="text-xs text-warm-400">{link.sub}</p>
                    </div>
                    <span className="text-warm-300 group-hover:text-honey transition-colors duration-200">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Membership nudge */}
            <div className="bg-honey-50 border border-honey-100 rounded-3xl p-6">
              <p className="label-text mb-1">Aylani Membership</p>
              <p className="font-serif text-xl font-light text-charcoal mb-2">Wil je de volledige bibliotheek?</p>
              <p className="text-warm-500 text-sm mb-5 leading-relaxed">
                Word lid en krijg toegang tot alle artikelen, programma&#39;s en elke maand nieuwe content.
              </p>
              <Button href="/aanbod" variant="outline" size="sm">
                Bekijk het membership
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
