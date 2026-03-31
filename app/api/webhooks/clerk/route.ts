import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret niet geconfigureerd.' }, { status: 500 })
  }

  const payload = await request.text()
  const headers = {
    'svix-id': request.headers.get('svix-id') ?? '',
    'svix-timestamp': request.headers.get('svix-timestamp') ?? '',
    'svix-signature': request.headers.get('svix-signature') ?? '',
  }

  let event
  try {
    const wh = new Webhook(webhookSecret)
    event = wh.verify(payload, headers) as {
      type: string
      data: {
        id: string
        email_addresses: { email_address: string }[]
        first_name: string | null
        last_name: string | null
      }
    }
  } catch {
    return NextResponse.json({ error: 'Ongeldige webhook signature.' }, { status: 400 })
  }

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = event.data
    const email = email_addresses?.[0]?.email_address ?? null
    const name = [first_name, last_name].filter(Boolean).join(' ') || null

    const supabase = createServerClient()
    await supabase.from('profiles').insert({
      clerk_id: id,
      email,
      name,
      role: 'client',
    })
  }

  return NextResponse.json({ ok: true })
}
