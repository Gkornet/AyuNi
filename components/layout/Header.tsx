'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Button from '@/components/ui/Button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Over Aylani' },
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/intake', label: 'Intake' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isSignedIn } = useUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl font-light italic tracking-widest text-charcoal group-hover:text-honey transition-colors duration-200">
              Aylani
            </span>
            <span className="hidden sm:block text-xs font-sans tracking-widest uppercase text-muted border-l border-warm-300 pl-3">
              Rust · Energie · Ritme
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-honey'
                    : 'text-warm-600 hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="font-sans text-sm font-medium text-warm-600 hover:text-charcoal transition-colors duration-200"
                >
                  Inloggen
                </Link>
                <Button href="/sign-up" size="sm">
                  Start vandaag
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={`font-sans text-sm font-medium transition-colors duration-200 ${
                    pathname === '/dashboard' ? 'text-honey' : 'text-warm-600 hover:text-charcoal'
                  }`}
                >
                  Mijn omgeving
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                      userButtonPopoverCard: 'bg-cream-50 border border-warm-200 shadow-lg rounded-2xl',
                      userButtonPopoverActionButton: 'text-warm-600 hover:text-charcoal hover:bg-warm-100 rounded-xl',
                      userButtonPopoverActionButtonText: 'font-sans text-sm',
                    },
                  }}
                />
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-warm-600 hover:text-charcoal hover:bg-warm-100 transition-colors duration-200"
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-warm-200 bg-cream-50 px-6 py-6">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans text-base font-medium transition-colors duration-200 ${
                  pathname === link.href ? 'text-honey' : 'text-warm-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm text-warm-600 text-center py-2"
                >
                  Inloggen
                </Link>
                <Button href="/sign-up" size="sm" className="w-full justify-center">
                  Start vandaag
                </Button>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="font-sans text-sm text-center text-warm-600 py-2"
              >
                Mijn omgeving
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
