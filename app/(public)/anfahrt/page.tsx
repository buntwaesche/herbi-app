export default function AnfahrtPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-6">Anfahrt</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-herbi-blue mb-2">Veranstaltungsort</h2>
          <p className="text-gray-600">
            Königin-Mathilde-Gymnasium<br />
            Vlothoer Str. 1<br />
            32049 Herford
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-herbi-blue mb-2">Mit dem Bus-Shuttle</h2>
          <p className="text-gray-600">
            Am Veranstaltungstag werden Busse aus dem gesamten Kreis Herford eingesetzt.
            Die genauen Abfahrtszeiten und Haltestellen werden rechtzeitig vor der Veranstaltung
            auf dieser Seite und über die Schulen bekannt gegeben.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-herbi-blue mb-2">Mit öffentlichen Verkehrsmitteln</h2>
          <p className="text-gray-600">
            Vom Hauptbahnhof Herford sind es ca. 15 Minuten Fußweg oder wenige Minuten
            mit den Buslinien in Richtung Vlotho.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-herbi-blue mb-2">Mit dem Auto</h2>
          <p className="text-gray-600">
            Über die A2, Abfahrt Herford/Bad Salzuflen. Bitte beachte die eingeschränkten
            Parkmöglichkeiten rund um die Schule und nutze nach Möglichkeit die Shuttle-Busse.
          </p>
        </div>
      </div>
    </div>
  )
}
