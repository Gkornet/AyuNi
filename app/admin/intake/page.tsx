import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminIntakePage() {
  const supabase = createServerClient()

  const { data: intakes } = await supabase
    .from('intake_results')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Beheer</p>
        <h1 className="font-serif text-4xl font-light text-charcoal">Intake-resultaten</h1>
        <p className="text-warm-500 text-sm mt-1">{intakes?.length ?? 0} resultaten totaal</p>
      </div>

      <div className="space-y-4">
        {intakes && intakes.length > 0 ? (
          intakes.map((intake) => (
            <div
              key={intake.id}
              className="bg-cream-50 border border-warm-200 rounded-2xl p-6 hover:border-warm-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-serif text-xl font-medium text-charcoal">{intake.profiel_naam}</h2>
                    <span className="text-xs font-sans uppercase tracking-wider text-warm-400 border border-warm-200 px-2 py-0.5 rounded-full">
                      {intake.lang}
                    </span>
                    {!intake.clerk_id && (
                      <span className="text-xs font-sans uppercase tracking-wider text-muted border border-warm-200 px-2 py-0.5 rounded-full">
                        Anoniem
                      </span>
                    )}
                  </div>
                  <p className="text-warm-500 text-sm italic mb-4">&ldquo;{intake.profiel_tagline}&rdquo;</p>
                  <p className="text-warm-500 text-sm leading-relaxed mb-4">{intake.profiel_beschrijving}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {intake.patronen?.map((p: string) => (
                      <span key={p} className="text-xs bg-sage-100 text-sage-dark px-2.5 py-1 rounded-full">{p}</span>
                    ))}
                  </div>

                  <div className="bg-charcoal/5 rounded-xl p-4">
                    <p className="text-xs font-sans tracking-wider uppercase text-muted mb-1">Eerste stap</p>
                    <p className="text-charcoal text-sm leading-relaxed">{intake.eerste_stap}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-warm-400 text-xs">
                    {new Date(intake.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {intake.clerk_id && (
                    <Link
                      href={`/admin/clients/${intake.clerk_id}`}
                      className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200 mt-2 inline-block"
                    >
                      Cliënt →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-cream-50 border border-warm-200 rounded-2xl px-6 py-16 text-center">
            <p className="font-serif text-2xl font-light text-charcoal mb-2">Nog geen intakes</p>
            <p className="text-warm-400 text-sm">Resultaten verschijnen hier zodra iemand de intake afrondt.</p>
          </div>
        )}
      </div>
    </div>
  )
}
