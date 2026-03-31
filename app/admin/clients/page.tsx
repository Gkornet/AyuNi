import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminClientsPage() {
  const supabase = createServerClient()

  const { data: clients } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  // Haal intake-resultaten op om te zien wie er een heeft
  const { data: intakes } = await supabase
    .from('intake_results')
    .select('clerk_id')
    .not('clerk_id', 'is', null)

  const clientsWithIntake = new Set((intakes ?? []).map((i) => i.clerk_id))

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Beheer</p>
        <h1 className="font-serif text-4xl font-light text-charcoal">Cliënten</h1>
        <p className="text-warm-500 text-sm mt-1">{clients?.length ?? 0} geregistreerde cliënten</p>
      </div>

      <div className="bg-cream-50 border border-warm-200 rounded-2xl overflow-hidden">
        {clients && clients.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-200 bg-cream-200">
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Naam</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">E-mail</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Intake</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Aangemeld</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-cream-100 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal text-sm">{client.name ?? '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-warm-500 text-sm">{client.email ?? '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {clientsWithIntake.has(client.clerk_id) ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-sage-100 text-sage-dark px-2.5 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Gedaan
                      </span>
                    ) : (
                      <span className="text-xs text-warm-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-warm-400 text-sm">
                      {new Date(client.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/clients/${client.clerk_id}`}
                      className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200"
                    >
                      Bekijk →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-2xl font-light text-charcoal mb-2">Nog geen cliënten</p>
            <p className="text-warm-400 text-sm">Cliënten verschijnen hier zodra ze een account aanmaken.</p>
          </div>
        )}
      </div>
    </div>
  )
}
