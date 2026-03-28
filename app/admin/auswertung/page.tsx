'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AdminPageHeader from '@/components/AdminPageHeader'

type SchulStat = { name: string; basis: number; belegungen: number }
type BerufsfeldStat = { name: string; belegungen: number }

export default function AuswertungPage() {
  const [schulStats, setSchulStats] = useState<SchulStat[]>([])
  const [bfStats, setBfStats] = useState<BerufsfeldStat[]>([])
  const [totalBelegungen, setTotalBelegungen] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'schulen' | 'berufsfelder'>('schulen')

  useEffect(() => { loadStats() }, [])

  async function loadStats() {
    // Belegungen mit Schule laden
    const { data: belegungen } = await supabase.from('belegungen').select('*, schulen(name, basis_schueler)')
    const { data: schulen } = await supabase.from('schulen').select('*').order('name')
    const { data: planungData } = await supabase.from('planung').select('*, berufsfelder(name), raeume(bezeichnung)')

    setTotalBelegungen(belegungen?.length || 0)

    // Stats pro Schule
    const schulMap = new Map<number, SchulStat>()
    ;(schulen || []).forEach((s: any) => schulMap.set(s.id, { name: s.name, basis: s.basis_schueler, belegungen: 0 }))
    ;(belegungen || []).forEach((b: any) => {
      if (b.schule_id && schulMap.has(b.schule_id)) {
        schulMap.get(b.schule_id)!.belegungen++
      }
    })
    setSchulStats(Array.from(schulMap.values()).sort((a, b) => b.belegungen - a.belegungen))

    // Stats pro Berufsfeld
    const bfMap = new Map<string, number>()
    ;(belegungen || []).forEach((b: any) => {
      const plan = (planungData || []).find((p: any) => p.raum_id === b.planung_raum && p.zeitslot_id === b.planung_slot)
      if (plan?.berufsfelder?.name) {
        bfMap.set(plan.berufsfelder.name, (bfMap.get(plan.berufsfelder.name) || 0) + 1)
      }
    })
    setBfStats(
      Array.from(bfMap.entries())
        .map(([name, belegungen]) => ({ name, belegungen }))
        .sort((a, b) => b.belegungen - a.belegungen)
    )

    setLoading(false)
  }

  async function handleLoeschen() {
    if (!confirm('ACHTUNG: Alle Belegungsdaten unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden.')) return
    if (!confirm('Wirklich alle Auswertungsdaten löschen? Zweite Bestätigung erforderlich.')) return

    await supabase.from('belegungen').delete().gte('id', 0)
    loadStats()
  }

  function exportCSV() {
    const headers = ['Schule', 'Basisschüler', 'Belegungen', 'Prozent']
    const rows = schulStats.map((s) => [
      s.name, s.basis.toString(), s.belegungen.toString(),
      s.basis > 0 ? `${Math.round((s.belegungen / s.basis) * 100)}%` : '-'
    ])
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(';')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `auswertung_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Auswertung...</div>

  return (
    <>
      <AdminPageHeader
        title="Auswertung"
        description={`${totalBelegungen} Belegungen erfasst`}
        actions={
          <>
            <button onClick={exportCSV} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              CSV-Export
            </button>
            <button onClick={handleLoeschen} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Daten löschen (DSGVO)
            </button>
          </>
        }
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('schulen')}
          className={`px-4 py-2 text-sm rounded-lg transition ${tab === 'schulen' ? 'bg-herbi-blue text-white' : 'bg-white border border-gray-300'}`}
        >
          Nach Schulen
        </button>
        <button
          onClick={() => setTab('berufsfelder')}
          className={`px-4 py-2 text-sm rounded-lg transition ${tab === 'berufsfelder' ? 'bg-herbi-blue text-white' : 'bg-white border border-gray-300'}`}
        >
          Nach Berufsfeldern
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {tab === 'schulen' ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Schule</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Basisschüler</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Belegungen</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schulStats.map((s) => (
                <tr key={s.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{s.name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{s.basis}</td>
                  <td className="px-4 py-2 text-right font-medium">{s.belegungen}</td>
                  <td className="px-4 py-2 text-right">
                    {s.basis > 0 ? (
                      <span className={`font-medium ${(s.belegungen / s.basis) > 0.5 ? 'text-green-600' : 'text-gray-600'}`}>
                        {Math.round((s.belegungen / s.basis) * 100)}%
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
              {schulStats.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Noch keine Auswertungsdaten.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Berufsfeld</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Belegungen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bfStats.map((b) => (
                <tr key={b.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{b.name}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-herbi-orange rounded-full"
                          style={{ width: `${Math.min(100, (b.belegungen / (bfStats[0]?.belegungen || 1)) * 100)}%` }}
                        />
                      </div>
                      <span className="font-medium w-8 text-right">{b.belegungen}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {bfStats.length === 0 && (
                <tr><td colSpan={2} className="px-4 py-8 text-center text-gray-400">Noch keine Auswertungsdaten.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
