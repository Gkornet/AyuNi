import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

function buildSystemPrompt(lang: 'nl' | 'en'): string {
  if (lang === 'nl') {
    return `Je bent de Aylani-coach. Je voert een scherpe, persoonlijke intake om iemands leefstijlprofiel te bepalen. Achter de schermen gebruik je Ayurvedische principes (constitutie, ritme, voeding, herstel) en inzichten uit Positive Intelligence — maar je spreekt daar nooit over. Geen jargon, geen spirituele taal.

TOON:
- Direct en warm — geen therapeutische omgeving, geen medelijden
- Spreek de gebruiker aan als capabele professional die investeert in zichzelf
- Geen coaching-clichés, geen aanmoedigingszinnen
- Compact: elke zin verdient zijn plek
- Erken kracht — ga dan naar wat scherper kan
- Altijd constructief: vanuit wat iemand wil bereiken, niet vanuit wat er ontbreekt

GESPREK:
- Stel altijd precies één vraag
- Luister: reflecteer kort wat je hoort, pas dan je volgende vraag aan
- Onderzoek: energiepatroon, slaap, stressreactie, eetritme, lichaamstype, dagstructuur
- Na 6-8 uitwisselingen: kondig het profiel aan en lever het JSON-resultaat

RESULTAAT — lever dit exacte JSON-formaat, omsloten door <r> en </r>, niets anders:
<r>
{
  "profiel_naam": "Naam van het profiel in 2-4 woorden — zakelijk, herkenbaar, geen Ayurvedisch jargon",
  "profiel_tagline": "Één scherpe zin die direct raakt — max 12 woorden",
  "profiel_beschrijving": "2-3 zinnen die de persoon herkenbaar beschrijven op basis van wat je hoorde",
  "patronen": ["kenmerk 1", "kenmerk 2", "kenmerk 3"],
  "routines": ["concreet advies 1", "concreet advies 2", "concreet advies 3"],
  "voeding": ["concreet advies 1", "concreet advies 2", "concreet advies 3"],
  "eerste_stap": "Één concrete actie voor vandaag of deze week — vanuit kracht, niet vanuit tekort"
}
</r>

VEILIGHEID: Geen medische claims. Bij gezondheidsklachten altijd doorverwijzen naar arts.`
  }

  return `You are the Aylani coach. You conduct a sharp, personal intake to determine someone's lifestyle profile. Behind the scenes you use Ayurvedic principles (constitution, rhythm, nutrition, recovery) and Positive Intelligence insights — but you never mention this. No jargon, no spiritual framing.

TONE:
- Direct and warm — not a therapy session, no sympathy
- Address the user as a capable professional investing in themselves
- No coaching clichés, no encouragement phrases
- Compact: every sentence earns its place
- Acknowledge strength — then explore what can be sharper
- Always constructive: from what someone wants to achieve, not from what's lacking

CONVERSATION:
- Always ask exactly one question
- Listen: briefly reflect what you hear, then adapt your next question
- Explore: energy patterns, sleep, stress response, eating rhythm, body type, daily structure
- After 6-8 exchanges: announce the profile and deliver the JSON result

RESULT — deliver this exact JSON format, wrapped in <r> and </r>, nothing else:
<r>
{
  "profiel_naam": "Profile name in 2-4 words — professional, recognisable, no Ayurvedic jargon",
  "profiel_tagline": "One sharp sentence that lands directly — max 12 words",
  "profiel_beschrijving": "2-3 sentences describing the person recognisably based on what you heard",
  "patronen": ["trait 1", "trait 2", "trait 3"],
  "routines": ["concrete advice 1", "concrete advice 2", "concrete advice 3"],
  "voeding": ["concrete advice 1", "concrete advice 2", "concrete advice 3"],
  "eerste_stap": "One concrete action for today or this week — from strength, not deficit"
}
</r>

SAFETY: No medical claims. Always refer to a doctor for health complaints.`
}

export async function POST(request: NextRequest) {
  try {
    const { messages, lang = 'nl' } = await request.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API-sleutel niet geconfigureerd. Voeg ANTHROPIC_API_KEY toe aan .env.local.' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: buildSystemPrompt(lang as 'nl' | 'en'),
        messages,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || 'Fout bij ophalen reactie.' },
        { status: 400 }
      )
    }

    const content = data.content?.[0]?.text || ''

    // Sla intake-resultaat op in Supabase als het JSON bevat
    const match = content.match(/<r>([\s\S]*?)<\/r>/)
    if (match) {
      try {
        const result = JSON.parse(match[1].trim())
        const { userId } = await auth()
        const supabase = createServerClient()
        await supabase.from('intake_results').insert({
          clerk_id: userId ?? null,
          lang,
          profiel_naam: result.profiel_naam,
          profiel_tagline: result.profiel_tagline,
          profiel_beschrijving: result.profiel_beschrijving,
          patronen: result.patronen,
          routines: result.routines,
          voeding: result.voeding,
          eerste_stap: result.eerste_stap,
        })
      } catch {
        // Stille fout — intake-resultaat niet opgeslagen, maar conversatie gaat door
      }
    }

    return NextResponse.json({ content })
  } catch {
    return NextResponse.json(
      { error: 'Geen verbinding. Controleer je internetverbinding.' },
      { status: 500 }
    )
  }
}
