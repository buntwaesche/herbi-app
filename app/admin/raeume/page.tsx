'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import type { Raum } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import Modal from '@/components/Modal'

const GESCHOSSE = ['Keller', 'Erdgeschoss', '1. OG', '2. OG', '3. OG']

const emptyForm = {
  bezeichnung: '',
  geschoss: '',
  bemerkung: '',
  verwendung: true,
  archiv_name: null as string | null,
}

export default function RaeumePage() {
  const [raeume, setRaeume] = useState<Raum[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [archivModalOpen, setArchivModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [archivName, setArchivName] = useState('')
  const [showArchiv, setShowArchiv] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('raeume').select('*').order('geschoss').order('bezeichnung')
    setRaeume(data || [])
    setLoading(false)
  }

  const aktiveRaeume = useMemo(() => raeume.filter((r) => !r.archiv_name), [raeume])
  const archivRaeume = useMemo(() => raeume.filter((r) => r.archiv_name), [raeume])
  const archivNamen = useMemo(() => [...new Set(archivRaeume.map((r) => r.archiv_name!))], [archivRaeume])

  const grouped = useMemo(() => {
    const source = showArchiv ? archivRaeume : aktiveRaeume
    const groups: Record<string, Raum[]> = {}
    source.forEach((r) => {
      const key = r.archiv_name || r.geschoss || 'Unbekannt'
      if (!groups[key]) groups[key] = []
      groups[key].push(r)
    })
    return groups
  }, [aktiveRaeume, archivRaeume, showArchiv])

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setModalOpen(true)
  }

  function openEdit(r: Raum) {
    setForm({
      bezeichnung: r.bezeichnung,
      geschoss: r.geschoss || '',
      bemerkung: r.bemerkung || '',
      verwendung: r.verwendung,
      archiv_name: r.archiv_name,
    })
    setEditId(r.id)
    setModalOpen(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('raeume').update(form).eq('id', editId)
    } else {
      await supabase.from('raeume').insert(form)
    }
    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id: number) {
    if (!confirm('Raum wirklich löschen?')) return
    await supabase.from('raeume').delete().eq('id', id)
    load()
  }

  async function handleArchivieren() {
    if (!archivName.trim()) return
    setSaving(true)
    // Alle aktiven Räume als Archiv-Snapshot duplizieren
    const aktive = aktiveRaeume.filter((r) => r.verwendung)
    const inserts = aktive.map((r) => ({
      bezeichnung: r.bezeichnung,
      geschoss: r.geschoss,
      bemerkung: r.bemerkung,
      verwendung: r.verwendung,
      archiv_name: archivName.trim(),
    }))
    await supabase.from('raeume').insert(inserts)
    setSaving(false)
    setArchivModalOpen(false)
    setArchivName('')
    load()
  }

  async function handleRestore(name: string) {
    if (!confirm(`Archiv "${name}" als aktuelle Raumliste wiederherstellen? Bestehende aktive Räume bleiben erhalten.`)) return
    const archiv = archivRaeume.filter((r) => r.archiv_name === name)
    const inserts = archiv.map((r) => ({
      bezeichnung: r.bezeichnung,
      geschoss: r.geschoss,
      bemerkung: r.bemerkung,
      verwendung: r.verwendung,
      archiv_name: null,
    }))
    await supabase.from('raeume').insert(inserts)
    load()
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Räume...</div>

  return (
    <>
      <AdminPageHeader
        title="Räume"
        description={`${aktiveRaeume.length} aktive Räume, ${archivNamen.length} Archive`}
        actions={
          <>
            <button
              onClick={() => setShowArchiv(!showArchiv)}
              className={`px-4 py-2 text-sm border rounded-lg transition ${showArchiv ? 'bg-herbi-blue text-white' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {showArchiv ? 'Aktive Räume' : 'Archiv anzeigen'}
            </button>
            <button onClick={() => setArchivModalOpen(true)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Archivieren
            </button>
            <button onClick={openNew} className="px-4 py-2 text-sm bg-herbi-orange text-white rounded-lg hover:bg-herbi-orange-dark transition">
              + Neuer Raum
            </button>
          </>
        }
      />

      {showArchiv && archivNamen.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {archivNamen.map((name) => (
            <button
              key={name}
              onClick={() => handleRestore(name)}
              className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
            >
              {name} wiederherstellen
            </button>
          ))}
        </div>
      )}

      {Object.entries(grouped).map(([group, rooms]) => (
        <div key={group} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{group}</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Bezeichnung</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 hidden sm:table-cell">Geschoss</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 hidden md:table-cell">Bemerkung</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Aktiv</th>
                  <th className="px-4 py-2 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{r.bezeichnung}</td>
                    <td className="px-4 py-2 text-gray-600 hidden sm:table-cell">{r.geschoss}</td>
                    <td className="px-4 py-2 text-gray-500 hidden md:table-cell text-xs">{r.bemerkung}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${r.verwendung ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(r)} className="text-herbi-orange text-xs font-medium">Bearbeiten</button>
                        <button onClick={() => handleDelete(r.id)} className="text-red-500 text-xs font-medium">Löschen</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Raum Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Raum bearbeiten' : 'Neuer Raum'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bezeichnung *</label>
            <input required value={form.bezeichnung} onChange={(e) => setForm({ ...form, bezeichnung: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Geschoss</label>
            <select value={form.geschoss || ''} onChange={(e) => setForm({ ...form, geschoss: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="">– Bitte wählen –</option>
              {GESCHOSSE.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bemerkung</label>
            <textarea value={form.bemerkung || ''} onChange={(e) => setForm({ ...form, bemerkung: e.target.value })} rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="verwendung" checked={form.verwendung} onChange={(e) => setForm({ ...form, verwendung: e.target.checked })}
              className="rounded border-gray-300 text-herbi-orange focus:ring-herbi-orange" />
            <label htmlFor="verwendung" className="text-sm text-gray-700">Wird für aktuelle Veranstaltung genutzt</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-herbi-orange text-white py-2 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50">
              {saving ? 'Speichere...' : 'Speichern'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Abbrechen</button>
          </div>
        </form>
      </Modal>

      {/* Archiv Modal */}
      <Modal open={archivModalOpen} onClose={() => setArchivModalOpen(false)} title="Raumliste archivieren">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Erstellt einen Snapshot der aktuell verwendeten Räume. Die aktiven Räume bleiben unverändert.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Archiv-Name *</label>
            <input
              value={archivName}
              onChange={(e) => setArchivName(e.target.value)}
              placeholder="z.B. KMG 2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleArchivieren} disabled={!archivName.trim() || saving}
              className="flex-1 bg-herbi-orange text-white py-2 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50">
              {saving ? 'Archiviere...' : 'Archivieren'}
            </button>
            <button onClick={() => setArchivModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Abbrechen</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
