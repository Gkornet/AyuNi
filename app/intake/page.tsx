'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = 'nl' | 'en'
type Phase = 'intro' | 'chat' | 'result'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface IntakeResult {
  profiel_naam: string
  profiel_tagline: string
  profiel_beschrijving: string
  patronen: string[]
  routines: string[]
  voeding: string[]
  eerste_stap: string
}

// ─── Copy ─────────────────────────────────────────────────────────────────────
const T = {
  nl: {
    label: 'Aylani Intake',
    title: 'Blijf in',
    titleEm: 'je kracht.',
    body: 'Je draagt veel en je doet het goed.',
    bodyStrong: 'Juist daarom is dit het moment om te investeren.',
    bodyRest: ' De Aylani Intake brengt in kaart hoe jij bent opgebouwd — en geeft je concrete handvatten voor ritme, energie en voeding die werken in jouw leven.',
    meta: 'Persoonlijk gesprek · Geen vragenlijst · 5 minuten',
    start: 'Start de intake',
    placeholder: 'Typ je antwoord…',
    opener: 'Goed. We houden het direct en concreet — geen vage vragen.\n\nWaar zit op dit moment de grootste rem op je energie? Wees eerlijk.',
    resultLabel: 'Jouw profiel',
    patternsLabel: 'Wat bij jou past',
    routineLabel: 'Ritme & routines',
    nutritionLabel: 'Voeding',
    stepLabel: 'Begin hier',
    ctaLabel: 'Klaar voor de volgende stap?',
    ctaBtn: 'Bekijk begeleiding',
    ctaAccount: 'Maak een account',
    errorGeneric: 'Er ging iets mis. Probeer opnieuw.',
    errorNoKey: 'De intake-functie is nog niet geconfigureerd. Voeg je ANTHROPIC_API_KEY toe aan .env.local.',
    backLabel: '← Terug',
    progressLabel: (n: number) => `Stap ${n} van ~8`,
  },
  en: {
    label: 'Aylani Intake',
    title: 'Stay at',
    titleEm: 'your best.',
    body: 'You carry a lot and you handle it well.',
    bodyStrong: "That's exactly why this is the moment to invest.",
    bodyRest: " The Aylani Intake maps how you're built — and gives you concrete guidance on rhythm, energy and nutrition that works in your life.",
    meta: 'Personal conversation · No questionnaire · 5 minutes',
    start: 'Start the intake',
    placeholder: 'Type your answer…',
    opener: "Good. We'll keep this direct and concrete — no vague questions.\n\nWhere's the biggest drag on your energy right now? Be honest.",
    resultLabel: 'Your profile',
    patternsLabel: 'What fits you',
    routineLabel: 'Rhythm & routines',
    nutritionLabel: 'Nutrition',
    stepLabel: 'Start here',
    ctaLabel: 'Ready for the next step?',
    ctaBtn: 'View coaching options',
    ctaAccount: 'Create an account',
    errorGeneric: 'Something went wrong. Please try again.',
    errorNoKey: 'The intake function is not yet configured. Add your ANTHROPIC_API_KEY to .env.local.',
    backLabel: '← Back',
    progressLabel: (n: number) => `Step ${n} of ~8`,
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function IntakePage() {
  const [lang, setLang] = useState<Lang>('nl')
  const [phase, setPhase] = useState<Phase>('intro')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const [result, setResult] = useState<IntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const t = T[lang]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, result])

  // ── Start intake ─────────────────────────────────────────────────────────
  async function startIntake() {
    setPhase('chat')
    setMessages([])
    setMsgCount(0)
    setResult(null)
    setError(null)

    // Show opener directly (no API call for opener)
    const opener = t.opener
    setMessages([{ role: 'assistant', content: opener }])
  }

  // ── Change language ───────────────────────────────────────────────────────
  function changeLang(l: Lang) {
    setLang(l)
    if (phase === 'chat') {
      // Reset and restart in new language
      setMessages([])
      setMsgCount(0)
      setResult(null)
      const opener = T[l].opener
      setMessages([{ role: 'assistant', content: opener }])
    }
  }

  // ── Send message ──────────────────────────────────────────────────────────
  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    resetTextarea()
    setError(null)

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    const newCount = msgCount + 1
    setMsgCount(newCount)
    setLoading(true)

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, lang }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || t.errorGeneric)
        setLoading(false)
        return
      }

      const reply: string = data.content || ''

      // Check for result JSON
      const match = reply.match(/<r>([\s\S]*?)<\/r>/)
      if (match) {
        const before = reply.replace(/<r>[\s\S]*?<\/r>/, '').trim()
        const updatedMessages: ChatMessage[] = [
          ...newMessages,
          { role: 'assistant', content: before || reply },
        ]
        setMessages(updatedMessages)
        try {
          const parsed = JSON.parse(match[1].trim()) as IntakeResult
          setResult(parsed)
          setPhase('result')
        } catch {
          setMessages([...newMessages, { role: 'assistant', content: reply }])
        }
      } else {
        setMessages([...newMessages, { role: 'assistant', content: reply }])
      }
    } catch {
      setError(t.errorGeneric)
    }

    setLoading(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function resetTextarea() {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  const progress = phase === 'result' ? 100 : Math.min((msgCount / 8) * 90, 90)

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream flex flex-col pt-[72px]">

      {/* ─── Minimal intake header ───────────────────────────────────── */}
      <div className="border-b border-warm-200 bg-cream/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back or logo */}
          {phase === 'intro' ? (
            <Link href="/" className="font-serif text-xl font-medium text-charcoal hover:text-honey transition-colors duration-200">
              Aylani
            </Link>
          ) : (
            <button
              onClick={() => { setPhase('intro'); setMessages([]); setResult(null) }}
              className="text-sm text-warm-500 hover:text-charcoal transition-colors duration-200 font-sans"
            >
              {t.backLabel}
            </button>
          )}

          {/* Progress (visible during chat/result) */}
          {phase !== 'intro' && (
            <span className="text-xs text-warm-400 font-sans">
              {phase === 'result' ? t.resultLabel : t.progressLabel(msgCount)}
            </span>
          )}

          {/* Lang toggle */}
          <div className="flex gap-1 bg-cream-200 rounded-full p-0.5">
            {(['nl', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium font-sans tracking-wider uppercase transition-all duration-200 ${
                  lang === l
                    ? 'bg-charcoal text-white'
                    : 'text-warm-500 hover:text-charcoal'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {phase !== 'intro' && (
          <div className="h-0.5 bg-warm-200">
            <div
              className="h-full bg-honey transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* ─── INTRO ───────────────────────────────────────────────────── */}
      {phase === 'intro' && (
        <div className="flex-1 max-w-2xl mx-auto px-6 w-full py-16 lg:py-24">
          <p className="text-xs font-sans tracking-widest uppercase text-honey mb-7">
            {t.label}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-charcoal leading-none mb-8">
            {t.title}{' '}
            <span className="italic text-honey">{t.titleEm}</span>
          </h1>
          <p className="text-warm-500 text-lg leading-relaxed max-w-lg mb-2">
            {t.body}{' '}
            <strong className="text-charcoal font-medium">{t.bodyStrong}</strong>
            {t.bodyRest}
          </p>
          <p className="text-warm-400 text-sm mb-10">{t.meta}</p>

          <button
            onClick={startIntake}
            className="inline-flex items-center gap-3 bg-charcoal hover:bg-warm-800 text-white font-sans text-sm font-medium tracking-wide px-8 py-4 rounded-full transition-all duration-200 group"
          >
            {t.start}
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* What to expect */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-warm-200 pt-10">
            {[
              { label: lang === 'nl' ? 'Persoonlijk' : 'Personal', desc: lang === 'nl' ? 'Geen vragenlijst. Echte vragen.' : 'No questionnaire. Real questions.' },
              { label: lang === 'nl' ? 'Direct' : 'Direct', desc: lang === 'nl' ? 'Concreet advies, geen vage tips.' : 'Concrete advice, no vague tips.' },
              { label: lang === 'nl' ? 'Vanuit kracht' : 'From strength', desc: lang === 'nl' ? 'Wat werkt voor jou — niet wat er mist.' : "What works for you — not what's missing." },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-sans tracking-widest uppercase text-honey mb-2">{item.label}</p>
                <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── CHAT ────────────────────────────────────────────────────── */}
      {(phase === 'chat' || phase === 'result') && (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6">

          {/* Messages */}
          <div className="flex-1 py-8 space-y-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                style={{ animation: 'fadeUp 0.3s ease forwards' }}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                    msg.role === 'assistant'
                      ? 'bg-cream-200 border border-warm-200 text-honey font-serif text-sm'
                      : 'bg-charcoal text-white font-sans'
                  }`}
                >
                  {msg.role === 'assistant' ? 'A' : (lang === 'nl' ? 'J' : 'Y')}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-white border border-warm-200 text-charcoal rounded-tl-sm'
                      : 'bg-charcoal text-white rounded-tr-sm'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\n/g, '<br/>'),
                  }}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-cream-200 border border-warm-200 flex items-center justify-center font-serif text-sm text-honey flex-shrink-0">
                  A
                </div>
                <div className="bg-white border border-warm-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-warm-300"
                      style={{ animation: `bounce 1.1s ease ${delay}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Result card */}
            {result && phase === 'result' && (
              <ResultCard result={result} lang={lang} t={t} />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {phase === 'chat' && (
            <div className="sticky bottom-0 pb-8 pt-4 bg-gradient-to-t from-cream via-cream/95 to-transparent">
              <div className="flex gap-3 items-end bg-white border border-warm-200 rounded-full px-5 py-3 shadow-sm focus-within:border-honey transition-colors duration-200">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoResize(e.target) }}
                  onKeyDown={handleKeyDown}
                  placeholder={t.placeholder}
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent border-none outline-none resize-none font-sans text-sm text-charcoal placeholder-warm-300 leading-relaxed max-h-28 disabled:opacity-50"
                  style={{ minHeight: '22px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-charcoal hover:bg-warm-800 disabled:bg-warm-200 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({
  result,
  lang,
  t,
}: {
  result: IntakeResult
  lang: Lang
  t: typeof T['nl']
}) {
  return (
    <div className="mt-4 animate-[fadeUp_0.5s_ease_forwards]">
      <div className="bg-white border border-warm-200 rounded-3xl overflow-hidden shadow-sm">

        {/* Profile header */}
        <div className="bg-cream-200 px-7 py-6 border-b border-warm-200">
          <p className="text-xs font-sans tracking-widest uppercase text-honey mb-3">
            {t.resultLabel}
          </p>
          <p className="font-serif text-4xl font-light text-charcoal leading-tight mb-2">
            {result.profiel_naam}
          </p>
          <p className="text-warm-500 leading-relaxed">
            {result.profiel_tagline}
          </p>
        </div>

        {/* Description + patterns */}
        <div className="px-7 py-5 border-b border-warm-200">
          <p className="text-xs font-sans tracking-widest uppercase text-honey mb-3">
            {t.patternsLabel}
          </p>
          <p className="text-warm-600 text-sm leading-relaxed mb-4">
            {result.profiel_beschrijving}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.patronen.map((p, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-cream-200 border border-warm-200 text-warm-700">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Routines */}
        <div className="px-7 py-5 border-b border-warm-200">
          <p className="text-xs font-sans tracking-widest uppercase text-honey mb-3">
            {t.routineLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.routines.map((r, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-sage-50 border border-sage-100 text-warm-700">
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div className="px-7 py-5 border-b border-warm-200">
          <p className="text-xs font-sans tracking-widest uppercase text-honey mb-3">
            {t.nutritionLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.voeding.map((v, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-honey-50 border border-honey-100 text-warm-700">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* First step */}
        <div className="bg-charcoal px-7 py-5">
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-honey mb-2">
                {t.stepLabel}
              </p>
              <p className="text-cream-50 text-sm leading-relaxed">
                {result.eerste_stap}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center pb-12">
        <p className="text-xs font-sans tracking-widest uppercase text-honey mb-5">
          {t.ctaLabel}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/aanbod"
            className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-warm-800 text-white font-sans text-sm font-medium tracking-wide px-7 py-3.5 rounded-full transition-all duration-200"
          >
            {t.ctaBtn}
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-warm-300 hover:bg-warm-100 text-charcoal font-sans text-sm font-medium tracking-wide px-7 py-3.5 rounded-full transition-all duration-200"
          >
            {t.ctaAccount}
          </Link>
        </div>
      </div>
    </div>
  )
}
