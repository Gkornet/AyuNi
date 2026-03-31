import { redirect } from 'next/navigation'

// Oud login-formulier — Clerk regelt dit nu via /sign-in
export default function LoginPage() {
  redirect('/sign-in')
}
