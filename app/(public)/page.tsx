import Link from 'next/link'

const EVENT_DATE = process.env.NEXT_PUBLIC_EVENT_DATE || '2026-06-20'
const EVENT_YEAR = process.env.NEXT_PUBLIC_EVENT_YEAR || '2026'
const EVENT_LOCATION = process.env.NEXT_PUBLIC_EVENT_LOCATION || 'Königin-Mathilde-Gymnasium, Herford'

export default function StartPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-herbi-blue text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Her<span className="text-herbi-orange">BI</span> {EVENT_YEAR}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Herforder Berufsinformationstag
          </p>
          <p className="text-lg text-herbi-orange font-semibold mb-8">
            Deine Zukunft beginnt hier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/berufsfelder"
              className="inline-block bg-herbi-orange hover:bg-herbi-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
            >
              Berufsfelder entdecken
            </Link>
            <Link
              href="/anfahrt"
              className="inline-block border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
            >
              Anfahrt &amp; Infos
            </Link>
          </div>
        </div>
      </section>

      {/* Eckdaten-Kacheln */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '📅', title: 'Datum', text: EVENT_DATE },
            { icon: '🎓', title: 'Zielgruppe', text: 'Gymnasiale Oberstufe' },
            { icon: '📍', title: 'Ort', text: EVENT_LOCATION },
            { icon: '🚌', title: 'Bus-Shuttle', text: 'Aus dem Kreis Herford' },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl shadow-lg p-5">
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3 className="font-semibold text-herbi-blue">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Über HerBI */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-herbi-blue mb-4">Was ist HerBI?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              HerBI bringt über 50 Referentinnen und Referenten aus verschiedensten akademischen
              Berufsfeldern mit Schülerinnen und Schülern zusammen. In kleinen Seminargruppen
              berichtest du aus erster Hand von deinem Berufsalltag und beantwortest Fragen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Organisiert wird der Berufsinformationstag von den Rotary Clubs im Kreis Herford –
              ehrenamtlich und kostenlos für alle Teilnehmenden.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-herbi-blue mb-4">So funktioniert&apos;s</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Berufsfelder ansehen', text: 'Stöbere durch die angebotenen Seminare und finde deine Favoriten.' },
                { step: '2', title: 'Zur Veranstaltung kommen', text: 'Am Veranstaltungstag findest du dich im Gebäude zurecht – Raumpläne helfen dir dabei.' },
                { step: '3', title: 'Seminare besuchen', text: 'Besuche bis zu 4 verschiedene Seminare und stelle deine Fragen.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-herbi-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-herbi-blue">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rotary Info */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-herbi-blue mb-4">Organisiert von Rotary</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Die Rotary Clubs im Kreis Herford engagieren sich seit vielen Jahren für die
            Berufsorientierung junger Menschen. HerBI ist eines der Leuchtturmprojekte
            dieser ehrenamtlichen Arbeit.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['RC Herford', 'RC Herford Widukind', 'RC Herford Hanse', 'RC Bünde', 'RC Enger-Spenge'].map((club) => (
              <span key={club} className="bg-white px-4 py-2 rounded-full shadow text-herbi-blue font-medium">
                {club}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
