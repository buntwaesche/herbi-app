'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AnfahrtPage() {
  const [mapsConsent, setMapsConsent] = useState(false)
  return (
    <div>
      {/* Hero-Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px]">
          {/* Bild links - KMG Gebäude */}
          <div className="relative w-full md:w-1/2 h-[250px] md:h-auto bg-herbi-blue">
            <Image
              src="/images/head-herbi-leitmotiv.jpg"
              alt="Königin-Mathilde-Gymnasium Herford"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Orange Box rechts */}
          <div className="w-full md:w-1/2 bg-herbi-orange flex flex-col justify-center p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">
              Dein Weg zu <span className="text-herbi-red">HerBI</span>
            </h1>
            <p className="text-white/90 mt-4 text-sm md:text-base leading-relaxed">
              Unser Gastgeber ist in 2027 das Königin-Mathilde-Gymnasium in Herford.
              Ob zu Fuß, mit dem Rad, dem Auto oder mit unserem kostenfreien Bus-Shuttle
              von Bünde, über Hiddenhausen (OPG) und Löhne.
            </p>
            <p className="text-white/90 mt-2 text-sm md:text-base">
              Wir freuen uns auf deinen Besuch beim HerBI Berufsinformationstag!
            </p>
            <a
              href="#anfahrt-details"
              className="mt-6 inline-block bg-herbi-red text-white font-semibold px-8 py-3 hover:bg-red-800 transition w-fit"
            >
              {"Let's go!"}
            </a>
          </div>
        </div>
      </div>

      {/* Orange Trennlinie */}
      <div className="h-2 bg-herbi-orange" />

      {/* Info-Kacheln */}
      <div id="anfahrt-details" className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-xl font-bold text-herbi-red">05.02.2027</h3>
            <p className="text-gray-600 text-sm mt-2">
              Der Berufsinformationstag startet um 14:30 Uhr und endet um 17:30 Uhr
              (Tombola ca. 17:10 Uhr).
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl mb-3">🏫</div>
            <h3 className="text-xl font-bold text-herbi-red">Königin-Mathilde-Gymnasium</h3>
            <p className="text-gray-600 text-sm mt-2">
              HerBI findet in 2027 am Königin-Mathilde-Gymnasium statt
              (Vlothoer Str. 1, 32049 Herford).
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl mb-3">🚌</div>
            <h3 className="text-xl font-bold text-herbi-red">Bus-Shuttle</h3>
            <p className="text-gray-600 text-sm mt-2">
              Ein kostenfreier Shuttle-Bus fährt von und nach Bünde und Löhne
              (Abfahrtzeiten siehe unten).
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl mb-3">🅿️</div>
            <h3 className="text-xl font-bold text-herbi-red">Parkplätze</h3>
            <p className="text-gray-600 text-sm mt-2">
              Parkplätze am Bildungs-Campus Herford. Bitte nutze nach Möglichkeit
              die Shuttle-Busse.
            </p>
          </div>
        </div>

        {/* Bus-Shuttle Section */}
        <div className="bg-herbi-dark text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2">Kostenfreier Bus-Shuttle</h2>
          <p className="text-herbi-orange font-semibold text-lg mb-6">– Einfach zusteigen</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-herbi-orange mb-2">Abfahrtzeiten:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>14:15 Uhr – Bünde, Schulzentrum Ennigloh</li>
                <li>14:15 Uhr – Bünde, Marktplatz</li>
                <li>14:15 Uhr – Löhne, Gymnasium (Haltestelle Hauptstraße)</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-gray-600">
              <p className="text-gray-300">
                <span className="font-bold text-white">17:30 Uhr</span> – Rückfahrt Herford, Königin-Mathilde-Gymnasium
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps – 2-Klick-Lösung */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-herbi-blue mb-4">Lageplan</h2>
          {mapsConsent ? (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.0!2d8.6735!3d52.1145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba5bb0b97c3c21%3A0x4e0e2b7e38c83e0c!2sK%C3%B6nigin-Mathilde-Gymnasium!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lageplan Königin-Mathilde-Gymnasium"
              />
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col items-center justify-center p-8" style={{ minHeight: 400 }}>
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-lg font-bold text-herbi-blue mb-2">Königin-Mathilde-Gymnasium</h3>
              <p className="text-gray-600 text-center mb-4">
                Vlothoer Str. 1, 32049 Herford
              </p>
              <p className="text-sm text-gray-500 text-center mb-4 max-w-md">
                Mit Klick auf den Button wird eine Verbindung zu Google Maps hergestellt.
                Es gelten die <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-herbi-blue underline">Datenschutzbestimmungen von Google</a>.
              </p>
              <button
                onClick={() => setMapsConsent(true)}
                className="bg-herbi-red text-white font-semibold px-8 py-3 hover:bg-red-800 transition"
              >
                Google Maps laden
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
