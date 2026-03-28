import Link from 'next/link'

export default function StartPage() {
  return (
    <>
      {/* Hero-Bereich */}
      <section className="bg-herbi-orange">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">
          {/* Hero-Bild */}
          <div className="relative min-h-[300px] md:min-h-[500px]">
            <img
              src="/images/head-herbi-leitmotiv.jpg"
              alt="HerBI Leitmotiv – Junge Menschen zeigen aufeinander"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero-Text */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-herbi-blue italic">
              Was ist <span className="text-herbi-red">dein Ding?</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-herbi-blue italic mt-2">
              Finde DAS Studium, dAS zu dir passt.
            </h3>
            <p className="mt-4 text-gray-900 leading-relaxed">
              Unter diesem Motto steht der 17. Herforder Berufsinformationstag HerBI,
              organisiert von den Rotary Clubs im Kreis Herford. Über 50 Referentinnen
              und Referenten gewähren Einblicke in überwiegend akademische Berufsfelder
              und Themen. Infos aus erster Hand: aus der Praxis – für die Praxis!
              Die Jobprofis aus vielen Fachrichtungen erläutern dir die Berufsbilder,
              geben Tipps und stellen sich deinen ganz individuellen Fragen.
            </p>
            <div className="mt-6">
              <Link
                href="/berufsfelder"
                className="inline-block bg-herbi-red hover:bg-red-800 text-white font-bold px-8 py-3 transition text-lg"
              >
                Let&apos;s rock!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eckdaten-Kacheln */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl mb-3 text-herbi-red">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-herbi-red">30.01.2026</h3>
            <p className="text-sm text-gray-600 mt-2">
              Der Berufsinformationstag startet um 14:30 Uhr und endet um 17:30 Uhr
              (Tombola ca. 17:10 Uhr).
            </p>
          </div>

          <div>
            <div className="text-5xl mb-3 text-herbi-red">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-herbi-red">SchülerInnen mit Studienwunsch</h3>
            <p className="text-sm text-gray-600 mt-2">
              Für SchülerInnen der EF bis Q2 der gymnasialen Oberstufen und Berufskollegs
              und der 10. Klasse an Gymnasien, Real- und Hauptschulen.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-3 text-herbi-red">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-herbi-red">Königin-Mathilde-Gymnasium</h3>
            <p className="text-sm text-gray-600 mt-2">
              HerBI findet in 2026 am Königin-Mathilde-Gymnasium statt
              (Vlothoer Str. 1, 32049 Herford).
            </p>
          </div>

          <div>
            <div className="text-5xl mb-3 text-herbi-red">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4S4 2.5 4 6v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-herbi-red">Bus-Shuttle</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ein kostenfreier Shuttle-Bus fährt von und nach Bünde und Löhne.
            </p>
          </div>
        </div>
      </section>

      {/* Berufsfelder-Teaser */}
      <section className="bg-herbi-orange">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              50 Berufsfelder in Live-Talks:
            </h2>
            <h3 className="text-xl md:text-2xl font-normal text-gray-900 mt-1">
              Von Architektur bis Zahnmedizin
            </h3>
            <p className="mt-4 text-gray-900 leading-relaxed">
              Du überlegst, ob ein Studium das Richtige für dich ist? Dann informiere
              dich beim HerBI Berufsinformationstag über mögliche Studiengänge und
              erfahre von unseren Referenten aus der Praxis, wie du das Studium für
              dich beruflich nutzen kannst.
            </p>
            <div className="mt-6">
              <Link
                href="/berufsfelder"
                className="inline-block bg-herbi-red hover:bg-red-800 text-white font-bold px-8 py-3 transition"
              >
                Berufsfelder entdecken
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px] md:min-h-[400px]">
            <img
              src="/images/head-studienberufe.jpg"
              alt="Sneaker vor Pfeilen – Welchen Weg gehst du?"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sponsoren */}
      <section className="bg-herbi-gray py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Unsere Sponsoren
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img src="/images/bockermann-fritze.png" alt="Bockermann Fritze IngenieurConsult" className="h-12 object-contain" />
            <img src="/images/brax.png" alt="Brax" className="h-10 object-contain" />
            <img src="/images/bugatti.png" alt="Bugatti" className="h-8 object-contain" />
            <img src="/images/volksbank-owl.png" alt="Volksbank in Ostwestfalen" className="h-12 object-contain" />
          </div>
        </div>
      </section>

      {/* Tombola & Fördergelder */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-lg">
          <div className="relative min-h-[250px]">
            <img
              src="/images/teaser-tablet-tombola-preise.jpg"
              alt="Tombola und Preise"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-herbi-orange p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-herbi-blue mb-4">
              Tombola &amp; Fördergelder
            </h2>
            <p className="text-gray-900 leading-relaxed">
              YES, es gibt etwas zu gewinnen! Wir verlosen unter allen teilnehmenden
              SchülerInnen 3 Amazon-Gutscheine à 250 € und fünf Powerbanks. Außerdem
              können die Schulen mit den relativ meisten TeilnehmerInnen Preisgelder
              für ihre Fördervereine zwischen 200 und 750 Euro erhalten. Die 3
              erstplatzierten Schulen erhalten zusätzlich eine 1-Jahres-Partnerschaft
              mit einem Rotary-Club.
            </p>
          </div>
        </div>
      </section>

      {/* Über Rotary */}
      <section className="bg-herbi-gray py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-herbi-blue mb-10">
            Über Rotary
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Über Rotary */}
            <div className="bg-herbi-blue rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src="/images/teaser-rotary-endpolio.jpg" alt="Über Rotary" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold text-herbi-orange mb-3">Über Rotary</h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  Rotary ist ein internationales Netzwerk aus 1,4 Millionen engagierten
                  Männern und Frauen. Wir sehen eine Welt, in der Menschen gemeinsam
                  beginnen, nachhaltige Veränderungen zu schaffen – in allen Ländern,
                  in unserer Nachbarschaft und bei uns selbst.
                </p>
              </div>
            </div>

            {/* Jugendaustausch */}
            <div className="bg-herbi-blue rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src="/images/teaser-rotary-jugendaustausch.jpg" alt="Jugendaustausch" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold text-herbi-orange mb-3">Jugendaustausch</h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  Um Jugendlichen und jungen Erwachsenen die Möglichkeit zu geben,
                  ihre Talente zu entfalten und neue Kulturen kennenzulernen, bietet
                  Rotary Jugendaustausch-Programme für Jugendliche von 15 bis 19
                  Jahren an – und das in über 100 Ländern der Erde.
                </p>
              </div>
            </div>

            {/* Rotaract */}
            <div className="bg-herbi-blue rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src="/images/teaser-rotaract.jpg" alt="Rotaract" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold text-herbi-orange mb-3">Rotaract</h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  Rotaract ist die Jugendorganisation von Rotary für junge Erwachsene
                  zwischen 18 und 30 Jahren. Unter dem Motto &ldquo;Lernen, Helfen,
                  Feiern&rdquo; besuchen die Rotaracter spannende Orte, hören Vorträge
                  und engagieren sich ehrenamtlich für soziale Aktionen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
