'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Raum, Zeitslot, Berufsfeld, Planung } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import { generateRaumplanPDF } from '@/lib/pdf-raumplan'
import { generateBerufsfeldPDF } from '@/lib/pdf-berufsfelder'
import { generateQRCodePDF } from '@/lib/pdf-qrcodes'

export default function PlanungPage() {
  const [raeume, setRaeume] = useState<Raum[]>([])
  const [zeitslots, setZeitslots] = useState<Zeitslot[]>([])
  const [berufsfelder, setBerufsfelder] = useState<Berufsfeld[]>([])
  const [planung, setPlanung] = useState<Map<string, number | null>>(new Map())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<Set<string>>(new Set())

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [rRes, zRes, bRes, pRes] = await Promise.all([
      supabase.from('raeume').select('*').is('archiv_name', null).eq('verwendung', true).order('geschoss').order('bezeichnung'),
      supabase.from('zeitslots').select('*').order('reihenfolge'),
      supabase.from('berufsfelder').select('*').order('name'),
      supabase.from('planung').select('*'),
    ])
    setRaeume(rRes.data || [])
    setZeitslots(zRes.data || [])
    setBerufsfelder(bRes.data || [])

    const map = new Map<string, number | null>()
    ;(pRes.data || []).forEach((p: Planung) => map.set(`${p.raum_id}-${p.zeitslot_id}`, p.berufsfeld_id))
    setPlanung(map)
    setLoading(false)
  }

  // Prüfe ob ein Berufsfeld im selben Zeitslot doppelt vorkommt
  const checkWarnings = useCallback((newPlanung: Map<string, number | null>) => {
    const warn = new Set<string>()
    zeitslots.forEach((z) => {
      const seen = new Map<number, number[]>() // berufsfeld_id -> raum_ids
      raeume.forEach((r) => {
        const bfId = newPlanung.get(`${r.id}-${z.id}`)
        if (bfId) {
          if (!seen.has(bfId)) seen.set(bfId, [])
          seen.get(bfId)!.push(r.id)
        }
      })
      seen.forEach((raumIds) => {
        if (raumIds.length > 1) {
          raumIds.forEach((rId) => warn.add(`${rId}-${z.id}`))
        }
      })
    })
    setWarnings(warn)
  }, [zeitslots, raeume])

  useEffect(() => { checkWarnings(planung) }, [planung, checkWarnings])

  const handleChange = useCallback(async (raumId: number, zeitslotId: number, berufsfeldId: number | null) => {
    const key = `${raumId}-${zeitslotId}`
    setSaving(key)

    // Optimistic update
    setPlanung((prev) => {
      const next = new Map(prev)
      next.set(key, berufsfeldId)
      return next
    })

    await fetch('/api/planung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ raum_id: raumId, zeitslot_id: zeitslotId, berufsfeld_id: berufsfeldId }),
    })

    setSaving(null)
  }, [])

  if (loading) return <div className="p-8 text-gray-500">Lade Planungsmatrix...</div>

  return (
    <>
      <AdminPageHeader
        title="Planung"
        description="Berufsfelder den Räumen und Zeitslots zuweisen"
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => generateRaumplanPDF(raeume, zeitslots, berufsfelder, planung)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              PDF Raumplan
            </button>
            <button
              onClick={() => generateBerufsfeldPDF(raeume, zeitslots, berufsfelder, planung)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              PDF Berufsfelder
            </button>
            <button
              onClick={() => generateQRCodePDF(raeume, zeitslots, berufsfelder, planung)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              PDF QR-Codes
            </button>
          </div>
        }
      />

      {warnings.size > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 mb-4 text-sm">
          Achtung: Ein Berufsfeld ist im selben Zeitslot mehrfach geplant (gelb markiert).
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky left-0 bg-gray-50 z-10 px-4 py-3 text-left font-medium text-gray-600 min-w-[140px]">
                Raum
              </th>
              {zeitslots.map((z) => (
                <th key={z.id} className="px-2 py-3 text-center font-medium text-gray-600 min-w-[180px]">
                  {z.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {raeume.map((r) => (
              <tr key={r.id}>
                <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium whitespace-nowrap border-r">
                  <div>{r.bezeichnung}</div>
                  <div className="text-xs text-gray-400">{r.geschoss}</div>
                </td>
                {zeitslots.map((z) => {
                  const key = `${r.id}-${z.id}`
                  const value = planung.get(key) ?? ''
                  const hasWarning = warnings.has(key)
                  return (
                    <td key={z.id} className={`px-2 py-2 ${hasWarning ? 'bg-yellow-50' : ''}`}>
                      <select
                        value={value || ''}
                        onChange={(e) => handleChange(r.id, z.id, e.target.value ? Number(e.target.value) : null)}
                        disabled={saving === key}
                        className={`w-full px-2 py-1.5 border rounded text-xs ${
                          hasWarning ? 'border-yellow-400' : 'border-gray-200'
                        } focus:ring-1 focus:ring-herbi-orange outline-none ${saving === key ? 'opacity-50' : ''}`}
                      >
                        <option value="">– Frei –</option>
                        {berufsfelder.map((bf) => (
                          <option key={bf.id} value={bf.id}>{bf.name}</option>
                        ))}
                      </select>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {raeume.length === 0 && (
        <div className="text-center py-12 text-gray-400">Keine aktiven Räume vorhanden. Bitte zuerst Räume anlegen.</div>
      )}
    </>
  )
}
