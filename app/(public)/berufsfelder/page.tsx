'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Berufsfeld } from '@/lib/types'

type BerufsInfo = Berufsfeld & {
  slots: { zeit: string; raum: string }[]
}

export default function BerufsfelderPage() {
  const [berufsfelder, setBerufsfelder] = useState<BerufsInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      // Berufsfelder laden
      const { data: bfData } = await supabase
        .from('berufsfelder')
        .select('*')
        .eq('anzeige', true)
        .order('name')

      // Planungsdaten mit Zeitslots und Räumen laden
      const { data: planungData } = await supabase
        .from('planung')
        .select(`
          berufsfeld_id,
          zeitslots ( label, reihenfolge ),
          raeume ( bezeichnung )
        `)
        .not('berufsfeld_id', 'is', null)

      // Slots pro Berufsfeld zusammenbauen
      const slotMap = new Map<number, { zeit: string; raum: string }[]>()
      if (planungData) {
        for (const p of planungData) {
          if (!p.berufsfeld_id) continue
          const zeitslot = p.zeitslots as unknown as { label: string; reihenfolge: number } | null
          const raum = p.raeume as unknown as { bezeichnung: string } | null
          if (!zeitslot || !raum) continue

          if (!slotMap.has(p.berufsfeld_id)) {
            slotMap.set(p.berufsfeld_id, [])
          }
          slotMap.get(p.berufsfeld_id)!.push({
            zeit: zeitslot.label,
            raum: raum.bezeichnung,
          })
        }
      }

      // Sortiere Slots pro Berufsfeld nach Zeit
      for (const slots of slotMap.values()) {
        slots.sort((a, b) => a.zeit.localeCompare(b.zeit))
      }

      const result: BerufsInfo[] = (bfData || []).map((bf) => ({
        ...bf,
        slots: slotMap.get(bf.id) || [],
      }))

      setBerufsfelder(result)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = berufsfelder.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.beschreibung || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Hero-Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px]">
          {/* Bild links */}
          <div className="relative w-full md:w-1/2 h-[250px] md:h-auto">
            <Image
              src="/images/head-studienberufe.jpg"
              alt="Sneaker vor Pfeilen – Welchen Weg gehst du?"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Orange Box rechts */}
          <div className="w-full md:w-1/2 bg-herbi-orange flex flex-col justify-center p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">
              Berufsfelder in <span className="text-herbi-red">Live-Talks</span>
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase mt-3">
              Von Architektur bis Zahnmedizin
            </h2>
            <p className="text-white/90 mt-4 text-sm md:text-base leading-relaxed">
              Du überlegst, ob ein Studium das Richtige für dich ist? Dann informiere dich beim HerBI
              Berufsinformationstag über mögliche Studiengänge und erfahre von unseren ReferentInnen aus
              der Praxis, wie du das Studium für dich beruflich nutzen kannst.
            </p>
            <a
              href="#berufsfelder"
              className="mt-6 inline-block bg-herbi-red text-white font-semibold px-8 py-3 hover:bg-red-800 transition w-fit"
            >
              Berufsfelder entdecken
            </a>
          </div>
        </div>
      </div>

      {/* Orange Trennlinie */}
      <div className="h-2 bg-herbi-orange" />

      {/* Berufsfelder-Liste */}
      <div id="berufsfelder" className="max-w-5xl mx-auto px-4 py-8">
        {/* Suchfeld */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Berufsfeld suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
          />
        </div>

        {loading ? (
          <div className="text-gray-400 py-12 text-center">Lade Berufsfelder...</div>
        ) : (
          <>
            {/* Akkordeon-Liste */}
            <div className="space-y-2">
              {filtered.map((b) => (
                <div key={b.id}>
                  {/* Akkordeon-Header */}
                  <button
                    onClick={() => setOpenId(openId === b.id ? null : b.id)}
                    className="w-full flex items-center gap-3 bg-herbi-red text-white px-5 py-3.5 hover:bg-red-800 transition text-left"
                  >
                    <span className="text-xl font-bold leading-none">
                      {openId === b.id ? '−' : '+'}
                    </span>
                    <span className="font-bold text-sm md:text-base">{b.name}</span>
                    {b.slots.length > 0 && (
                      <span className="text-sm text-white/80 ml-1">
                        {b.slots.map((s) => `${s.zeit}: ${s.raum}`).join(', ')}
                      </span>
                    )}
                  </button>

                  {/* Akkordeon-Inhalt */}
                  {openId === b.id && (
                    <div className="bg-white border border-t-0 border-gray-200 p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          {b.beschreibung ? (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {b.beschreibung}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic">
                              Mehr Informationen am Berufsinformationstag.
                            </p>
                          )}
                        </div>
                        {b.bild_url && (
                          <div className="w-full md:w-[280px] flex-shrink-0">
                            <img
                              src={b.bild_url}
                              alt={b.name}
                              className="w-full h-auto rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Keine Berufsfelder gefunden.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
