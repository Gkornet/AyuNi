import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, category, read_time_minutes, published, created_at, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ articles: data })
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const body = await request.json()
  const { title, category, read_time_minutes, body: articleBody, published } = body

  if (!title) return NextResponse.json({ error: 'Titel verplicht.' }, { status: 400 })

  const slug = slugify(title) + '-' + Date.now()
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('articles')
    .insert({
      slug,
      title,
      category: category || null,
      read_time_minutes: read_time_minutes || null,
      body: articleBody || '',
      published: published ?? false,
      author_clerk_id: userId,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ article: data })
}
