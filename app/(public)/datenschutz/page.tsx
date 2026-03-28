export default function DatenschutzPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-6">Datenschutzerklärung</h1>
      <div className="bg-white rounded-xl shadow p-6 prose prose-gray max-w-none">
        <h2>1. Verantwortlicher</h2>
        <p>
          Rotary Clubs im Kreis Herford<br />
          E-Mail: herBI@herbi.rocks
        </p>

        <h2>2. Erhobene Daten</h2>
        <p>
          Bei der Nutzung dieser Webseite werden folgende Daten verarbeitet:
        </p>
        <ul>
          <li>Server-Logdaten (IP-Adresse, Browsertyp, Zugriffszeitpunkt)</li>
          <li>Bei QR-Code-Scans: Schule, optional Vor- und Nachname, gehashte IP-Adresse</li>
        </ul>

        <h2>3. Zweck der Datenverarbeitung</h2>
        <p>
          Die erhobenen Daten dienen ausschließlich der Durchführung und Auswertung
          des Herforder Berufsinformationstages. IP-Adressen werden nur als Hash
          gespeichert und dienen der Erkennung von Mehrfach-Scans.
        </p>

        <h2>4. Speicherdauer</h2>
        <p>
          Auswertungsdaten (QR-Code-Scans) werden nach Abschluss der Veranstaltungsauswertung
          gelöscht. Es findet keine dauerhafte Speicherung personenbezogener Daten statt.
        </p>

        <h2>5. Keine Cookies / Keine Drittanbieter</h2>
        <p>
          Diese Webseite verwendet keine Tracking-Cookies und bindet keine
          Drittanbieter-Dienste (Fonts, Analytics, CDNs) ein. Alle Assets werden
          vom eigenen Server ausgeliefert.
        </p>

        <h2>6. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
          der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter
          herBI@herbi.rocks.
        </p>

        <p className="text-sm text-gray-400 mt-8">
          Diese Datenschutzerklärung muss ggf. an die tatsächlichen Gegebenheiten angepasst werden.
        </p>
      </div>
    </div>
  )
}
