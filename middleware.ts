import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
])

// Is Clerk volledig geconfigureerd? Zonder sleutels crasht clerkMiddleware
// op élke route — ook de publieke pagina's. Dit vangnet houdt de publieke
// site overeind als de env-vars (nog) ontbreken.
const hasClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

const clerk = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  return NextResponse.next()
})

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!hasClerkKeys) {
    // Config incompleet: publieke pagina's blijven werken, beveiligde
    // routes gaan naar home (inloggen kan toch niet zonder Clerk).
    if (isProtectedRoute(req)) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  return clerk(req, ev)
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
