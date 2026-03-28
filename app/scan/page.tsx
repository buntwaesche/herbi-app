'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Schule = { id: number; name: string }

export default function ScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Laden...</p>
      </div>
    }>
      <ScanForm />
    </Suspense>
  )
}

function ScanForm() {
  const searchParams = useSearchParams()
  const raumId = searchParams.get('r')
  const slotId = searchParams.get('s')

  const [schulen, setSchulen] = useState<Schule[]>([])
  const [schuleId, setSchuleId] = useState('')
  const [vorname, setVorname] = useState('')
  const [nachname, setNachname] = useState('')
  const [status, setStatus] = useState<'form' | 'loading' | 'success' | 'error'>('form')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('schulen').select('id, name').order('name')
      setSchulen(data || [])
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!schuleId) return

    setStatus('loading')

    const res = await fetch('/api/belegungen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raum_id: Number(raumId),
        zeitslot_id: Number(slotId),
        schule_id: Number(schuleId),
        vorname: vorname || null,
        nachname: nachname || null,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setMessage(data.message || 'Erfolgreich erfasst!')
    } else {
      setStatus('error')
      setMessage(data.error || 'Ein Fehler ist aufgetreten.')
    }
  }

  if (!raumId || !slotId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-herbi-blue mb-2">
            Her<span className="text-herbi-orange">BI</span>
          </h1>
          <p className="text-gray-500">Ungültiger QR-Code. Bitte scanne den Code erneut.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-herbi-blue">
            Her<span className="text-herbi-orange">BI</span>
          </h1>
          <p className="text-gray-500 mt-1">Seminarteilnahme erfassen</p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-green-800 font-medium">{message}</p>
            <p className="text-green-600 text-sm mt-2">Viel Spaß im Seminar!</p>
          </div>
        ) : status === 'error' ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">❌</div>
            <p className="text-red-800 font-medium">{message}</p>
            <button
              onClick={() => setStatus('form')}
              className="mt-4 text-sm text-herbi-orange hover:text-herbi-orange-dark"
            >
              Erneut versuchen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schule *</label>
              <select
                required
                value={schuleId}
                onChange={(e) => setSchuleId(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
              >
                <option value="">– Bitte wähle deine Schule –</option>
                {schulen.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vorname (optional)</label>
                <input
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nachname (optional)</label>
                <input
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-herbi-orange text-white font-semibold py-3 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50"
            >
              {status === 'loading' ? 'Wird erfasst...' : 'Teilnahme bestätigen'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Deine Daten werden ausschließlich für die Veranstaltungsauswertung verwendet und danach gelöscht.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
