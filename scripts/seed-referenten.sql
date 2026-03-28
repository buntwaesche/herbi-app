-- ============================================
-- Referenten Import aus herbi.rocks (HerBI 2026)
-- ============================================

-- Erst alle bestehenden Referenten löschen (falls vorhanden)
DELETE FROM zuordnungen;
DELETE FROM referenten;

-- Referenten einfügen
-- Hinweis: "HerBI Team" Mitglieder und Referenten ohne Berufsfeld werden auch importiert
INSERT INTO referenten (vorname, nachname, email, club, bemerkung, status, anzeigen) VALUES
-- 1. Team HerBI
('Team', 'HerBI', 'referenten@herbi.rocks', 'Herford Widukind', NULL, 'bestätigt', false),
-- 2. Isab deel.stroop
('Isab', 'deel.stroop', 'isab.deel.stroop@lwk.nrw', 'Herford Hanse', NULL, 'angefragt', false),
-- 3. Silvia Noje-Rolf
('Silvia', 'Noje-Rolf', 'Silvia.Noje-Rolf@lwk.nrw.de', 'Herford Hanse', NULL, 'abgesagt', false),
-- 4. Fabian Kiera
('Fabian', 'Kiera', 'Fabian.Kiera@lwk.nrw.de', 'Herford Hanse', NULL, 'abgesagt', false),
-- 5. Karsten Friedrich Schlattmeier
('Karsten Friedrich', 'Schlattmeier', 'karsten@schlattmeier-architekten.de', 'Herford', NULL, 'bestätigt', true),
-- 6. Florian Richter (Banking)
('Florian', 'Richter', 'florian.richter@volksbankinostwestfalen.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 7. Dr. Klaus Bockermann
('Dr. Klaus', 'Bockermann', 'klaus.bockermann@t-online.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 8. Laura Potthast
('Laura', 'Potthast', 'Laura.Potthast@bockermann-fritze.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 9. Nicole Beltjes (BWL)
('Nicole', 'Beltjes', 'info@abtundpetram.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 10. Lena Vynogradova
('Lena', 'Vynogradova', 'lena.vynogradova@bertelsmann.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 11. Dr. Nils Hasenbein
('Dr. Nils', 'Hasenbein', 'nils.hasenbein@uni-bielefeld.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 12. Thomas Spahr
('Thomas', 'Spahr', 'karrbbherford@bundeswehr.org', 'Herford', NULL, 'bestätigt', true),
-- 13. Dr. Andreas Mix
('Dr. Andreas', 'Mix', 'a.mix@uni-bielefeld.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 14. Dr. Simon Biller
('Dr. Simon', 'Biller', 's.biller@budich.de', 'Herford Widukind', NULL, 'angefragt', true),
-- 15. Stefanie Meierjürgen
('Stefanie', 'Meierjürgen', 'stefanie.meierjuergen@th-owl.de', 'Herford', NULL, 'bestätigt', true),
-- 16. Patrick Sigmund
('Patrick', 'Sigmund', 'patrick.sigmund@fv.nrw.de', 'Herford', NULL, 'abgesagt', false),
-- 17. Annika Schake
('Annika', 'Schake', 'annika@stehr.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 18. Sebastian Kizinna
('Sebastian', 'Kizinna', 's.kizinna@hs-osnabrueck.de', 'Herford Widukind', NULL, 'angefragt', true),
-- 19. Alina Kerperien
('Alina', 'Kerperien', 'a.kerperien@hs-osnabrueck.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 20. Elena Limpke
('Elena', 'Limpke', 'elena.limpke@kannegiesser.de', 'Herford', NULL, 'bestätigt', true),
-- 21. Daniela Menke
('Daniela', 'Menke', 'Daniela.Menke@Herford.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 22. Anna Otte
('Anna', 'Otte', 'anna.otte@obsthof-otte.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 23. Jette Brinskelle
('Jette', 'Brinskelle', 'jettebrinskelle@web.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 24. Fabian Rottschäfer
('Fabian', 'Rottschäfer', 'fabian.rottschaefer@fichtner.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 25. Christine Lehmann
('Christine', 'Lehmann', 'christine.lehmann@arbeitsagentur.de', 'Herford', NULL, 'bestätigt', true),
-- 26. Nicklas Scharpff
('Nicklas', 'Scharpff', NULL, 'Herford Widukind', NULL, 'angefragt', false),
-- 27. Birgit Deker (Germanistik)
('Birgit', 'Deker', 'birgit.deker@t-online.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 28. Jenny Hübner
('Jenny', 'Hübner', 'jennyhoecker@gmail.com', 'Herford Widukind', NULL, 'bestätigt', true),
-- 29. Jochen Dickel
('Jochen', 'Dickel', 'Jochen.dickel@fh-mittelstand.de', 'Herford Widukind', NULL, 'angefragt', false),
-- 30. Tina Paschetag
('Tina', 'Paschetag', 'mail@bueropaschetag.de', 'Herford Widukind', NULL, 'abgesagt', true),
-- 31. Christiane Siebrasse
('Christiane', 'Siebrasse', 'christiane.siebrasse@herford.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 32. Ilka Krause
('Ilka', 'Krause', 'ikrause@web.de', 'Herford Widukind', 'Grundschullehramt/ Sonderpädagogik', 'angefragt', false),
-- 33. Johanna Wippich
('Johanna', 'Wippich', 'johanna.wippich@geburtshaus-bielefeld.de', 'Herford Widukind', NULL, 'angefragt', false),
-- 34. Maximilian Klischat
('Maximilian', 'Klischat', 'maximilian.klischat@fh-mittelstand.de', 'Herford', NULL, 'angefragt', true),
-- 35. Lara Baumblüth
('Lara', 'Baumblüth', 'lara.baumblueth@fh-mittelstand.de', 'Herford', NULL, 'angefragt', true),
-- 36. Wolfram Jacob
('Wolfram', 'Jacob', 'jacob@arbeitgeberverband-herford.de', 'Herford Widukind', 'HerBI Team', 'bestätigt', false),
-- 37. Nicole Beltjes (HerBI Team)
('Nicole', 'Beltjes (Team)', 'nicole.beltjes@abtundpetram.de', 'Herford Widukind', 'HerBI Team', 'bestätigt', false),
-- 38. Julian Schütz
('Julian', 'Schütz', 'Julian.Schuetz@ruhr-uni-bochum.de', 'Herford Hanse', 'HerBI Team', 'bestätigt', false),
-- 39. Anna Christina Grefe
('Anna Christina', 'Grefe', 'anna.grefe@gmx.de', 'Herford Hanse', 'HerBI Team', 'bestätigt', false),
-- 40. Svenja Groeschell
('Svenja', 'Groeschell', 'sgroeschell.sbs@maritim.de', 'Herford', 'Hotelmanagement / Touristik', 'abgesagt', false),
-- 41. Wiebke Krüger
('Wiebke', 'Krüger', 'wiebke@augenaerzte-krueger.de', 'Herford Hanse', NULL, 'angefragt', false),
-- 42. Julia Wrede
('Julia', 'Wrede', 'wrede@gmx.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 43. Dr. med. Christian Flottmann
('Dr. med. Christian', 'Flottmann', 'C.Flottmann@Lukas-Krankenhaus.de', 'Herford Widukind', NULL, 'angefragt', false),
-- 44. Dr. Arne-Christian Sigge
('Dr. Arne-Christian', 'Sigge', 'as2018@content.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 45. Dirk Moysig
('Dirk', 'Moysig', 'dirk.moysig@moysig.de', 'Herford', NULL, 'angefragt', false),
-- 46. Manfred Haverkamp
('Manfred', 'Haverkamp', 'haverkamp@h-id.com', 'Herford', NULL, 'angefragt', false),
-- 47. Sandra Bruns
('Sandra', 'Bruns', 'sandra.bruns@th-owl.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 48. Katharina Bollmann
('Katharina', 'Bollmann', 'Katharina.Bollmann@moysig.de', 'Herford', NULL, 'angefragt', false),
-- 49. Marcus Harm
('Marcus', 'Harm', 'marcus@buntwaesche.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 50. Andreas Kolesch
('Andreas', 'Kolesch', 'a_kolesch@westfalen-blatt.de', 'Herford', NULL, 'bestätigt', true),
-- 51. Alexander Kröger (Jugendaustausch)
('Alexander', 'Kröger', 'a.kroeger@akpr.de', 'Herford Widukind', 'Jugendaustausch international', 'angefragt', false),
-- 52. Magnus Gröger
('Magnus', 'Gröger', 'm.groeger@outlook.com', 'Herford Widukind', NULL, 'bestätigt', true),
-- 53. Dr. Tim Ostermann
('Dr. Tim', 'Ostermann', 'tim.ostermann@pv-rechtsanwaelte.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 54. Philipp Kalbertodt
('Philipp', 'Kalbertodt', 'pkalbertodt@gmail.com', 'Herford Widukind', 'Jura Anwalt/Staatsanwalt', 'angefragt', true),
-- 55. Mirco Schmidt (Jura)
('Mirco', 'Schmidt', 'post@mircoschmidt.de', 'Herford', 'Jura Richter', 'abgesagt', true),
-- 56. Marika Knollmann
('Marika', 'Knollmann', 'm.knollmann@kreis-herford.de', 'Herford', NULL, 'bestätigt', true),
-- 57. Mirco Schmidt (Kreisverwaltung)
('Mirco', 'Schmidt (Kreis)', 'm.schmidt@Kreis-Herford.de', 'Herford', NULL, 'angefragt', true),
-- 58. Kathleen Rahn
('Kathleen', 'Rahn', 'direktion@marta-herford.de', 'Herford Hanse', NULL, 'angefragt', false),
-- 59. Uwe Johann
('Uwe', 'Johann', 'Uwe.johann@marta-herford.de', 'Herford Hanse', NULL, 'abgesagt', false),
-- 60. Anna Peplisnki
('Anna', 'Peplinski', 'anna.peplinski@marta-herford.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 61. Melanie Pottebaum
('Melanie', 'Pottebaum', 'info@plant-landschaftsarchitektur.de', 'Herford Hanse', NULL, 'angefragt', true),
-- 62. Nils Kortemeier
('Nils', 'Kortemeier', 'nils.kortemeier@kortemeier-brokmann.de', 'Herford', NULL, 'abgesagt', true),
-- 63. Maximilian Marosch
('Maximilian', 'Marosch', 'marosch@weinrich-schokolade.de', 'Herford Widukind', 'Lebensmitteltechnologie', 'abgesagt', true),
-- 64. Thomas Bitter
('Thomas', 'Bitter', 'thomas.bitter@weinrich-schokolade.de', 'Herford Widukind', 'Lebensmitteltechnologie', 'abgesagt', true),
-- 65. Kai Böker
('Kai', 'Böker', 'BoekerKai@aol.com', 'Herford', 'Lehramt', 'abgesagt', false),
-- 66. Melina Seidel
('Melina', 'Seidel', 'melina.seidel@kmg.nrw.schule', 'Herford Widukind', NULL, 'bestätigt', true),
-- 67. Maximilian Falkner
('Maximilian', 'Falkner', 'maximilian.falkner@kmg.nrw.schule', 'Herford Widukind', NULL, 'bestätigt', true),
-- 68. Eduard Mesares
('Eduard', 'Mesares', 'eduard.mesares@juvandia.de', 'Herford', NULL, 'bestätigt', true),
-- 69. Florian Brune
('Florian', 'Brune', 'florian.brune@hettich.com', 'Herford', 'Maschinenbau u. Wirtschaftsinformatik im dualen Studium', 'abgesagt', false),
-- 70. Anny Sengpiel
('Anny', 'Sengpiel', 'anny.sengpiel@hettich.com', 'Herford', 'Maschinenbau u. Wirtschaftsinformatik im dualen Studium', 'abgesagt', false),
-- 71. Daniel Böske
('Daniel', 'Böske', 'd.boeske@t-online.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 72. Christian Althoff
('Christian', 'Althoff', 'christian.althoff@bauverlag.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 73. Maik Wörmann
('Maik', 'Wörmann', 'maik.woermann@brax.com', 'Herford', NULL, 'bestätigt', true),
-- 74. Tanja Kliewe-Meyer
('Tanja', 'Kliewe-Meyer', 'Tanja.Kliewe-Meyer@brax.com', 'Herford', NULL, 'bestätigt', true),
-- 75. Friedrich Luchterhandt
('Friedrich', 'Luchterhandt', NULL, 'Herford', 'Musik und Kirchenmusik', 'angefragt', false),
-- 76. Felix Hirn
('Felix', 'Hirn', 'felixhirn@gmx.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 77. Hans-Martin Kiefer
('Hans-Martin', 'Kiefer', 'hm.kiefer@web.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 78. Alexander Kröger (PR)
('Alexander', 'Kröger (PR)', 'A.Kroeger@akpr.de', 'Herford Hanse', NULL, 'angefragt', false),
-- 79. Birgit Deker (PR)
('Birgit', 'Deker (PR)', 'birgit.deker@t-online.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 80. Julia Deeb
('Julia', 'Deeb', 'julia.deeb1982@gmail.com', 'Herford Widukind', NULL, 'bestätigt', true),
-- 81. Hartmut Wiesemann
('Hartmut', 'Wiesemann', 'wiesemann@altstaedter-apotheke.de', 'Herford', NULL, 'bestätigt', true),
-- 82. Andreas Bohlen
('Andreas', 'Bohlen', 'bohlen@web.de', 'Herford Widukind', NULL, 'angefragt', false),
-- 83. Ulrich von Hülsen
('Ulrich', 'von Hülsen', 'uvonhuelsen@web.de', 'Herford', NULL, 'angefragt', false),
-- 84. Matthias Schmidt-Rubhart
('Matthias', 'Schmidt-Rubhart', 'matthiasr@physik.uni-bielefeld.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 85. Jan-Michael Gruhn
('Jan-Michael', 'Gruhn', 'gruhn@ejh-schweicheln.de', 'Herford Hanse', 'Politikwissenschaft', 'angefragt', false),
-- 86. Bernd Stienkemeier
('Bernd', 'Stienkemeier', 'bernd@stienkemeier.de', 'Herford', NULL, 'abgesagt', false),
-- 87. Steven Scott
('Steven', 'Scott', 'Steven.Scott@polizei.nrw.de', 'Herford', NULL, 'bestätigt', true),
-- 88. Dr. Blaschke
('Dr. Stephan', 'Blaschke', 'stephan.blaschke@klinikum-herford.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 89. Wolfgang Schmitz
('Wolfgang', 'Schmitz', 'info@praxis-schmitz-herford.de', 'Herford', NULL, 'bestätigt', true),
-- 90. Claudia Tielker
('Claudia', 'Tielker', 'tielker@ejh-schweicheln.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 91. Simone Wagner
('Simone', 'Wagner', 'christine.lehmann@arbeitsagentur.de', 'Herford', NULL, 'bestätigt', true),
-- 92. Nils Wörmann
('Nils', 'Wörmann', 'j.sellenriek@ksb-herford.de', 'Herford Hanse', NULL, 'angefragt', false),
-- 93. Julia Sellenriek
('Julia', 'Sellenriek', 'j.sellenriek@ksb-herford.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 94. Alers Denise
('Denise', 'Alers', 'denise.alers@herford.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 95. Christian Brandhorst
('Christian', 'Brandhorst', 'cbrandhorst@narando.de', 'Herford Widukind', NULL, 'angefragt', false),
-- 96. Oliver Flaskämper
('Oliver', 'Flaskämper', 'account.rotary@priority.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 97. Erich Steinmeier
('Erich', 'Steinmeier', 'Erich.Steinmeier@steinmeierconsulting.de', 'Herford', NULL, 'bestätigt', true),
-- 98. Christian Lux
('Christian', 'Lux', 'C.Lux@lux-partner.de', 'Herford Widukind', NULL, 'angefragt', true),
-- 99. Sandra Erdmann
('Sandra', 'Erdmann', 's.erdmann@studienfonds-owl.de', 'Herford', 'Stipendien/Fördermöglichkeit', 'abgesagt', true),
-- 100. Olaf Reinmuth
('Olaf', 'Reinmuth', 'olaf.reinmuth@gmail.com', 'Herford', NULL, 'bestätigt', true),
-- 101. Holger Gießelmann
('Holger', 'Gießelmann', NULL, 'Herford Widukind', 'Theologie - DiakonIn - Gemeindepädagogik', 'angefragt', false),
-- 102. Dr. Friederike Tunkel
('Dr. Friederike', 'Tunkel', 'dr.tunkel@fachtierarzt-praxis.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 103. Stefan Finger
('Stefan', 'Finger', 'stefan.finger@fh-mittelstand.de', 'Herford Widukind', 'Visuelle Kommunikation (Foto/Film/Graphik)', 'angefragt', true),
-- 104. Nicole Beltjes (VWL)
('Nicole', 'Beltjes (VWL)', 'info@abtundpetram.de', 'Herford Widukind', NULL, 'bestätigt', true),
-- 105. Joachim Ebmeyer
('Joachim', 'Ebmeyer', 'mail@joachim-ebmeyer.de', 'Herford Widukind', NULL, 'abgesagt', true),
-- 106. Florian Richter (Vorsorge)
('Florian', 'Richter (Vorsorge)', 'florian.richter@volksbankinostwestfalen.de', 'Herford Hanse', NULL, 'bestätigt', true),
-- 107. Elena Limpke (WI)
('Elena', 'Limpke (WI)', 'Elena.Limpke@kannegiesser.de', 'Herford', NULL, 'bestätigt', true),
-- 108. Lars Krüger
('Lars', 'Krüger', 'lars@krueger-ib.de', 'Herford Widukind', 'Wirtschaftsingenieur', 'abgesagt', true),
-- 109. Dr. Heiko Reese
('Dr. Heiko', 'Reese', 'dresreese@aol.com', 'Herford', NULL, 'abgesagt', true),
-- 110. Karsten Könemann
('Karsten', 'Könemann', 'dr.k.koenemann@t-online.de', 'Herford Hanse', NULL, 'bestätigt', true);

-- ============================================
-- Zuordnungen (Referent → Berufsfeld)
-- ============================================
-- Wir verwenden Subqueries um IDs aufzulösen

-- Agraringenieurswesen gibt es nicht als Berufsfeld - überspringen (Referenten 2-4)

-- 5. Schlattmeier → Architektur
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Schlattmeier' AND b.name = 'Architektur';

-- 6. Richter → Banking BWL
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Florian' AND r.nachname = 'Richter' AND b.name = 'Banking BWL im Dualem Studium';

-- 7-8. Bockermann, Potthast → Bauingenieurwesen
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Bockermann' AND b.name = 'Bauingenieurwesen';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Potthast' AND b.name = 'Bauingenieurwesen';

-- 9-10. Beltjes, Vynogradova → BWL
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Nicole' AND r.nachname = 'Beltjes' AND b.name = 'Betriebswirtschaftslehre';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Vynogradova' AND b.name = 'Betriebswirtschaftslehre';

-- 11. Hasenbein → Biologie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Hasenbein' AND b.name = 'Biologie';

-- 12. Spahr → Bundeswehr
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Spahr' AND b.name = 'Bundeswehr';

-- 13-14. Mix, Biller → Chemie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Mix' AND b.name = 'Chemie / Chemieingenieurwesen';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Biller' AND b.name = 'Chemie / Chemieingenieurwesen';

-- 15. Meierjürgen → Digital Management
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Meierjürgen' AND b.name = 'Digital Management Solutions';

-- 16-17. Sigmund, Schake → Diplomfinanzwirt
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Sigmund' AND b.name = 'Diplomfinanzwirt FH (im Dualem Studium)';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Schake' AND b.name = 'Diplomfinanzwirt FH (im Dualem Studium)';

-- 18-19. Kizinna, Kerperien → Duales Studium
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kizinna' AND b.name = 'Duales Studium';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kerperien' AND b.name = 'Duales Studium';

-- 20. Limpke → Elektrotechnik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Elena' AND r.nachname = 'Limpke' AND b.name = 'Elektrotechnik';

-- 21. Menke → Erziehungswissenschaft
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Menke' AND b.name = 'Erziehungswissenschaft / Pädagogik';

-- 22. Otte → Eventmanagement
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Otte' AND b.name = 'Eventmanagement';

-- 23. Brinskelle → Fit fürs Studium
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Brinskelle' AND b.name LIKE 'Fit fürs Studium%';

-- 24. Rottschäfer → Forstwissenschaft
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Rottschäfer' AND b.name = 'Forstwissenschaft';

-- 25. Lehmann → Fremdsprachen
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Lehmann' AND b.name = 'Fremdsprachen';

-- 27. Deker → Germanistik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Birgit' AND r.nachname = 'Deker' AND b.name LIKE 'Germanistik%';

-- 28. Hübner → Gesundheitswissenschaften
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Hübner' AND b.name LIKE 'Gesundheitswissenschaften%';

-- 29-30. Dickel, Paschetag → Grafik/Kommunikationsdesign
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Dickel' AND b.name LIKE 'Grafik%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Paschetag' AND b.name LIKE 'Grafik%';

-- 31. Siebrasse → Grundschullehramt
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Siebrasse' AND b.name = 'Grundschullehramt';

-- 32. Krause → Grundschullehramt (Sonderpädagogik)
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Krause' AND b.name = 'Grundschullehramt';

-- 33-35. Wippich, Klischat, Baumblüth → Hebammenwissenschaft (nicht in Liste - Bemerkung nutzen)
-- Hebammenwissenschaft ist kein eigenes Berufsfeld → überspringen oder Gesundheitswissenschaften

-- 41-43. Krüger, Wrede, Flottmann → Humanmedizin
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Wiebke' AND r.nachname = 'Krüger' AND b.name = 'Humanmedizin';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Wrede' AND b.name = 'Humanmedizin';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Flottmann' AND b.name = 'Humanmedizin';

-- 44. Sigge → Informatik/IT
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Sigge' AND b.name = 'Informatik/IT';

-- 45-48. Moysig, Haverkamp, Bruns, Bollmann → Innenarchitektur
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Moysig' AND b.name = 'Innenarchitektur';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Haverkamp' AND b.name = 'Innenarchitektur';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Bruns' AND b.name = 'Innenarchitektur';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Bollmann' AND b.name = 'Innenarchitektur';

-- 49. Harm → Internationaler Schüleraustausch
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Harm' AND b.name LIKE 'Internat%';

-- 50. Kolesch → Journalismus
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kolesch' AND b.name LIKE 'Journalismus%';

-- 52-53. Gröger, Ostermann → Jura Anwalt/Richter
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Gröger' AND b.name LIKE 'Jura%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Ostermann' AND b.name LIKE 'Jura%';

-- 54. Kalbertodt → Jura (Anwalt)
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kalbertodt' AND b.name LIKE 'Jura%';

-- 55. Schmidt (Jura) → Jura
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Mirco' AND r.nachname = 'Schmidt' AND b.name LIKE 'Jura%';

-- 56. Knollmann → Kreisverwaltung
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Knollmann' AND b.name LIKE 'Kreisverwaltung%';

-- 57. Schmidt (Kreis) → Kreisverwaltung
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Schmidt (Kreis)' AND b.name LIKE 'Kreisverwaltung%';

-- 58-60. Rahn, Johann, Peplinski → Kulturmanagement
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Rahn' AND b.name LIKE 'Kulturmanagement%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Johann' AND b.name LIKE 'Kulturmanagement%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Peplinski' AND b.name LIKE 'Kulturmanagement%';

-- 66-67. Seidel, Falkner → Lehramt
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Seidel' AND b.name LIKE 'Lehramt%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Falkner' AND b.name LIKE 'Lehramt%';

-- 68. Mesares → Marketing
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Mesares' AND b.name = 'Marketing';

-- 71. Böske → Mathematik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Böske' AND b.name LIKE 'Mathematik%';

-- 72. Althoff → Mediengestaltung → Grafik/Kommunikationsdesign
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Althoff' AND b.name LIKE 'Grafik%';

-- 73. Wörmann → Mode Duale Ausbildung
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.vorname = 'Maik' AND r.nachname = 'Wörmann' AND b.name LIKE 'Mode - Duale%';

-- 74. Kliewe-Meyer → Mode Studium
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kliewe-Meyer' AND b.name LIKE 'Mode - Studium%';

-- 76-77. Hirn, Kiefer → Musik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Hirn' AND b.name = 'Musik und Kirchenmusik';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Kiefer' AND b.name = 'Musik und Kirchenmusik';

-- 79. Deker (PR) → Öffentlichkeitsarbeit/PR
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Deker (PR)' AND b.name LIKE 'Öffentlichkeitsarbeit%';

-- 80. Deeb → Pflegemanagement
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Deeb' AND b.name LIKE 'Pflegemanagement%';

-- 81-82. Wiesemann, Bohlen → Pharmazie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Wiesemann' AND b.name = 'Pharmazie';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Bohlen' AND b.name = 'Pharmazie';

-- 84. Schmidt-Rubhart → Physik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Schmidt-Rubhart' AND b.name = 'Physik';

-- 87. Scott → Polizeidienst
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Scott' AND b.name = 'Polizeidienst';

-- 88. Blaschke → Psychiatrie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Blaschke' AND b.name = 'Psychiatrie';

-- 89. Schmitz → Psychologie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Schmitz' AND b.name = 'Psychologie';

-- 90. Tielker → Sozialarbeit
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Tielker' AND b.name LIKE 'Sozialarbeit%';

-- 91. Wagner → Soziologie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Wagner' AND b.name = 'Soziologie';

-- 93. Sellenriek → Sportwissenschaften
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Sellenriek' AND b.name = 'Sportwissenschaften';

-- 94. Alers → Stadtverwaltung
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Alers' AND b.name LIKE 'Stadtverwaltung%';

-- 96. Flaskämper → Start up
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Flaskämper' AND b.name LIKE 'Start up%';

-- 97-98. Steinmeier, Lux → Steuerberater
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Steinmeier' AND b.name LIKE 'Steuerberater%';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Lux' AND b.name LIKE 'Steuerberater%';

-- 100. Reinmuth → Theologie
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Reinmuth' AND b.name = 'Theologie';

-- 102. Tunkel → Tiermedizin
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Tunkel' AND b.name = 'Tiermedizin';

-- 103. Finger → Grafik (Visuelle Kommunikation)
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Finger' AND b.name LIKE 'Grafik%';

-- 104-105. Beltjes (VWL), Ebmeyer → Volkswirtschaftslehre
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Beltjes (VWL)' AND b.name = 'Volkswirtschaftslehre';

INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Ebmeyer' AND b.name = 'Volkswirtschaftslehre';

-- 106. Richter (Vorsorge) → Vorsorge
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Richter (Vorsorge)' AND b.name LIKE 'Vorsorge%';

-- 107. Limpke (WI) → Wirtschaftsinformatik
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Limpke (WI)' AND b.name = 'Wirtschaftsinformatik';

-- 110. Könemann → Zahnmedizin
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Könemann' AND b.name = 'Zahnmedizin';

-- 109. Reese → Zahnmedizin
INSERT INTO zuordnungen (referent_id, berufsfeld_id)
SELECT r.id, b.id FROM referenten r, berufsfelder b
WHERE r.nachname = 'Reese' AND b.name = 'Zahnmedizin';

-- 61-62. Pottebaum, Kortemeier → Landschaftsarchitektur (nicht in Berufsfelder-Liste)
-- Diese Zuordnungen werden übersprungen, da kein passendes Berufsfeld existiert

-- Zählung ausgeben
SELECT 'Referenten importiert:' as info, COUNT(*) as anzahl FROM referenten
UNION ALL
SELECT 'Zuordnungen erstellt:', COUNT(*) FROM zuordnungen;
