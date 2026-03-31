import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Aylani — Rust. Energie. Ritme.',
    template: '%s — Aylani',
  },
  description:
    'Persoonlijke leefstijlbegeleiding voor drukke ouders en professionals. Voor mensen die veel dragen en ook weer goed voor zichzelf willen leren zorgen.',
  keywords: [
    'leefstijlbegeleiding',
    'coaching',
    'rust',
    'energie',
    'ritme',
    'welzijn',
    'gezondheid',
  ],
  openGraph: {
    title: 'Aylani — Rust. Energie. Ritme.',
    description:
      'Persoonlijke leefstijlbegeleiding voor drukke ouders en professionals.',
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="nl" className={`${inter.variable} ${cormorant.variable}`}>
        <body className="bg-cream text-charcoal font-sans antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
