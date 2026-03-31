import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Inloggen',
  description: 'Log in op je Aylani account.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex pt-[72px]">

      {/* ─── LINKER KOLOM: Foto + quote ───────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-14 overflow-hidden">
        <Image
          src="/images/bos.jpeg"
          alt="Persoon staat in rust in een gouden bos"
          fill
          priority
          className="object-cover object-center"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />

        <div className="relative z-10">
          <Link href="/" className="inline-block mb-16">
            <p className="font-serif text-2xl font-light italic tracking-widest text-white">Aylani</p>
            <p className="text-xs font-sans tracking-widest uppercase text-honey mt-0.5">
              Rust · Energie · Ritme
            </p>
          </Link>

          <blockquote className="font-serif text-2xl lg:text-3xl font-light italic text-white leading-snug mb-5">
            &ldquo;Voor mensen die veel dragen en ook weer goed voor zichzelf willen leren zorgen.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm">— De merkbelofte van Aylani</p>
        </div>
      </div>

      {/* ─── RECHTER KOLOM: Formulier ─────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-cream px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobiel logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/">
              <p className="font-serif text-2xl font-light italic tracking-widest text-charcoal">Aylani</p>
              <p className="text-xs font-sans tracking-widest uppercase text-muted mt-1">
                Rust · Energie · Ritme
              </p>
            </Link>
          </div>

          <h1 className="font-serif text-3xl font-light text-charcoal mb-2">
            Welkom terug
          </h1>
          <p className="text-warm-500 text-sm mb-10">
            Log in op je persoonlijke omgeving.
          </p>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600 mb-2"
              >
                E-mailadres
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="jouw@email.nl"
                className="w-full bg-cream-50 border border-warm-200 rounded-xl px-4 py-3.5 text-sm text-charcoal placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey transition-all duration-200"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-sans font-medium tracking-wider uppercase text-warm-600"
                >
                  Wachtwoord
                </label>
                <Link
                  href="/wachtwoord-vergeten"
                  className="text-xs text-honey hover:text-honey-dark transition-colors duration-200"
                >
                  Vergeten?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-cream-50 border border-warm-200 rounded-xl px-4 py-3.5 text-sm text-charcoal placeholder-warm-300 focus:outline-none focus:ring-2 focus:ring-honey/40 focus:border-honey transition-all duration-200"
              />
            </div>

            <Button type="submit" size="lg" className="w-full justify-center mt-2">
              Inloggen
            </Button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 border-t border-warm-200" />
            <p className="text-xs text-warm-300 font-sans">of</p>
            <div className="flex-1 border-t border-warm-200" />
          </div>

          <p className="text-center text-sm text-warm-500">
            Nog geen account?{' '}
            <Link
              href="/aanbod"
              className="text-honey hover:text-honey-dark font-medium transition-colors duration-200"
            >
              Begin gratis
            </Link>
          </p>

          <p className="text-center text-xs text-warm-400 mt-8 leading-relaxed">
            Door in te loggen ga je akkoord met onze{' '}
            <Link href="/voorwaarden" className="underline hover:text-warm-600 transition-colors duration-200">
              algemene voorwaarden
            </Link>{' '}
            en{' '}
            <Link href="/privacy" className="underline hover:text-warm-600 transition-colors duration-200">
              privacybeleid
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
