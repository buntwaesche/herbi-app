'use client'

export default function WeitersagenPage() {
  const shareUrl = 'https://herbi.rocks'
  const shareText = 'HerBI – Herforder Berufsinformationstag: Informiere dich über akademische Berufsfelder!'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-2">Weitersagen</h1>
      <p className="text-gray-500 mb-8">
        Teile HerBI mit deinen Freunden und Mitschülern!
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-xl p-6 text-center hover:bg-green-600 transition"
        >
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-semibold text-lg">WhatsApp</h3>
          <p className="text-sm text-green-100 mt-1">Per WhatsApp teilen</p>
        </a>

        <a
          href={`mailto:?subject=${encodeURIComponent('HerBI – Herforder Berufsinformationstag')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`}
          className="bg-herbi-blue text-white rounded-xl p-6 text-center hover:bg-herbi-blue-light transition"
        >
          <div className="text-3xl mb-2">✉️</div>
          <h3 className="font-semibold text-lg">E-Mail</h3>
          <p className="text-sm text-gray-300 mt-1">Per E-Mail weiterleiten</p>
        </a>

        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center hover:opacity-90 transition"
        >
          <div className="text-3xl mb-2">📸</div>
          <h3 className="font-semibold text-lg">Instagram</h3>
          <p className="text-sm text-purple-100 mt-1">Folge uns auf Instagram</p>
        </a>

        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
              navigator.clipboard.writeText(shareUrl)
            }
          }}
          className="bg-gray-100 text-herbi-blue rounded-xl p-6 text-center hover:bg-gray-200 transition"
        >
          <div className="text-3xl mb-2">🔗</div>
          <h3 className="font-semibold text-lg">Link kopieren</h3>
          <p className="text-sm text-gray-500 mt-1">herbi.rocks in die Zwischenablage</p>
        </button>
      </div>

      <div className="mt-12 bg-herbi-orange/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-herbi-blue mb-2">Für Lehrkräfte</h2>
        <p className="text-gray-600">
          Bitte leiten Sie die Informationen zu HerBI an Ihre Schülerinnen und Schüler
          der Oberstufe weiter. Die Teilnahme ist kostenlos und eine tolle Gelegenheit
          zur Berufsorientierung.
        </p>
      </div>
    </div>
  )
}
