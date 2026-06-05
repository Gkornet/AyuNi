import type { MetadataRoute } from 'next'

// Pre-launch: blokkeer alle crawlers zodat de site niet geïndexeerd wordt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
