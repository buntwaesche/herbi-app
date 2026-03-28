import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'crypto'

// Service-Client ohne Auth (für anonyme QR-Scans)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Rate limiting (einfaches In-Memory für Vercel)
const recentScans = new Map<string, number>()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { raum_id, zeitslot_id, schule_id, vorname, nachname } = body

  if (!raum_id || !zeitslot_id || !schule_id) {
    return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
  }

  // IP hashen für Duplikaterkennung
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const ipHash = crypto.createHash('sha256').update(ip + raum_id + zeitslot_id).digest('hex')

  // Rate Limit: Max 1 Scan pro IP+Raum+Slot alle 30 Sekunden
  const rateKey = ipHash
  const lastScan = recentScans.get(rateKey)
  if (lastScan && Date.now() - lastScan < 30000) {
    return NextResponse.json({ error: 'Bitte warte kurz, bevor du erneut scannst.' }, { status: 429 })
  }
  recentScans.set(rateKey, Date.now())

  const userAgent = request.headers.get('user-agent') || ''

  const { error } = await supabase.from('belegungen').insert({
    planung_raum: raum_id,
    planung_slot: zeitslot_id,
    schule_id,
    vorname: vorname || null,
    nachname: nachname || null,
    ip_hash: ipHash,
    user_agent: userAgent,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: 'Teilnahme erfasst!' })
}
