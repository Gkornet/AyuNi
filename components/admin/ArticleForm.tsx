'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TipTapEditor from './TipTapEditor'
import type { Article } from '@/lib/supabase'

const categories = ['Slaap', 'Energie', 'Ritme', 'Voeding', 'Herstel', 'Mindset']

interface Props {
  article?: Article
}

export default function ArticleForm({ article }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: article?.title ?? '',
    category: article?.category ?? '',
    read_time_minutes: article?.read_time_minutes ?? 3,
    body: article?.body ?? '',
    published: article?.published ?? false,
  })

  function update(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) {
      setError('Voeg een titel toe.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      published: publish !== undefined ? publish : form.published,
    }

    const url = article ? `/api/articles/${article.id}` : '/api/articles'
    const method = article ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/content')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Er ging iets mis.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Titel */}
      <div>
        <label className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600 mb-2">
          Titel
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Titel van het artikel"
          className="w-full bg-cream-50 border border-warm-200 rounded-xl px-4 py-3 text-charcoal placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey transition-all duration-200 font-serif text-xl"
        />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600 mb-2">
            Categorie
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full bg-cream-50 border border-warm-200 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey transition-all duration-200 text-sm"
          >
            <option value="">Kies categorie</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600 mb-2">
            Leestijd (minuten)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.read_time_minutes}
            onChange={(e) => update('read_time_minutes', parseInt(e.target.value))}
            className="w-full bg-cream-50 border border-warm-200 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600 mb-2">
          Inhoud
        </label>
        <TipTapEditor
          content={form.body}
          onChange={(html) => update('body', html)}
          placeholder="Begin met schrijven…"
        />
      </div>

      {/* Acties */}
      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-5 py-2.5 bg-cream-50 border border-warm-200 text-charcoal rounded-full text-sm font-sans font-medium hover:border-warm-300 transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? 'Opslaan…' : 'Als concept opslaan'}
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-5 py-2.5 bg-honey text-white rounded-full text-sm font-sans font-medium hover:bg-honey-dark transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? 'Publiceren…' : 'Publiceren'}
          </button>
        </div>
        {article && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm('Artikel verwijderen?')) return
              await fetch(`/api/articles/${article.id}`, { method: 'DELETE' })
              router.push('/admin/content')
              router.refresh()
            }}
            className="text-sm text-red-400 hover:text-red-600 transition-colors duration-200"
          >
            Verwijderen
          </button>
        )}
      </div>
    </div>
  )
}
