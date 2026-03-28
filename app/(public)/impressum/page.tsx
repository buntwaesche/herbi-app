export default function ImpressumPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-6">Impressum</h1>
      <div className="bg-white rounded-xl shadow p-6 prose prose-gray max-w-none">
        <h2>Impressum gemäß § 5 TMG</h2>
        <p>
          V.i.S.d.M.: Arbeitsgemeinschaft HerBI der folgenden Rotary Clubs im
          Kreis Herford, vertreten durch die jeweiligen
          Präsidenten/Präsidentinnen:
        </p>
        <ul>
          <li>Rotary Club Herford</li>
          <li>Rotary Club Herford-Widukind</li>
          <li>Rotary Club Herford-Hanse</li>
        </ul>

        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:referenten@herbi.rocks">referenten@herbi.rocks</a>
        </p>

        <h2>Copyright-Hinweis</h2>
        <p>
          Stockfotos auf dieser Website stammen von{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>{" "}
          und{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
          .
        </p>
        <p>
          Für die Texte und Fotos der Seminarbeschreibungen sind die Referenten
          verantwortlich.
        </p>
      </div>
    </div>
  )
}
