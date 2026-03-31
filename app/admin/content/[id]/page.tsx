import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const supabase = createServerClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) notFound()

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-sans tracking-widest uppercase text-muted mb-2">Kennisbank</p>
        <h1 className="font-serif text-4xl font-light text-charcoal">Artikel bewerken</h1>
      </div>
      <ArticleForm article={article} />
    </div>
  )
}
