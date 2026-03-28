export type Database = {
  public: {
    Tables: {
      berufsfelder: {
        Row: {
          id: number
          name: string
          beschreibung: string | null
          anzeige: boolean
          bild_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          beschreibung?: string | null
          anzeige?: boolean
          bild_url?: string | null
        }
        Update: {
          name?: string
          beschreibung?: string | null
          anzeige?: boolean
          bild_url?: string | null
        }
      }
      referenten: {
        Row: {
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
        Insert: {
          id?: number
          vorname: string
          nachname: string
          email?: string | null
          club?: string | null
          bemerkung?: string | null
          status?: 'bestätigt' | 'angefragt' | 'abgesagt'
          anzeigen?: boolean
        }
        Update: {
          vorname?: string
          nachname?: string
          email?: string | null
          club?: string | null
          bemerkung?: string | null
          status?: 'bestätigt' | 'angefragt' | 'abgesagt'
          anzeigen?: boolean
        }
      }
      zuordnung: {
        Row: {
          referent_id: number
          berufsfeld_id: number
        }
        Insert: {
          referent_id: number
          berufsfeld_id: number
        }
        Update: {
          referent_id?: number
          berufsfeld_id?: number
        }
      }
      raeume: {
        Row: {
          id: number
          bezeichnung: string
          geschoss: string | null
          bemerkung: string | null
          verwendung: boolean
          archiv_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          bezeichnung: string
          geschoss?: string | null
          bemerkung?: string | null
          verwendung?: boolean
          archiv_name?: string | null
        }
        Update: {
          bezeichnung?: string
          geschoss?: string | null
          bemerkung?: string | null
          verwendung?: boolean
          archiv_name?: string | null
        }
      }
      zeitslots: {
        Row: {
          id: number
          label: string
          reihenfolge: number
          created_at: string
        }
        Insert: {
          id?: number
          label: string
          reihenfolge?: number
        }
        Update: {
          label?: string
          reihenfolge?: number
        }
      }
      planung: {
        Row: {
          raum_id: number
          zeitslot_id: number
          berufsfeld_id: number | null
        }
        Insert: {
          raum_id: number
          zeitslot_id: number
          berufsfeld_id?: number | null
        }
        Update: {
          berufsfeld_id?: number | null
        }
      }
      schulen: {
        Row: {
          id: number
          name: string
          basis_schueler: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          basis_schueler?: number
        }
        Update: {
          name?: string
          basis_schueler?: number
        }
      }
      belegungen: {
        Row: {
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
        Insert: {
          id?: number
          planung_raum?: number | null
          planung_slot?: number | null
          schule_id?: number | null
          vorname?: string | null
          nachname?: string | null
          ip_hash?: string | null
          user_agent?: string | null
        }
        Update: {
          planung_raum?: number | null
          planung_slot?: number | null
          schule_id?: number | null
          vorname?: string | null
          nachname?: string | null
        }
      }
    }
  }
}
