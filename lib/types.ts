export type Berufsfeld = {
  id: number
  name: string
  beschreibung: string | null
  anzeige: boolean
  bild_url: string | null
  created_at: string
  updated_at: string
}

export type Referent = {
  id: number
  vorname: string
  nachname: string
  email: string | null
  club: string | null
  bemerkung: string | null
  status: 'bestätigt' | 'angefragt' | 'abgesagt'
  anzeigen: boolean
  created_at: string
  updated_at: string
}

export type Zuordnung = {
  referent_id: number
  berufsfeld_id: number
}

export type Raum = {
  id: number
  bezeichnung: string
  geschoss: string | null
  bemerkung: string | null
  verwendung: boolean
  archiv_name: string | null
  created_at: string
  updated_at: string
}

export type Zeitslot = {
  id: number
  label: string
  reihenfolge: number
  created_at: string
}

export type Planung = {
  raum_id: number
  zeitslot_id: number
  berufsfeld_id: number | null
}

export type Schule = {
  id: number
  name: string
  basis_schueler: number
  created_at: string
}

export type Belegung = {
  id: number
  planung_raum: number | null
  planung_slot: number | null
  schule_id: number | null
  vorname: string | null
  nachname: string | null
  ip_hash: string | null
  user_agent: string | null
  created_at: string
}
