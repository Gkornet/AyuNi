import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Browser client — respects Row Level Security
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server client — bypasses RLS, alleen server-side gebruiken
export function createServerClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Types
export interface Profile {
  id: string
  clerk_id: string
  email: string | null
  name: string | null
  role: 'admin' | 'editor' | 'client'
  created_at: string
}

export interface IntakeResult {
  id: string
  clerk_id: string | null
  lang: 'nl' | 'en'
  profiel_naam: string
  profiel_tagline: string
  profiel_beschrijving: string
  patronen: string[]
  routines: string[]
  voeding: string[]
  eerste_stap: string
  created_at: string
}

export interface Article {
  id: string
  slug: string
  title: string
  category: string | null
  body: string | null
  read_time_minutes: number | null
  published: boolean
  author_clerk_id: string | null
  created_at: string
  updated_at: string
}

export interface ClientNote {
  id: string
  client_clerk_id: string
  author_clerk_id: string
  body: string
  created_at: string
}
