import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminContentPage() {
  const supabase = createServerClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('id, slug, title, category, published, read_time_minutes, created_at, updated_at')
    .order('updated_at', { ascending: false })

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Beheer</p>
          <h1 className="font-serif text-4xl font-light text-charcoal">Kennisbank</h1>
          <p className="text-warm-500 text-sm mt-1">{articles?.length ?? 0} artikelen</p>
        </div>
        <Link
          href="/admin/content/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-honey text-white rounded-full text-sm font-sans font-medium hover:bg-honey-dark transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nieuw artikel
        </Link>
      </div>

      <div className="bg-cream-50 border border-warm-200 rounded-2xl overflow-hidden">
        {articles && articles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-200 bg-cream-200">
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Titel</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Categorie</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Status</th>
                <th className="text-left px-6 py-3 text-xs font-sans font-medium tracking-wider uppercase text-muted">Bijgewerkt</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-cream-100 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal text-sm">{article.title}</p>
                    {article.read_time_minutes && (
                      <p className="text-warm-400 text-xs mt-0.5">{article.read_time_minutes} min leestijd</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-honey font-sans uppercase tracking-wider">
                      {article.category ?? '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {article.published ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-sage-100 text-sage-dark px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-sage rounded-full" />
                        Gepubliceerd
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-warm-100 text-warm-500 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-warm-400 rounded-full" />
                        Concept
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-warm-400 text-sm">
                      {new Date(article.updated_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/${article.id}`}
                      className="text-sm text-honey hover:text-honey-dark font-medium transition-colors duration-200"
                    >
                      Bewerken →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-2xl font-light text-charcoal mb-2">Nog geen artikelen</p>
            <p className="text-warm-400 text-sm mb-6">Schrijf je eerste kennisbank-artikel.</p>
            <Link
              href="/admin/content/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-honey text-white rounded-full text-sm font-sans font-medium hover:bg-honey-dark transition-colors duration-200"
            >
              Begin met schrijven
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
