-- HerBI: Raumlisten als Archiv-Snapshots
-- Idempotent: laeuft das Skript zweimal, entstehen keine Duplikate.

-- ------------------------------------------------------------
-- 1. Aktuelle Raumliste als "KMG-2025" sichern
--    Kopiert alle aktiven Raeume (archiv_name IS NULL) ins Archiv.
--    Entspricht dem Button "Archivieren" im Admin-Bereich.
-- ------------------------------------------------------------
DELETE FROM raeume WHERE archiv_name = 'KMG-2025';
INSERT INTO raeume (bezeichnung, geschoss, bemerkung, verwendung, archiv_name)
SELECT bezeichnung, geschoss, bemerkung, verwendung, 'KMG-2025'
FROM raeume
WHERE archiv_name IS NULL AND verwendung = true;

-- ------------------------------------------------------------
-- 2. Historische Listen aus den CSV-Exporten der Vorjahre
-- ------------------------------------------------------------

-- Friedrichs-Gymnasium 2021: 27 Raeume
DELETE FROM raeume WHERE archiv_name = 'Friedrichs-Gymnasium 2021';
INSERT INTO raeume (bezeichnung, geschoss, bemerkung, verwendung, archiv_name) VALUES
  ('114', 'OG1', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('014', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('015', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('012', 'EG', 'Referentenraum', true, 'Friedrichs-Gymnasium 2021'),
  ('013', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('016', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('017', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('018', 'EG', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('108', 'OG1', 'KR für max 15. Personen', true, 'Friedrichs-Gymnasium 2021'),
  ('110', 'OG1', 'KR für max 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('112', 'OG1', 'KR für max 45 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('113', 'OG1', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('115', 'OG1', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('116', 'OG1', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('117', 'OG1', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('118', 'OG1', 'KR für 25. Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('119', 'OG1', 'KR für 25 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('120', 'OG1', 'KR für 25 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('121', 'OG1', 'KR für 25 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('122', 'OG1', 'KR für 25 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('216', 'OG2', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('217', 'OG2', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('218', 'OG2', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('219', 'OG2', 'KR für 30 Pers.', true, 'Friedrichs-Gymnasium 2021'),
  ('206', 'OG2', 'KR für 35 Pers + Beamer', true, 'Friedrichs-Gymnasium 2021'),
  ('208', 'OG2', 'FR-Physik + Beamer max. 32 Pers', true, 'Friedrichs-Gymnasium 2021'),
  ('210', 'OG2', 'FR-Physik + Beamer max. 32 Pers.', true, 'Friedrichs-Gymnasium 2021');

-- Gesamtschule Friedenstal 2024: 34 Raeume
DELETE FROM raeume WHERE archiv_name = 'Gesamtschule Friedenstal 2024';
INSERT INTO raeume (bezeichnung, geschoss, bemerkung, verwendung, archiv_name) VALUES
  ('G205', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('A 107', 'KG', 'KR für 25 Pers. + festinstallierter Beamer', true, 'Gesamtschule Friedenstal 2024'),
  ('A109', 'KG', 'KR für 25 Pers. + festinstallierter Beamer', true, 'Gesamtschule Friedenstal 2024'),
  ('A 105', 'KG', 'KR für 25 Pers. + festinstallierter Beamer', true, 'Gesamtschule Friedenstal 2024'),
  ('A305', 'OG1', 'KR für 25 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau OG', true, 'Gesamtschule Friedenstal 2024'),
  ('A306', 'OG1', 'KR für 25 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau OG', true, 'Gesamtschule Friedenstal 2024'),
  ('A308', 'OG1', 'KR für 25 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau OG', true, 'Gesamtschule Friedenstal 2024'),
  ('G108', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('J102', 'OG1', 'KR für 20 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J101', 'OG1', 'KR für 26 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('G208', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G204', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G201', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G107', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G106', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G105', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('G101', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau I', true, 'Gesamtschule Friedenstal 2024'),
  ('A309', 'OG1', 'KR für 25 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau OG', true, 'Gesamtschule Friedenstal 2024'),
  ('A 104', 'KG', 'KR für 25 Pers. + festinstallierter Beamer', true, 'Gesamtschule Friedenstal 2024'),
  ('K102', 'OG1', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K101', 'OG1', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J105', 'OG1', 'KR für 36 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J103', 'OG1', 'KR für 28 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J203', 'OG2', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J201', 'OG2', 'KR für 26 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K103', 'OG1', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J202', 'OG2', 'KR für 24 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('J204', 'OG2', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K105', 'OG1', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K202', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K203', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K204', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K205', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024'),
  ('K206', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Neubau II', true, 'Gesamtschule Friedenstal 2024');

-- KMG 2024: 36 Raeume
DELETE FROM raeume WHERE archiv_name = 'KMG 2024';
INSERT INTO raeume (bezeichnung, geschoss, bemerkung, verwendung, archiv_name) VALUES
  ('A205', 'OG1', 'KR für 29 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A 107', 'EG', 'KR für 17 Pers. + 1 mobiler Beamer auf dem Flur, Altbau', true, 'KMG 2024'),
  ('A109', 'EG', 'KR für 29 Pers. +  1 mobiler Beamer auf dem Flur, Altbau', true, 'KMG 2024'),
  ('A 108', 'EG', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur, Altbau', true, 'KMG 2024'),
  ('A304', 'OG2', 'KR für 29 Pers. + festinstallierter Beamer,  Altbau', true, 'KMG 2024'),
  ('A306', 'OG2', 'KR für 29 Pers. + 1 mobiler Beamer,  Altbau', true, 'KMG 2024'),
  ('A307', 'OG2', 'KR für 28 Pers. + 1 mobiler Beamer,  Altbau', true, 'KMG 2024'),
  ('V102', 'EG', 'KR für 23 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('N215', 'OG1', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('A203', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A208', 'OG1', 'KR für 25 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A204', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A201', 'OG1', 'KR für 31 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('V103', 'EG', 'KR für 27 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('V104', 'EG', 'KR für 34 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('V105', 'EG', 'KR für 30 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('V101', 'EG', 'KR für 21 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('A303', 'OG2', 'KR für 30 Pers. + 1 mobiler Beamer,  Altbau', true, 'KMG 2024'),
  ('N202', 'OG1', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('N201', 'OG1', 'KR für 31 Pers. +  festinstallierter Beamer ,  Neubau', true, 'KMG 2024'),
  ('N204', 'OG1', 'KR für 31Pers. + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('N210', 'OG1', 'Kunstraum + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('A302', 'OG2', 'KR für 29 Pers. + festinstallierter Beamer,  Altbau', true, 'KMG 2024'),
  ('N203', 'OG1', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('V202', 'OG1', 'KR für 30 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('A301', 'OG2', 'KR für 40 Pers. + festinstallierter Beamer,  Altbau', true, 'KMG 2024'),
  ('N205', 'OG1', 'KR für 30 Pers. + festinstallierter Beamer,  Neubau', true, 'KMG 2024'),
  ('V203', 'OG1', 'KR für 29 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('A210', 'OG1', 'KR für 28 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A209', 'OG1', 'KR für 30 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('A207', 'OG1', 'KR für 29 Pers. + 1 mobiler Beamer auf dem Flur,  Altbau', true, 'KMG 2024'),
  ('V204', 'OG1', 'KR für 18 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('V301', 'OG2', 'KR für 31 Pers. + festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024'),
  ('G1', 'KG', 'KR für 32 Pers. + festinstallierter Beamer, Gartenklasse', true, 'KMG 2024'),
  ('G2', 'KG', 'Informatikraum + festinstallierter Beamer, Gartenklasse', true, 'KMG 2024'),
  ('V303', 'OG2', 'Informatikraum, festinstallierter Beamer,  Gebäude neben der alten Turnhalle', true, 'KMG 2024');
