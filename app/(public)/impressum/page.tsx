export default function ImpressumPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-6">Impressum</h1>
      <div className="bg-white rounded-xl shadow p-6 prose prose-gray max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Rotary Clubs im Kreis Herford<br />
          (Verantwortlich für den Inhalt)
        </p>
        <h2>Kontakt</h2>
        <p>
          E-Mail: herBI@herbi.rocks
        </p>
        <h2>Redaktionell verantwortlich</h2>
        <p>
          Die Rotary Clubs im Kreis Herford<br />
          Vertreten durch die jeweiligen Präsidenten
        </p>
        <p className="text-sm text-gray-400 mt-8">
          Diese Seite muss mit den korrekten Angaben des Verantwortlichen aktualisiert werden.
        </p>
      </div>
    </div>
  )
}
