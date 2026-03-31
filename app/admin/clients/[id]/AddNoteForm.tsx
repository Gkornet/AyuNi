'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddNoteForm({ clientId }: { clientId: string }) {
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSaving(true)
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, body }),
    })
    setBody('')
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 border-b border-warm-200">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Voeg een notitie toe…"
        rows={3}
        className="w-full bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey resize-none transition-all duration-200 mb-3"
      />
      <button
        type="submit"
        disabled={saving || !body.trim()}
        className="px-5 py-2 bg-honey text-white rounded-full text-sm font-sans font-medium hover:bg-honey-dark transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
      >
        {saving ? 'Opslaan…' : 'Notitie toevoegen'}
      </button>
    </form>
  )
}
