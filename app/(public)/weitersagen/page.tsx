'use client'

import Image from 'next/image'

export default function WeitersagenPage() {
  const shareUrl = 'https://herbi.rocks'
  const shareText = 'HerBI – 18. Herforder Berufsinformationstag am 05.02.2027: Informiere dich über akademische Berufsfelder!'

  return (
    <div>
      {/* Hero-Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px]">
          {/* Bild links */}
          <div className="relative w-full md:w-1/2 h-[250px] md:h-auto">
            <Image
              src="/images/head-herbi-leitmotiv.jpg"
              alt="HerBI Weitersagen"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Orange Box rechts */}
          <div className="w-full md:w-1/2 bg-herbi-orange flex flex-col justify-center p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">
              Bitte <span className="text-herbi-red">Weitersagen!</span>
            </h1>
            <p className="text-white/90 mt-4 text-sm md:text-base leading-relaxed">
              {"Hier gibt's Vorlagen zum Download für News-Seiten, Social Media und weitere Informationskanäle. Danke für's Teilen!"}
            </p>
            <a
              href="#downloads"
              className="mt-6 inline-block bg-herbi-red text-white font-semibold px-8 py-3 hover:bg-red-800 transition w-fit"
            >
              Spread the message!
            </a>
          </div>
        </div>
      </div>

      {/* Orange Trennlinie */}
      <div className="h-2 bg-herbi-orange" />

      {/* Teilen & Downloads */}
      <div id="downloads" className="max-w-5xl mx-auto px-4 py-10">
        {/* Social Share Buttons */}
        <h2 className="text-2xl font-bold text-herbi-blue mb-6">Jetzt teilen</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
            href={`https://www.facebook.com/herbiherford`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700 transition"
          >
            <div className="text-3xl mb-2">📘</div>
            <h3 className="font-semibold text-lg">Facebook</h3>
            <p className="text-sm text-blue-200 mt-1">HerBI auf Facebook</p>
          </a>

          <a
            href={`https://www.instagram.com/herbi.rocks/`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center hover:opacity-90 transition"
          >
            <div className="text-3xl mb-2">📸</div>
            <h3 className="font-semibold text-lg">Instagram</h3>
            <p className="text-sm text-purple-100 mt-1">@herbi.rocks folgen</p>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent('HerBI – 18. Herforder Berufsinformationstag')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`}
            className="bg-herbi-blue text-white rounded-xl p-6 text-center hover:bg-herbi-blue-light transition"
          >
            <div className="text-3xl mb-2">✉️</div>
            <h3 className="font-semibold text-lg">E-Mail</h3>
            <p className="text-sm text-gray-300 mt-1">Per E-Mail weiterleiten</p>
          </a>
        </div>

        {/* Download-Bereich */}
        <h2 className="text-2xl font-bold text-herbi-blue mb-6">Downloads</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-herbi-orange">
            <h3 className="font-bold text-herbi-blue text-lg">Digitaler Flyer DIN lang</h3>
            <p className="text-gray-500 text-sm mt-1">Zum Ausdrucken und Verteilen</p>
            <button
              className="mt-4 bg-herbi-red text-white px-6 py-2 font-semibold hover:bg-red-800 transition"
            >
              Download
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-herbi-orange">
            <h3 className="font-bold text-herbi-blue text-lg">Instagram & Facebook</h3>
            <p className="text-gray-500 text-sm mt-1">1080 x 1350 px – optimiert für Social Media</p>
            <button
              className="mt-4 bg-herbi-red text-white px-6 py-2 font-semibold hover:bg-red-800 transition"
            >
              Download
            </button>
          </div>
        </div>

        {/* Link kopieren */}
        <div className="bg-herbi-dark text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Link kopieren</h2>
          <p className="text-gray-300 mb-4">Kopiere den Link und teile ihn mit Freunden und Mitschülern.</p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="https://herbi.rocks"
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded outline-none"
            />
            <button
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(shareUrl)
                }
              }}
              className="bg-herbi-orange text-white px-6 py-2 rounded font-semibold hover:bg-herbi-orange-dark transition"
            >
              Kopieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
