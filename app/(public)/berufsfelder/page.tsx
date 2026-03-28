'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Berufsfeld } from '@/lib/types'

export default function BerufsfelderPage() {
  const [berufsfelder, setBerufsfelder] = useState<Berufsfeld[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Berufsfeld | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('berufsfelder')
        .select('*')
        .eq('anzeige', true)
        .order('name')
      setBerufsfelder(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = berufsfelder.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.beschreibung || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-herbi-blue mb-2">Berufsfelder</h1>
      <p className="text-gray-500 mb-6">Entdecke die Vielfalt der angebotenen Seminare.</p>

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
          {/* Kacheln */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(selected?.id === b.id ? null : b)}
                className={`text-left bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden ${
                  selected?.id === b.id ? 'ring-2 ring-herbi-orange' : ''
                }`}
              >
                {b.bild_url && (
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    <img src={b.bild_url} alt={b.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-herbi-blue">{b.name}</h3>
                  {b.beschreibung && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{b.beschreibung}</p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Keine Berufsfelder gefunden.
            </div>
          )}

          {/* Detailansicht */}
          {selected && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-herbi-blue">{selected.name}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
              </div>
              {selected.bild_url && (
                <div className="mt-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={selected.bild_url} alt={selected.name} className="w-full h-full object-cover" />
                </div>
              )}
              {selected.beschreibung && (
                <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">
                  {selected.beschreibung}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
