import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export type UserRole = 'admin' | 'editor' | 'client'

/**
 * Haal de rol op van de huidige ingelogde gebruiker.
 * Rol wordt opgeslagen in Clerk publicMetadata.role
 */
export async function getUserRole(): Promise<UserRole | null> {
  const user = await currentUser()
  if (!user) return null
  return (user.publicMetadata?.role as UserRole) ?? 'client'
}

/**
 * Vereis dat de gebruiker ingelogd is.
 * Redirect naar /sign-in als niet ingelogd.
 */
export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return userId
}

/**
 * Vereis dat de gebruiker admin of editor is.
 * Redirect naar /dashboard als niet.
 */
export async function requireAdmin() {
  const userId = await requireAuth()
  const role = await getUserRole()
  if (role !== 'admin' && role !== 'editor') {
    redirect('/dashboard')
  }
  return { userId, role }
}

/**
 * Vereis dat de gebruiker admin is (niet editor).
 */
export async function requireSuperAdmin() {
  const userId = await requireAuth()
  const role = await getUserRole()
  if (role !== 'admin') {
    redirect('/admin')
  }
  return { userId, role }
}
