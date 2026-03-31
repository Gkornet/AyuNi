import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const { clientId, body } = await request.json()
  if (!clientId || !body?.trim()) {
    return NextResponse.json({ error: 'clientId en body zijn verplicht.' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('client_notes')
    .insert({ client_clerk_id: clientId, author_clerk_id: userId, body })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ note: data })
}
