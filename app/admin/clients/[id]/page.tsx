import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AddNoteForm from './AddNoteForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createServerClient()

  const [
    { data: profile },
    { data: intake },
    { data: notes },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('clerk_id', id).single(),
    supabase.from('intake_results').select('*').eq('clerk_id', id).order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('client_notes').select('*').eq('client_clerk_id', id).order('created_at', { ascending: false }),
  ])

  if (!profile) notFound()

  return (
    <div className="p-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/admin/clients" className="text-sm text-warm-400 hover:text-charcoal transition-colors duration-200">
          Cliënten
        </Link>
        <span className="text-warm-300">/</span>
        <span className="text-sm text-charcoal font-medium">{profile.name ?? profile.email ?? id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profiel */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-cream-50 border border-warm-200 rounded-2xl p-6">
            <p className="text-xs font-sans tracking-widest uppercase text-muted mb-4">Profiel</p>
            <p className="font-serif text-2xl font-light text-charcoal mb-1">{profile.name ?? '—'}</p>
            <p className="text-warm-500 text-sm mb-4">{profile.email ?? '—'}</p>
            <div className="border-t border-warm-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-warm-400">Rol</span>
                <span className="text-charcoal font-medium capitalize">{profile.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-400">Aangemeld</span>
                <span className="text-charcoal">
                  {new Date(profile.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intake + Notities */}
        <div className="lg:col-span-2 space-y-6">

          {/* Intake-resultaat */}
          {intake ? (
            <div className="bg-charcoal rounded-2xl p-6 text-cream-50">
              <p className="text-xs font-sans tracking-widest uppercase text-honey mb-4">Intake-resultaat</p>
              <h2 className="font-serif text-2xl font-medium text-cream-50 mb-1">{intake.profiel_naam}</h2>
              <p className="text-warm-300 text-sm italic mb-4">&ldquo;{intake.profiel_tagline}&rdquo;</p>
              <p className="text-warm-400 text-sm leading-relaxed mb-5">{intake.profiel_beschrijving}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Patronen</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intake.patronen?.map((p: string) => (
                      <span key={p} className="text-xs bg-warm-700 text-warm-300 px-2.5 py-1 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Routines</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intake.routines?.map((r: string) => (
                      <span key={r} className="text-xs bg-warm-700 text-warm-300 px-2.5 py-1 rounded-full">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Voeding</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intake.voeding?.map((v: string) => (
                      <span key={v} className="text-xs bg-warm-700 text-warm-300 px-2.5 py-1 rounded-full">{v}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-warm-700 mt-5 pt-5">
                <p className="text-xs font-sans tracking-wider uppercase text-honey/70 mb-2">Eerste stap</p>
                <p className="text-warm-300 text-sm leading-relaxed">{intake.eerste_stap}</p>
              </div>
            </div>
          ) : (
            <div className="bg-cream-50 border border-warm-200 rounded-2xl p-6 text-center">
              <p className="text-warm-400 text-sm">Deze cliënt heeft nog geen intake gedaan.</p>
            </div>
          )}

          {/* Notities */}
          <div className="bg-cream-50 border border-warm-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-warm-200">
              <h3 className="font-serif text-lg font-medium text-charcoal">Notities</h3>
            </div>

            <AddNoteForm clientId={id} />

            {notes && notes.length > 0 ? (
              <div className="divide-y divide-warm-100">
                {notes.map((note) => (
                  <div key={note.id} className="px-6 py-4">
                    <p className="text-charcoal text-sm leading-relaxed">{note.body}</p>
                    <p className="text-warm-400 text-xs mt-2">
                      {new Date(note.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-6 text-center">
                <p className="text-warm-400 text-sm">Nog geen notities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
