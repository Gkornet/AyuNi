import Link from 'next/link'

const platformLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Over Aylani' },
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/dashboard', label: 'Mijn omgeving' },
]

const supportLinks = [
  { href: '/login', label: 'Inloggen' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacybeleid' },
  { href: '/voorwaarden', label: 'Algemene voorwaarden' },
]

export default function Footer() {
  return (
    <footer className="bg-warm-800 text-warm-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-medium text-cream-50 mb-3">Aylani</p>
            <p className="text-sm font-sans tracking-widest uppercase text-honey mb-5">
              Rust · Energie · Ritme
            </p>
            <p className="text-warm-300 text-sm leading-relaxed max-w-sm">
              Persoonlijke leefstijlbegeleiding voor drukke ouders en professionals.
              Voor mensen die veel dragen — en ook weer goed voor zichzelf willen leren zorgen.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-warm-400 mb-5">
              Platform
            </p>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 text-sm hover:text-cream-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-warm-400 mb-5">
              Meer
            </p>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 text-sm hover:text-cream-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-warm-700 py-8">
          <p className="text-warm-500 text-xs leading-relaxed max-w-3xl mb-4">
            <strong className="text-warm-400 font-medium">Disclaimer:</strong>{' '}
            Aylani biedt leefstijlbegeleiding en praktische ondersteuning. De inhoud op dit platform is
            informatief van aard en is geen vervanging voor medisch advies, diagnose of behandeling.
            Raadpleeg altijd een gekwalificeerde zorgverlener bij gezondheidsvragen of -zorgen.
          </p>
          <p className="text-warm-600 text-xs">
            © {new Date().getFullYear()} Aylani. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  )
}
