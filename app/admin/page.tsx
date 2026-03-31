import { createServerClient } from '@/lib/supabase'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function AdminOverviewPage() {
  const user = await currentUser()
  const supabase = createServerClient()

  // Statistieken ophalen
  const [
    { count: clientCount },
    { count: intakeCount },
    { count: articleCount },
    { data: recentIntakes },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    supabase.from('intake_results').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('intake_results').select('profiel_naam, profiel_tagline, created_at, lang').order('created_at', { ascending: false }).limit(5),
  ])

  const firstName = user?.firstName ?? 'beheerder'

  const stats = [
    { label: 'Cliënten', value: clientCount ?? 0, href: '/admin/clients', color: 'text-honey' },
    { label: 'Intake-resultaten', value: intakeCount ?? 0, href: '/admin/intake', color: 'text-sage' },
    { label: 'Gepubliceerde artikelen', value: articleCount ?? 0, href: '/admin/content', color: 'text-warm-600' },
  ]

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Beheer</p>
        <h1 className="font-serif text-4xl font-light text-charcoal">
          Goedemorgen, <span className="italic text-honey">{firstName}</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-cream-50 border border-warm-200 rounded-2xl p-6 hover:border-warm-300 hover:shadow-sm transition-all duration-200 group"
          >
            <p className={`font-serif text-5xl font-light mb-2 ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm text-warm-500 font-sans group-hover:text-charcoal transition-colors duration-200">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recente intakes */}
      <div className="bg-cream-50 border border-warm-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200">
          <h2 className="font-serif text-lg font-medium text-charcoal">Recente intakes</h2>
          <Link href="/admin/intake" className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200">
            Alle bekijken →
          </Link>
        </div>
        {recentIntakes && recentIntakes.length > 0 ? (
          <div className="divide-y divide-warm-100">
            {recentIntakes.map((intake, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-charcoal text-sm">{intake.profiel_naam}</p>
                  <p className="text-warm-400 text-xs mt-0.5 italic">{intake.profiel_tagline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-warm-400 font-sans uppercase tracking-wider">
                    {intake.lang}
                  </span>
                  <span className="text-xs text-warm-400">
                    {new Date(intake.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="text-warm-400 text-sm">Nog geen intake-resultaten.</p>
          </div>
        )}
      </div>

      {/* Snelle acties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link
          href="/admin/content/new"
          className="flex items-center gap-4 bg-sage-100 border border-sage-200 rounded-2xl p-5 hover:bg-sage-100/80 transition-all duration-200 group"
        >
          <span className="text-2xl">✏️</span>
          <div>
            <p className="font-medium text-charcoal text-sm group-hover:text-honey transition-colors duration-200">Nieuw artikel schrijven</p>
            <p className="text-xs text-warm-500 mt-0.5">Kennisbank uitbreiden</p>
          </div>
        </Link>
        <Link
          href="/admin/clients"
          className="flex items-center gap-4 bg-cream-50 border border-warm-200 rounded-2xl p-5 hover:border-warm-300 transition-all duration-200 group"
        >
          <span className="text-2xl">👤</span>
          <div>
            <p className="font-medium text-charcoal text-sm group-hover:text-honey transition-colors duration-200">Cliënten bekijken</p>
            <p className="text-xs text-warm-500 mt-0.5">Profielen en notities</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
