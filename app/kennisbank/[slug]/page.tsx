import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = createServerClient()
  const { data } = await supabase.from('articles').select('title').eq('slug', slug).single()
  return { title: data?.title ?? 'Artikel' }
}

export const dynamic = 'force-dynamic'

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = createServerClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <Link
          href="/kennisbank"
          className="text-sm text-warm-400 hover:text-charcoal transition-colors duration-200 mb-10 inline-block"
        >
          ← Kennisbank
        </Link>

        {/* Header */}
        <div className="mb-10">
          {article.category && (
            <p className="text-xs font-sans tracking-wider uppercase text-honey mb-4">
              {article.category}
            </p>
          )}
          <h1 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-4 text-balance">
            {article.title}
          </h1>
          {article.read_time_minutes && (
            <p className="text-warm-400 text-sm">
              {article.read_time_minutes} min leestijd ·{' '}
              {new Date(article.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Body */}
        <div
          className="prose prose-lg prose-warm max-w-none text-warm-600 leading-relaxed"
          style={{
            '--tw-prose-headings': 'var(--color-charcoal)',
            '--tw-prose-body': 'var(--color-warm-600)',
            '--tw-prose-links': 'var(--color-honey)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: article.body ?? '' }}
        />

        {/* CTA */}
        <div className="mt-16 bg-cream-50 border border-warm-200 rounded-2xl p-8 text-center">
          <p className="font-serif text-2xl font-light text-charcoal mb-2">
            Klaar voor een persoonlijk plan?
          </p>
          <p className="text-warm-500 text-sm mb-6 leading-relaxed">
            De intake brengt in kaart hoe jij bent opgebouwd — in 5 minuten.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 px-6 py-3 bg-honey text-white rounded-full text-sm font-sans font-medium hover:bg-honey-dark transition-colors duration-200"
          >
            Start de intake →
          </Link>
        </div>
      </div>
    </div>
  )
}
