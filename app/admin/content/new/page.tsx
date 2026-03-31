import ArticleForm from '@/components/admin/ArticleForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nieuw artikel' }

export default function NewArticlePage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Kennisbank</p>
        <h1 className="font-serif text-4xl font-light text-charcoal">Nieuw artikel</h1>
      </div>
      <ArticleForm />
    </div>
  )
}
