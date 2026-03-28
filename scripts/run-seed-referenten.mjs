import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://gldigcsmoxhdzfvoipts.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY env var not set');
  console.error('Get it from: https://supabase.com/dashboard/project/gldigcsmoxhdzfvoipts/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function seed() {
  console.log('🗑️  Lösche bestehende Zuordnungen...');
  await supabase.from('zuordnungen').delete().neq('referent_id', 0);

  console.log('🗑️  Lösche bestehende Referenten...');
  await supabase.from('referenten').delete().neq('id', 0);

  // Alle Berufsfelder laden
  const { data: berufsfelder } = await supabase.from('berufsfelder').select('id, name');
  const bfMap = {};
  berufsfelder.forEach(bf => bfMap[bf.name] = bf.id);
  console.log(`📋 ${berufsfelder.length} Berufsfelder geladen`);

  // Referenten-Daten
  const referenten = [
    { vorname: 'Team', nachname: 'HerBI', email: 'referenten@herbi.rocks', club: 'Herford Widukind', status: 'bestätigt', anzeigen: false, berufsfeld: null },
    { vorname: 'Isab', nachname: 'deel.stroop', email: 'isab.deel.stroop@lwk.nrw', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, berufsfeld: null, bemerkung: 'Agraringenieurswesen' },
    { vorname: 'Silvia', nachname: 'Noje-Rolf', email: 'Silvia.Noje-Rolf@lwk.nrw.de', club: 'Herford Hanse', status: 'abgesagt', anzeigen: false, berufsfeld: null, bemerkung: 'Agraringenieurswesen' },
    { vorname: 'Fabian', nachname: 'Kiera', email: 'Fabian.Kiera@lwk.nrw.de', club: 'Herford Hanse', status: 'abgesagt', anzeigen: false, berufsfeld: null, bemerkung: 'Agraringenieurswesen' },
    { vorname: 'Karsten Friedrich', nachname: 'Schlattmeier', email: 'karsten@schlattmeier-architekten.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Architektur' },
    { vorname: 'Florian', nachname: 'Richter', email: 'florian.richter@volksbankinostwestfalen.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Banking BWL im Dualem Studium' },
    { vorname: 'Dr. Klaus', nachname: 'Bockermann', email: 'klaus.bockermann@t-online.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Bauingenieurwesen' },
    { vorname: 'Laura', nachname: 'Potthast', email: 'Laura.Potthast@bockermann-fritze.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Bauingenieurwesen' },
    { vorname: 'Nicole', nachname: 'Beltjes', email: 'info@abtundpetram.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Betriebswirtschaftslehre' },
    { vorname: 'Lena', nachname: 'Vynogradova', email: 'lena.vynogradova@bertelsmann.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Betriebswirtschaftslehre' },
    { vorname: 'Dr. Nils', nachname: 'Hasenbein', email: 'nils.hasenbein@uni-bielefeld.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Biologie' },
    { vorname: 'Thomas', nachname: 'Spahr', email: 'karrbbherford@bundeswehr.org', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Bundeswehr' },
    { vorname: 'Dr. Andreas', nachname: 'Mix', email: 'a.mix@uni-bielefeld.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Chemie / Chemieingenieurwesen' },
    { vorname: 'Dr. Simon', nachname: 'Biller', email: 's.biller@budich.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: true, berufsfeld: 'Chemie / Chemieingenieurwesen' },
    { vorname: 'Stefanie', nachname: 'Meierjürgen', email: 'stefanie.meierjuergen@th-owl.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Digital Management Solutions' },
    { vorname: 'Patrick', nachname: 'Sigmund', email: 'patrick.sigmund@fv.nrw.de', club: 'Herford', status: 'abgesagt', anzeigen: false, berufsfeld: 'Diplomfinanzwirt FH (im Dualem Studium)' },
    { vorname: 'Annika', nachname: 'Schake', email: 'annika@stehr.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Diplomfinanzwirt FH (im Dualem Studium)' },
    { vorname: 'Sebastian', nachname: 'Kizinna', email: 's.kizinna@hs-osnabrueck.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: true, berufsfeld: 'Duales Studium' },
    { vorname: 'Alina', nachname: 'Kerperien', email: 'a.kerperien@hs-osnabrueck.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Duales Studium' },
    { vorname: 'Elena', nachname: 'Limpke', email: 'elena.limpke@kannegiesser.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Elektrotechnik' },
    { vorname: 'Daniela', nachname: 'Menke', email: 'Daniela.Menke@Herford.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Erziehungswissenschaft / Pädagogik' },
    { vorname: 'Anna', nachname: 'Otte', email: 'anna.otte@obsthof-otte.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Eventmanagement' },
    { vorname: 'Jette', nachname: 'Brinskelle', email: 'jettebrinskelle@web.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Fit fürs Studium?' },
    { vorname: 'Fabian', nachname: 'Rottschäfer', email: 'fabian.rottschaefer@fichtner.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Forstwissenschaft' },
    { vorname: 'Christine', nachname: 'Lehmann', email: 'christine.lehmann@arbeitsagentur.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Fremdsprachen' },
    { vorname: 'Nicklas', nachname: 'Scharpff', email: null, club: 'Herford Widukind', status: 'angefragt', anzeigen: false, bemerkung: 'Game-Design' },
    { vorname: 'Birgit', nachname: 'Deker', email: 'birgit.deker@t-online.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Germanistik / Literaturwissenschaften' },
    { vorname: 'Jenny', nachname: 'Hübner', email: 'jennyhoecker@gmail.com', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Gesundheitswissenschaften / Public Health' },
    { vorname: 'Jochen', nachname: 'Dickel', email: 'Jochen.dickel@fh-mittelstand.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Grafik-/Kommunikationsdesign/Gestaltung' },
    { vorname: 'Tina', nachname: 'Paschetag', email: 'mail@bueropaschetag.de', club: 'Herford Widukind', status: 'abgesagt', anzeigen: true, berufsfeld: 'Grafik-/Kommunikationsdesign/Gestaltung' },
    { vorname: 'Christiane', nachname: 'Siebrasse', email: 'christiane.siebrasse@herford.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Grundschullehramt' },
    { vorname: 'Ilka', nachname: 'Krause', email: 'ikrause@web.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Grundschullehramt', bemerkung: 'Grundschullehramt/ Sonderpädagogik' },
    { vorname: 'Johanna', nachname: 'Wippich', email: 'johanna.wippich@geburtshaus-bielefeld.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, bemerkung: 'Hebammenwissenschaft' },
    { vorname: 'Maximilian', nachname: 'Klischat', email: 'maximilian.klischat@fh-mittelstand.de', club: 'Herford', status: 'angefragt', anzeigen: true, bemerkung: 'Hebammenwissenschaft' },
    { vorname: 'Lara', nachname: 'Baumblüth', email: 'lara.baumblueth@fh-mittelstand.de', club: 'Herford', status: 'angefragt', anzeigen: true, bemerkung: 'Hebammenwissenschaft' },
    { vorname: 'Wolfram', nachname: 'Jacob', email: 'jacob@arbeitgeberverband-herford.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: false, bemerkung: 'HerBI Team' },
    { vorname: 'Nicole', nachname: 'Beltjes', email: 'nicole.beltjes@abtundpetram.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: false, bemerkung: 'HerBI Team' },
    { vorname: 'Julian', nachname: 'Schütz', email: 'Julian.Schuetz@ruhr-uni-bochum.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: false, bemerkung: 'HerBI Team' },
    { vorname: 'Anna Christina', nachname: 'Grefe', email: 'anna.grefe@gmx.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: false, bemerkung: 'HerBI Team' },
    { vorname: 'Svenja', nachname: 'Groeschell', email: 'sgroeschell.sbs@maritim.de', club: 'Herford', status: 'abgesagt', anzeigen: false, bemerkung: 'Hotelmanagement / Touristik' },
    { vorname: 'Wiebke', nachname: 'Krüger', email: 'wiebke@augenaerzte-krueger.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, berufsfeld: 'Humanmedizin' },
    { vorname: 'Julia', nachname: 'Wrede', email: 'wrede@gmx.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Humanmedizin' },
    { vorname: 'Dr. med. Christian', nachname: 'Flottmann', email: 'C.Flottmann@Lukas-Krankenhaus.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Humanmedizin' },
    { vorname: 'Dr. Arne-Christian', nachname: 'Sigge', email: 'as2018@content.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Informatik/IT' },
    { vorname: 'Dirk', nachname: 'Moysig', email: 'dirk.moysig@moysig.de', club: 'Herford', status: 'angefragt', anzeigen: false, berufsfeld: 'Innenarchitektur' },
    { vorname: 'Manfred', nachname: 'Haverkamp', email: 'haverkamp@h-id.com', club: 'Herford', status: 'angefragt', anzeigen: false, berufsfeld: 'Innenarchitektur' },
    { vorname: 'Sandra', nachname: 'Bruns', email: 'sandra.bruns@th-owl.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Innenarchitektur' },
    { vorname: 'Katharina', nachname: 'Bollmann', email: 'Katharina.Bollmann@moysig.de', club: 'Herford', status: 'angefragt', anzeigen: false, berufsfeld: 'Innenarchitektur' },
    { vorname: 'Marcus', nachname: 'Harm', email: 'marcus@buntwaesche.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Internat. Schüleraustausch mit Rotary' },
    { vorname: 'Andreas', nachname: 'Kolesch', email: 'a_kolesch@westfalen-blatt.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Journalismus/Klassische Medien' },
    { vorname: 'Alexander', nachname: 'Kröger', email: 'a.kroeger@akpr.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, bemerkung: 'Jugendaustausch international' },
    { vorname: 'Magnus', nachname: 'Gröger', email: 'm.groeger@outlook.com', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Jura - Anwalt / Richter' },
    { vorname: 'Dr. Tim', nachname: 'Ostermann', email: 'tim.ostermann@pv-rechtsanwaelte.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Jura - Anwalt / Richter' },
    { vorname: 'Philipp', nachname: 'Kalbertodt', email: 'pkalbertodt@gmail.com', club: 'Herford Widukind', status: 'angefragt', anzeigen: true, berufsfeld: 'Jura - Anwalt / Richter', bemerkung: 'Jura Anwalt/Staatsanwalt' },
    { vorname: 'Mirco', nachname: 'Schmidt', email: 'post@mircoschmidt.de', club: 'Herford', status: 'abgesagt', anzeigen: true, berufsfeld: 'Jura - Anwalt / Richter', bemerkung: 'Jura Richter' },
    { vorname: 'Marika', nachname: 'Knollmann', email: 'm.knollmann@kreis-herford.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Kreisverwaltung / öffentliche Verwaltung' },
    { vorname: 'Mirco', nachname: 'Schmidt', email: 'm.schmidt@Kreis-Herford.de', club: 'Herford', status: 'angefragt', anzeigen: true, berufsfeld: 'Kreisverwaltung / öffentliche Verwaltung' },
    { vorname: 'Kathleen', nachname: 'Rahn', email: 'direktion@marta-herford.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, berufsfeld: 'Kulturmanagement/Kunst/Museum' },
    { vorname: 'Uwe', nachname: 'Johann', email: 'Uwe.johann@marta-herford.de', club: 'Herford Hanse', status: 'abgesagt', anzeigen: false, berufsfeld: 'Kulturmanagement/Kunst/Museum' },
    { vorname: 'Anna', nachname: 'Peplinski', email: 'anna.peplinski@marta-herford.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Kulturmanagement/Kunst/Museum' },
    { vorname: 'Melanie', nachname: 'Pottebaum', email: 'info@plant-landschaftsarchitektur.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: true, bemerkung: 'Landschaftsarchitektur' },
    { vorname: 'Nils', nachname: 'Kortemeier', email: 'nils.kortemeier@kortemeier-brokmann.de', club: 'Herford', status: 'abgesagt', anzeigen: true, bemerkung: 'Landschaftsarchitektur' },
    { vorname: 'Maximilian', nachname: 'Marosch', email: 'marosch@weinrich-schokolade.de', club: 'Herford Widukind', status: 'abgesagt', anzeigen: true, bemerkung: 'Lebensmitteltechnologie' },
    { vorname: 'Thomas', nachname: 'Bitter', email: 'thomas.bitter@weinrich-schokolade.de', club: 'Herford Widukind', status: 'abgesagt', anzeigen: true, bemerkung: 'Lebensmitteltechnologie' },
    { vorname: 'Kai', nachname: 'Böker', email: 'BoekerKai@aol.com', club: 'Herford', status: 'abgesagt', anzeigen: false, bemerkung: 'Lehramt' },
    { vorname: 'Melina', nachname: 'Seidel', email: 'melina.seidel@kmg.nrw.schule', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Lehramt - nicht Grundschule' },
    { vorname: 'Maximilian', nachname: 'Falkner', email: 'maximilian.falkner@kmg.nrw.schule', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Lehramt - nicht Grundschule' },
    { vorname: 'Eduard', nachname: 'Mesares', email: 'eduard.mesares@juvandia.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Marketing' },
    { vorname: 'Florian', nachname: 'Brune', email: 'florian.brune@hettich.com', club: 'Herford', status: 'abgesagt', anzeigen: false, bemerkung: 'Maschinenbau u. Wirtschaftsinformatik' },
    { vorname: 'Anny', nachname: 'Sengpiel', email: 'anny.sengpiel@hettich.com', club: 'Herford', status: 'abgesagt', anzeigen: false, bemerkung: 'Maschinenbau u. Wirtschaftsinformatik' },
    { vorname: 'Daniel', nachname: 'Böske', email: 'd.boeske@t-online.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Mathematik - nicht Lehramt' },
    { vorname: 'Christian', nachname: 'Althoff', email: 'christian.althoff@bauverlag.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, bemerkung: 'Mediengestaltung', berufsfeld: 'Grafik-/Kommunikationsdesign/Gestaltung' },
    { vorname: 'Maik', nachname: 'Wörmann', email: 'maik.woermann@brax.com', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Mode - Duale Ausbildung' },
    { vorname: 'Tanja', nachname: 'Kliewe-Meyer', email: 'Tanja.Kliewe-Meyer@brax.com', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Mode - Studium Textil und Mode' },
    { vorname: 'Friedrich', nachname: 'Luchterhandt', email: null, club: 'Herford', status: 'angefragt', anzeigen: false, berufsfeld: 'Musik und Kirchenmusik' },
    { vorname: 'Felix', nachname: 'Hirn', email: 'felixhirn@gmx.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Musik und Kirchenmusik' },
    { vorname: 'Hans-Martin', nachname: 'Kiefer', email: 'hm.kiefer@web.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Musik und Kirchenmusik' },
    { vorname: 'Alexander', nachname: 'Kröger', email: 'A.Kroeger@akpr.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, berufsfeld: 'Öffentlichkeitsarbeit/PR' },
    { vorname: 'Birgit', nachname: 'Deker', email: 'birgit.deker@t-online.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Öffentlichkeitsarbeit/PR' },
    { vorname: 'Julia', nachname: 'Deeb', email: 'julia.deeb1982@gmail.com', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Pflegemanagement / intern. BA/MA' },
    { vorname: 'Hartmut', nachname: 'Wiesemann', email: 'wiesemann@altstaedter-apotheke.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Pharmazie' },
    { vorname: 'Andreas', nachname: 'Bohlen', email: 'bohlen@web.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Pharmazie' },
    { vorname: 'Ulrich', nachname: 'von Hülsen', email: 'uvonhuelsen@web.de', club: 'Herford', status: 'angefragt', anzeigen: false, berufsfeld: 'Physik' },
    { vorname: 'Matthias', nachname: 'Schmidt-Rubhart', email: 'matthiasr@physik.uni-bielefeld.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Physik' },
    { vorname: 'Jan-Michael', nachname: 'Gruhn', email: 'gruhn@ejh-schweicheln.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, bemerkung: 'Politikwissenschaft' },
    { vorname: 'Bernd', nachname: 'Stienkemeier', email: 'bernd@stienkemeier.de', club: 'Herford', status: 'abgesagt', anzeigen: false, berufsfeld: 'Polizeidienst' },
    { vorname: 'Steven', nachname: 'Scott', email: 'Steven.Scott@polizei.nrw.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Polizeidienst' },
    { vorname: 'Dr. Stephan', nachname: 'Blaschke', email: 'stephan.blaschke@klinikum-herford.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Psychiatrie' },
    { vorname: 'Wolfgang', nachname: 'Schmitz', email: 'info@praxis-schmitz-herford.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Psychologie' },
    { vorname: 'Claudia', nachname: 'Tielker', email: 'tielker@ejh-schweicheln.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Sozialarbeit / Sozialpädagogik' },
    { vorname: 'Simone', nachname: 'Wagner', email: 'christine.lehmann@arbeitsagentur.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Soziologie' },
    { vorname: 'Nils', nachname: 'Wörmann', email: 'j.sellenriek@ksb-herford.de', club: 'Herford Hanse', status: 'angefragt', anzeigen: false, berufsfeld: 'Sportwissenschaften' },
    { vorname: 'Julia', nachname: 'Sellenriek', email: 'j.sellenriek@ksb-herford.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Sportwissenschaften' },
    { vorname: 'Denise', nachname: 'Alers', email: 'denise.alers@herford.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Stadtverwaltung Bachelor of Laws' },
    { vorname: 'Christian', nachname: 'Brandhorst', email: 'cbrandhorst@narando.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Start up / Das eigene Unternehmen' },
    { vorname: 'Oliver', nachname: 'Flaskämper', email: 'account.rotary@priority.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Start up / Das eigene Unternehmen' },
    { vorname: 'Erich', nachname: 'Steinmeier', email: 'Erich.Steinmeier@steinmeierconsulting.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Steuerberater / Wirtschaftsprüfer' },
    { vorname: 'Christian', nachname: 'Lux', email: 'C.Lux@lux-partner.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: true, berufsfeld: 'Steuerberater / Wirtschaftsprüfer' },
    { vorname: 'Sandra', nachname: 'Erdmann', email: 's.erdmann@studienfonds-owl.de', club: 'Herford', status: 'abgesagt', anzeigen: true, bemerkung: 'Stipendien/Fördermöglichkeit' },
    { vorname: 'Olaf', nachname: 'Reinmuth', email: 'olaf.reinmuth@gmail.com', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Theologie' },
    { vorname: 'Holger', nachname: 'Gießelmann', email: null, club: 'Herford Widukind', status: 'angefragt', anzeigen: false, berufsfeld: 'Theologie', bemerkung: 'DiakonIn - Gemeindepädagogik' },
    { vorname: 'Dr. Friederike', nachname: 'Tunkel', email: 'dr.tunkel@fachtierarzt-praxis.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Tiermedizin' },
    { vorname: 'Stefan', nachname: 'Finger', email: 'stefan.finger@fh-mittelstand.de', club: 'Herford Widukind', status: 'angefragt', anzeigen: true, berufsfeld: 'Grafik-/Kommunikationsdesign/Gestaltung', bemerkung: 'Visuelle Kommunikation' },
    { vorname: 'Nicole', nachname: 'Beltjes', email: 'info@abtundpetram.de', club: 'Herford Widukind', status: 'bestätigt', anzeigen: true, berufsfeld: 'Volkswirtschaftslehre' },
    { vorname: 'Joachim', nachname: 'Ebmeyer', email: 'mail@joachim-ebmeyer.de', club: 'Herford Widukind', status: 'abgesagt', anzeigen: true, berufsfeld: 'Volkswirtschaftslehre' },
    { vorname: 'Florian', nachname: 'Richter', email: 'florian.richter@volksbankinostwestfalen.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Vorsorge & Absicherung des Studiums' },
    { vorname: 'Elena', nachname: 'Limpke', email: 'Elena.Limpke@kannegiesser.de', club: 'Herford', status: 'bestätigt', anzeigen: true, berufsfeld: 'Wirtschaftsinformatik' },
    { vorname: 'Lars', nachname: 'Krüger', email: 'lars@krueger-ib.de', club: 'Herford Widukind', status: 'abgesagt', anzeigen: true, bemerkung: 'Wirtschaftsingenieur' },
    { vorname: 'Dr. Heiko', nachname: 'Reese', email: 'dresreese@aol.com', club: 'Herford', status: 'abgesagt', anzeigen: true, berufsfeld: 'Zahnmedizin' },
    { vorname: 'Karsten', nachname: 'Könemann', email: 'dr.k.koenemann@t-online.de', club: 'Herford Hanse', status: 'bestätigt', anzeigen: true, berufsfeld: 'Zahnmedizin' },
  ];

  console.log(`👥 Importiere ${referenten.length} Referenten...`);

  let insertedCount = 0;
  let zuordnungCount = 0;
  let errors = [];

  for (const ref of referenten) {
    const { berufsfeld, ...refData } = ref;

    const { data: inserted, error } = await supabase
      .from('referenten')
      .insert({
        vorname: refData.vorname,
        nachname: refData.nachname,
        email: refData.email,
        club: refData.club,
        bemerkung: refData.bemerkung || null,
        status: refData.status,
        anzeigen: refData.anzeigen
      })
      .select('id')
      .single();

    if (error) {
      errors.push(`❌ ${refData.vorname} ${refData.nachname}: ${error.message}`);
      continue;
    }
    insertedCount++;

    // Zuordnung erstellen
    if (berufsfeld && bfMap[berufsfeld]) {
      const { error: zError } = await supabase
        .from('zuordnungen')
        .insert({
          referent_id: inserted.id,
          berufsfeld_id: bfMap[berufsfeld]
        });

      if (zError) {
        errors.push(`⚠️ Zuordnung ${refData.nachname} → ${berufsfeld}: ${zError.message}`);
      } else {
        zuordnungCount++;
      }
    } else if (berufsfeld) {
      errors.push(`⚠️ Berufsfeld nicht gefunden: "${berufsfeld}" (für ${refData.nachname})`);
    }
  }

  console.log(`\n✅ ${insertedCount} Referenten importiert`);
  console.log(`✅ ${zuordnungCount} Zuordnungen erstellt`);

  if (errors.length > 0) {
    console.log(`\n⚠️ ${errors.length} Hinweise:`);
    errors.forEach(e => console.log(`  ${e}`));
  }
}

seed().catch(console.error);
