/**
 * HerBI – CSV-Import-Script für Datenmigration vom dawesys-System
 *
 * Verwendung:
 *   npx tsx scripts/import-csv.ts --type referenten --file ./data/referenten.csv
 *   npx tsx scripts/import-csv.ts --type berufsfelder --file ./data/berufsfelder.csv
 *   npx tsx scripts/import-csv.ts --type raeume --file ./data/raeume.csv
 *   npx tsx scripts/import-csv.ts --type schulen --file ./data/schulen.csv
 *
 * Voraussetzung: .env.local mit NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * CSV-Format: Semikolon-getrennt, UTF-8 mit BOM, erste Zeile = Header
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// .env.local laden
const envPath = path.resolve(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Fehler: NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY müssen in .env.local gesetzt sein.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// --- CSV Parser ---
function parseCSV(content: string): Record<string, string>[] {
  // BOM entfernen
  const clean = content.replace(/^\uFEFF/, '')
  const lines = clean.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return []

  // Separator erkennen
  const sep = lines[0].includes(';') ? ';' : ','

  const headers = lines[0].split(sep).map((h) => h.replace(/^"|"$/g, '').trim().toLowerCase())

  return lines.slice(1).map((line) => {
    const values = line.split(sep).map((v) => v.replace(/^"|"$/g, '').trim())
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] || ''
    })
    return row
  })
}

// --- Import-Funktionen ---
async function importReferenten(rows: Record<string, string>[]) {
  const inserts = rows.map((r) => ({
    vorname: r.vorname || r.firstname || '',
    nachname: r.nachname || r.lastname || r.name || '',
    email: r.email || r['e-mail'] || null,
    club: r.club || null,
    bemerkung: r.bemerkung || r.notiz || r.anmerkung || null,
    status: normalizeStatus(r.status),
    anzeigen: r.anzeigen === '1' || r.anzeigen?.toLowerCase() === 'ja' || r.anzeigen?.toLowerCase() === 'true',
  })).filter((r) => r.vorname && r.nachname)

  console.log(`Importiere ${inserts.length} Referenten...`)
  const { error } = await supabase.from('referenten').insert(inserts)
  if (error) throw error
  console.log(`✓ ${inserts.length} Referenten importiert.`)
}

async function importBerufsfelder(rows: Record<string, string>[]) {
  const inserts = rows.map((r) => ({
    name: r.name || r.bezeichnung || r.berufsfeld || '',
    beschreibung: r.beschreibung || r.description || null,
    anzeige: r.anzeige !== '0' && r.anzeige?.toLowerCase() !== 'nein',
    bild_url: r.bild_url || r.bild || null,
  })).filter((r) => r.name)

  console.log(`Importiere ${inserts.length} Berufsfelder...`)
  const { error } = await supabase.from('berufsfelder').insert(inserts)
  if (error) throw error
  console.log(`✓ ${inserts.length} Berufsfelder importiert.`)
}

async function importRaeume(rows: Record<string, string>[]) {
  const inserts = rows.map((r) => ({
    bezeichnung: r.bezeichnung || r.raum || r.name || '',
    geschoss: r.geschoss || r.stockwerk || r.etage || null,
    bemerkung: r.bemerkung || null,
    verwendung: r.verwendung !== '0' && r.verwendung?.toLowerCase() !== 'nein',
  })).filter((r) => r.bezeichnung)

  console.log(`Importiere ${inserts.length} Räume...`)
  const { error } = await supabase.from('raeume').insert(inserts)
  if (error) throw error
  console.log(`✓ ${inserts.length} Räume importiert.`)
}

async function importSchulen(rows: Record<string, string>[]) {
  const inserts = rows.map((r) => ({
    name: r.name || r.schule || r.schulname || '',
    basis_schueler: parseInt(r.basis_schueler || r.schueler || r['schülerzahl'] || '0') || 0,
  })).filter((r) => r.name)

  console.log(`Importiere ${inserts.length} Schulen...`)
  const { error } = await supabase.from('schulen').insert(inserts)
  if (error) throw error
  console.log(`✓ ${inserts.length} Schulen importiert.`)
}

function normalizeStatus(s: string | undefined): 'bestätigt' | 'angefragt' | 'abgesagt' {
  if (!s) return 'angefragt'
  const lower = s.toLowerCase().trim()
  if (lower.includes('bestätigt') || lower.includes('confirmed') || lower === '1') return 'bestätigt'
  if (lower.includes('abgesagt') || lower.includes('cancelled') || lower === '2') return 'abgesagt'
  return 'angefragt'
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2)
  const typeIdx = args.indexOf('--type')
  const fileIdx = args.indexOf('--file')

  if (typeIdx === -1 || fileIdx === -1) {
    console.log(`
HerBI CSV-Import

Verwendung:
  npx tsx scripts/import-csv.ts --type <typ> --file <pfad>

Typen:
  referenten    Referenten importieren
  berufsfelder  Berufsfelder importieren
  raeume        Räume importieren
  schulen       Schulen importieren

Beispiel:
  npx tsx scripts/import-csv.ts --type referenten --file ./data/referenten.csv
`)
    process.exit(0)
  }

  const type = args[typeIdx + 1]
  const filePath = args[fileIdx + 1]

  if (!fs.existsSync(filePath)) {
    console.error(`Datei nicht gefunden: ${filePath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const rows = parseCSV(content)
  console.log(`${rows.length} Zeilen in CSV gefunden.`)

  try {
    switch (type) {
      case 'referenten': await importReferenten(rows); break
      case 'berufsfelder': await importBerufsfelder(rows); break
      case 'raeume': await importRaeume(rows); break
      case 'schulen': await importSchulen(rows); break
      default:
        console.error(`Unbekannter Typ: ${type}. Gültige Typen: referenten, berufsfelder, raeume, schulen`)
        process.exit(1)
    }
  } catch (err) {
    console.error('Import fehlgeschlagen:', err)
    process.exit(1)
  }
}

main()
