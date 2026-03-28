-- ============================================================
-- HerBI – Herforder Berufsinformationstag
-- Datenbankschema v1.0
-- Supabase / PostgreSQL
-- ============================================================

-- ============================================================
-- 1. TABELLEN
-- ============================================================

-- Berufsfelder
CREATE TABLE berufsfelder (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  beschreibung TEXT,
  anzeige     BOOLEAN DEFAULT true,
  bild_url    VARCHAR(500),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Referenten
CREATE TABLE referenten (
  id          SERIAL PRIMARY KEY,
  vorname     VARCHAR(100) NOT NULL,
  nachname    VARCHAR(100) NOT NULL,
  email       VARCHAR(255),
  club        VARCHAR(100),
  bemerkung   TEXT,
  status      VARCHAR(20) DEFAULT 'angefragt'
                CHECK (status IN ('bestätigt','angefragt','abgesagt')),
  anzeigen    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Zuordnung (n:m Referenten <-> Berufsfelder)
CREATE TABLE zuordnung (
  referent_id   INTEGER REFERENCES referenten(id) ON DELETE CASCADE,
  berufsfeld_id INTEGER REFERENCES berufsfelder(id) ON DELETE CASCADE,
  PRIMARY KEY (referent_id, berufsfeld_id)
);

-- Räume
CREATE TABLE raeume (
  id          SERIAL PRIMARY KEY,
  bezeichnung VARCHAR(50) NOT NULL,
  geschoss    VARCHAR(50),
  bemerkung   TEXT,
  verwendung  BOOLEAN DEFAULT true,
  archiv_name VARCHAR(100),  -- NULL = aktiv, sonst Name des Archiv-Snapshots
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Zeitslots (konfigurierbar pro Veranstaltung)
CREATE TABLE zeitslots (
  id          SERIAL PRIMARY KEY,
  label       VARCHAR(50) NOT NULL,  -- z.B. "14:30 - 15:00"
  reihenfolge INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Planung (Raum + Zeitslot -> Berufsfeld)
CREATE TABLE planung (
  raum_id       INTEGER REFERENCES raeume(id) ON DELETE CASCADE,
  zeitslot_id   INTEGER REFERENCES zeitslots(id) ON DELETE CASCADE,
  berufsfeld_id INTEGER REFERENCES berufsfelder(id) ON DELETE SET NULL,
  PRIMARY KEY (raum_id, zeitslot_id)
);

-- Schulen (für Auswertung)
CREATE TABLE schulen (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  basis_schueler INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Belegungen (QR-Scan-Daten)
CREATE TABLE belegungen (
  id            SERIAL PRIMARY KEY,
  planung_raum  INTEGER REFERENCES raeume(id),
  planung_slot  INTEGER REFERENCES zeitslots(id),
  schule_id     INTEGER REFERENCES schulen(id),
  vorname       VARCHAR(100),
  nachname      VARCHAR(100),
  ip_hash       VARCHAR(64),   -- gehashed für Duplikaterkennung
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. INDIZES
-- ============================================================

CREATE INDEX idx_referenten_status ON referenten(status);
CREATE INDEX idx_referenten_nachname ON referenten(nachname);
CREATE INDEX idx_referenten_club ON referenten(club);
CREATE INDEX idx_berufsfelder_anzeige ON berufsfelder(anzeige);
CREATE INDEX idx_raeume_archiv ON raeume(archiv_name);
CREATE INDEX idx_raeume_verwendung ON raeume(verwendung);
CREATE INDEX idx_zeitslots_reihenfolge ON zeitslots(reihenfolge);
CREATE INDEX idx_planung_berufsfeld ON planung(berufsfeld_id);
CREATE INDEX idx_belegungen_schule ON belegungen(schule_id);
CREATE INDEX idx_belegungen_raum_slot ON belegungen(planung_raum, planung_slot);
CREATE INDEX idx_belegungen_created ON belegungen(created_at);

-- ============================================================
-- 3. UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_berufsfelder_updated
  BEFORE UPDATE ON berufsfelder
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_referenten_updated
  BEFORE UPDATE ON referenten
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_raeume_updated
  BEFORE UPDATE ON raeume
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Alle Tabellen: RLS aktivieren
ALTER TABLE berufsfelder ENABLE ROW LEVEL SECURITY;
ALTER TABLE referenten ENABLE ROW LEVEL SECURITY;
ALTER TABLE zuordnung ENABLE ROW LEVEL SECURITY;
ALTER TABLE raeume ENABLE ROW LEVEL SECURITY;
ALTER TABLE zeitslots ENABLE ROW LEVEL SECURITY;
ALTER TABLE planung ENABLE ROW LEVEL SECURITY;
ALTER TABLE schulen ENABLE ROW LEVEL SECURITY;
ALTER TABLE belegungen ENABLE ROW LEVEL SECURITY;

-- Öffentlicher Lesezugriff auf Berufsfelder (nur sichtbare)
CREATE POLICY "Berufsfelder öffentlich lesbar"
  ON berufsfelder FOR SELECT
  USING (anzeige = true);

-- Admins: Vollzugriff auf Berufsfelder
CREATE POLICY "Berufsfelder Admin Vollzugriff"
  ON berufsfelder FOR ALL
  USING (auth.role() = 'authenticated');

-- Öffentlicher Lesezugriff auf Referenten (nur sichtbare)
CREATE POLICY "Referenten öffentlich lesbar"
  ON referenten FOR SELECT
  USING (anzeigen = true);

-- Admins: Vollzugriff auf Referenten
CREATE POLICY "Referenten Admin Vollzugriff"
  ON referenten FOR ALL
  USING (auth.role() = 'authenticated');

-- Zuordnung: öffentlich lesbar (für Berufsfeld-Detailseiten)
CREATE POLICY "Zuordnung öffentlich lesbar"
  ON zuordnung FOR SELECT
  USING (true);

-- Zuordnung: Admins können ändern
CREATE POLICY "Zuordnung Admin Vollzugriff"
  ON zuordnung FOR ALL
  USING (auth.role() = 'authenticated');

-- Räume: nur Admins
CREATE POLICY "Räume Admin Vollzugriff"
  ON raeume FOR ALL
  USING (auth.role() = 'authenticated');

-- Zeitslots: öffentlich lesbar (für Raumplan)
CREATE POLICY "Zeitslots öffentlich lesbar"
  ON zeitslots FOR SELECT
  USING (true);

-- Zeitslots: Admins können ändern
CREATE POLICY "Zeitslots Admin Vollzugriff"
  ON zeitslots FOR ALL
  USING (auth.role() = 'authenticated');

-- Planung: öffentlich lesbar (für Raumplan-Anzeige)
CREATE POLICY "Planung öffentlich lesbar"
  ON planung FOR SELECT
  USING (true);

-- Planung: Admins können ändern
CREATE POLICY "Planung Admin Vollzugriff"
  ON planung FOR ALL
  USING (auth.role() = 'authenticated');

-- Schulen: nur Admins
CREATE POLICY "Schulen Admin Vollzugriff"
  ON schulen FOR ALL
  USING (auth.role() = 'authenticated');

-- Belegungen: Insert erlaubt für anonyme (QR-Scan)
CREATE POLICY "Belegungen anonym einfügen"
  ON belegungen FOR INSERT
  WITH CHECK (true);

-- Belegungen: Lesen/Löschen nur Admins
CREATE POLICY "Belegungen Admin Lesen"
  ON belegungen FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Belegungen Admin Löschen"
  ON belegungen FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 5. STORAGE BUCKET (für Berufsfeld-Bilder)
-- ============================================================
-- Muss über Supabase Dashboard oder API erstellt werden:
-- Bucket: "berufsfeld-bilder" (public)
-- Policy: Öffentliches Lesen, authentifiziertes Schreiben

-- ============================================================
-- 6. BEISPIEL-ZEITSLOTS
-- ============================================================

INSERT INTO zeitslots (label, reihenfolge) VALUES
  ('Block 1: 14:00 – 14:30', 1),
  ('Block 2: 14:45 – 15:15', 2),
  ('Block 3: 15:30 – 16:00', 3),
  ('Block 4: 16:15 – 16:45', 4);
