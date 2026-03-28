'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Referent, Berufsfeld, Zuordnung } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import StatusBadge from '@/components/StatusBadge'

export default function ZuordnungPage() {
  const [referenten, setReferenten] = useState<Referent[]>([])
  const [berufsfelder, setBerufsfelder] = useState<Berufsfeld[]>([])
  const [zuordnungen, setZuordnungen] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('alle')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [refRes, bfRes, zuRes] = await Promise.all([
      supabase.from('referenten').select('*').order('nachname'),
      supabase.from('berufsfelder').select('*').order('name'),
      supabase.from('zuordnung').select('*'),
    ])
    setReferenten(refRes.data || [])
    setBerufsfelder(bfRes.data || [])
    const set = new Set<string>()
    ;(zuRes.data || []).forEach((z: Zuordnung) => set.add(`${z.referent_id}-${z.berufsfeld_id}`))
    setZuordnungen(set)
    setLoading(false)
  }

  const toggle = useCallback(async (refId: number, bfId: number) => {
    const key = `${refId}-${bfId}`
    setToggling(key)

    const checked = !zuordnungen.has(key)

    // Optimistic update
    setZuordnungen((prev) => {
      const next = new Set(prev)
      if (checked) next.add(key)
      else next.delete(key)
      return next
    })

    const res = await fetch('/api/zuordnung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referent_id: refId, berufsfeld_id: bfId, checked }),
    })

    if (!res.ok) {
      // Rollback bei Fehler
      setZuordnungen((prev) => {
        const next = new Set(prev)
        if (checked) next.delete(key)
        else next.add(key)
        return next
      })
    }

    setToggling(null)
  }, [zuordnungen])

  const filteredReferenten = referenten.filter((r) =>
    filterStatus === 'alle' || r.status === filterStatus
  )

  if (loading) return <div className="p-8 text-gray-500">Lade Zuordnungsmatrix...</div>

  return (
    <>
      <AdminPageHeader
        title="Zuordnung"
        description="Referenten ↔ Berufsfelder – Klick zum Zuordnen/Entfernen"
      />

      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="alle">Alle Status</option>
          <option value="bestätigt">Bestätigt</option>
          <option value="angefragt">Angefragt</option>
          <option value="abgesagt">Abgesagt</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 px-3 py-2 text-left font-medium text-gray-600 border-b min-w-[180px]">
                Referent
              </th>
              {berufsfelder.map((bf) => (
                <th
                  key={bf.id}
                  className="px-1 py-2 text-center font-medium text-gray-600 border-b"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', minWidth: '32px', maxWidth: '32px' }}
                >
                  <span className="inline-block max-h-[120px] overflow-hidden text-ellipsis">
                    {bf.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredReferenten.map((ref) => (
              <tr key={ref.id} className="hover:bg-gray-50">
                <td className="sticky left-0 bg-white z-10 px-3 py-1.5 border-b whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ref.nachname}, {ref.vorname}</span>
                    <StatusBadge status={ref.status} />
                  </div>
                </td>
                {berufsfelder.map((bf) => {
                  const key = `${ref.id}-${bf.id}`
                  const isChecked = zuordnungen.has(key)
                  const isToggling = toggling === key
                  return (
                    <td key={bf.id} className="text-center border-b px-1 py-1.5">
                      <button
                        onClick={() => toggle(ref.id, bf.id)}
                        disabled={isToggling}
                        className={`w-5 h-5 rounded border-2 transition inline-flex items-center justify-center ${
                          isChecked
                            ? 'bg-herbi-orange border-herbi-orange text-white'
                            : 'border-gray-300 hover:border-herbi-orange'
                        } ${isToggling ? 'opacity-50' : ''}`}
                        aria-label={`${ref.nachname} - ${bf.name}`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredReferenten.length === 0 && (
        <div className="text-center py-12 text-gray-400">Keine Referenten für den gewählten Filter.</div>
      )}
    </>
  )
}
