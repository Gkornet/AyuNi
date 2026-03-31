import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inloggen',
  description: 'Log in op je Aylani account.',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center pt-[72px] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif text-3xl font-light italic tracking-widest text-charcoal mb-1">
            Aylani
          </p>
          <p className="text-xs font-sans tracking-widest uppercase text-muted">
            Welkom terug
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-cream-50 border border-warm-200 rounded-3xl shadow-none p-8',
              headerTitle: 'font-serif text-2xl font-light text-charcoal',
              headerSubtitle: 'text-warm-500 text-sm',
              formFieldLabel: 'text-xs font-sans font-medium tracking-wider uppercase text-warm-600',
              formFieldInput: 'bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-warm-300 focus:ring-2 focus:ring-honey/40 focus:border-honey',
              formButtonPrimary: 'bg-honey hover:bg-honey-dark text-white rounded-full font-sans font-medium tracking-wide text-sm py-3',
              footerActionLink: 'text-honey hover:text-honey-dark font-medium',
              identityPreviewText: 'text-charcoal text-sm',
              identityPreviewEditButton: 'text-honey text-sm',
            },
          }}
        />
      </div>
    </div>
  )
}
