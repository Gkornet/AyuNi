import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Praktische artikelen over slaap, energie, ritme en voeding.',
}

export const dynamic = 'force-dynamic'

export default async function KennisbankPage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id, slug, title, category, read_time_minutes, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const categories = [...new Set(articles?.map((a) => a.category).filter(Boolean))]

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="label-text mb-4">Kennisbank</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-charcoal text-balance">
            Kennis die <span className="italic text-honey">werkt</span>
          </h1>
          <p className="text-warm-500 mt-4 max-w-xl leading-relaxed">
            Praktische inzichten over slaap, energie, ritme en voeding.
            Geen hype — wat echt werkt.
          </p>
        </div>

        {/* Categoriefilter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-sans uppercase tracking-wider text-honey border border-honey/30 px-3 py-1.5 rounded-full hover:bg-honey/5 transition-colors duration-200 cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Artikelen */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/kennisbank/${article.slug}`}
                className="bg-cream-50 border border-warm-200 rounded-2xl p-6 hover:border-warm-300 hover:shadow-sm transition-all duration-200 group"
              >
                <p className="text-xs font-sans tracking-wider uppercase text-honey mb-3">
                  {article.category}
                </p>
                <h2 className="font-serif text-xl font-medium text-charcoal leading-snug mb-4 group-hover:text-honey transition-colors duration-200">
                  {article.title}
                </h2>
                <p className="text-xs text-warm-400">
                  {article.read_time_minutes ? `${article.read_time_minutes} min leestijd` : ''}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-3xl font-light text-charcoal mb-3">Artikelen komen eraan</p>
            <p className="text-warm-400 leading-relaxed max-w-sm mx-auto">
              De kennisbank wordt binnenkort gevuld met praktische inzichten.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
