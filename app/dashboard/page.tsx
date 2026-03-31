import type { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mijn omgeving',
  description: 'Jouw persoonlijke Aylani-omgeving.',
}

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

  return (
    <div className="min-h-screen bg-cream pt-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Welcome header */}
        <div className="mb-12">
          <p className="label-text mb-2">Jouw omgeving</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-light text-charcoal">
            Welkom terug{' '}
            <span className="italic text-honey">{firstName}</span>
          </h1>
          <p className="text-warm-500 mt-2">Hoe staat de dag ervoor?</p>
        </div>

        {/* Intake-profiel of CTA */}
        {intake ? (
          <div className="bg-charcoal text-cream-50 rounded-3xl p-8 mb-8">
            <p className="text-xs font-sans tracking-widest uppercase text-honey mb-4">Jouw profiel</p>
            <h2 className="font-serif text-3xl font-medium text-cream-50 mb-1">{intake.profiel_naam}</h2>
            <p className="text-warm-300 italic mb-5">&ldquo;{intake.profiel_tagline}&rdquo;</p>
            <p className="text-warm-400 text-sm leading-relaxed mb-6 max-w-2xl">{intake.profiel_beschrijving}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(intake.patronen as string[])?.map((p) => (
                <span key={p} className="text-xs bg-warm-700 text-warm-300 px-3 py-1 rounded-full">{p}</span>
              ))}
            </div>
            <div className="border-t border-warm-700 pt-5">
              <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Jouw eerste stap</p>
              <p className="text-warm-300 text-sm leading-relaxed">{intake.eerste_stap}</p>
            </div>
          </div>
        ) : (
          <div className="bg-honey-50 border border-honey-100 rounded-3xl p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="label-text mb-1">Jouw profiel</p>
              <p className="font-serif text-2xl font-light text-charcoal">
                Doe de intake en ontdek jouw leefstijlprofiel
              </p>
              <p className="text-warm-500 text-sm mt-1 leading-relaxed">
                5 minuten. Persoonlijk gesprek. Concreet resultaat.
              </p>
            </div>
            <Button href="/intake" size="sm" className="flex-shrink-0">
              Start de intake →
            </Button>
          </div>
        )}

        {/* Kennisbank */}
        {articles && articles.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="label-text mb-1">Kennisbank</p>
                <h2 className="font-serif text-2xl font-light text-charcoal">Aanbevolen voor jou</h2>
              </div>
              <Link href="/kennisbank" className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200">
                Alles bekijken →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/kennisbank/${article.slug}`}
                  className="bg-cream-50 border border-warm-200 rounded-2xl p-6 hover:border-warm-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <p className="text-xs font-sans tracking-wider uppercase text-honey mb-3">{article.category}</p>
                  <h3 className="font-serif text-lg font-medium text-charcoal leading-snug mb-4 group-hover:text-honey transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-xs text-warm-400">{article.read_time_minutes} min leestijd</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upgrade nudge */}
        <div className="bg-honey-50 border border-honey-100 rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="label-text mb-1">Upgrade je begeleiding</p>
            <p className="font-serif text-xl font-light text-charcoal">Wil je meer persoonlijke aandacht?</p>
            <p className="text-warm-500 text-sm mt-1 leading-relaxed">
              Schakel over naar begeleiding met persoonlijke check-ins en een plan op maat.
            </p>
          </div>
          <Button href="/aanbod" variant="outline" size="sm" className="flex-shrink-0">
            Bekijk opties
          </Button>
        </div>

      </div>
    </div>
  )
}
