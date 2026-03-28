'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import type { Referent } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import StatusBadge from '@/components/StatusBadge'
import Modal from '@/components/Modal'

type ReferentForm = {
  vorname: string
  nachname: string
  email: string | null
  club: string | null
  bemerkung: string | null
  status: 'bestätigt' | 'angefragt' | 'abgesagt'
  anzeigen: boolean
}

const CLUBS = [
  'RC Herford',
  'RC Herford Widukind',
  'RC Herford Hanse',
  'RC Bünde',
  'RC Enger-Spenge',
  'RC Löhne-Bad Oeynhausen',
  'Sonstige',
]

const emptyForm: ReferentForm = {
  vorname: '',
  nachname: '',
  email: '',
  club: '',
  bemerkung: '',
  status: 'angefragt',
  anzeigen: false,
}



export default function ReferentenPage() {
  const [referenten, setReferenten] = useState<Referent[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<ReferentForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  // Filter
  const [filterStatus, setFilterStatus] = useState<string>('alle')
  const [filterClub, setFilterClub] = useState<string>('alle')
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadReferenten()
  }, [])

  async function loadReferenten() {
    const { data } = await supabase
      .from('referenten')
      .select('*')
      .order('nachname')
    setReferenten(data || [])
    setLoading(false)
  }

  const filtered = useMemo(() => {
    return referenten.filter((r) => {
      if (filterStatus !== 'alle' && r.status !== filterStatus) return false
      if (filterClub !== 'alle' && r.club !== filterClub) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          r.vorname.toLowerCase().includes(q) ||
          r.nachname.toLowerCase().includes(q) ||
          (r.email || '').toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [referenten, filterStatus, filterClub, search])

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setModalOpen(true)
  }

  function openEdit(r: Referent) {
    setForm({
      vorname: r.vorname,
      nachname: r.nachname,
      email: r.email,
      club: r.club,
      bemerkung: r.bemerkung,
      status: r.status,
      anzeigen: r.anzeigen,
    })
    setEditId(r.id)
    setModalOpen(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (editId) {
      await supabase.from('referenten').update(form).eq('id', editId)
    } else {
      await supabase.from('referenten').insert(form)
    }

    setSaving(false)
    setModalOpen(false)
    loadReferenten()
  }

  async function handleDelete(id: number) {
    if (!confirm('Referent wirklich löschen?')) return
    await supabase.from('referenten').delete().eq('id', id)
    loadReferenten()
  }

  function exportCSV() {
    const headers = ['Vorname', 'Nachname', 'E-Mail', 'Club', 'Status', 'Bemerkung', 'Sichtbar']
    const rows = filtered.map((r) => [
      r.vorname, r.nachname, r.email || '', r.club || '', r.status, r.bemerkung || '', r.anzeigen ? 'Ja' : 'Nein'
    ])
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(';')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `referenten_export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Referenten...</div>

  return (
    <>
      <AdminPageHeader
        title="Referenten"
        description={`${referenten.length} Referenten insgesamt, ${filtered.length} angezeigt`}
        actions={
          <>
            <button onClick={exportCSV} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              CSV-Export
            </button>
            <button onClick={openNew} className="px-4 py-2 text-sm bg-herbi-orange text-white rounded-lg hover:bg-herbi-orange-dark transition">
              + Neuer Referent
            </button>
          </>
        }
      />

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Suche nach Name oder E-Mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
        />
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
        <select
          value={filterClub}
          onChange={(e) => setFilterClub(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="alle">Alle Clubs</option>
          {CLUBS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Tabelle */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">E-Mail</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Club</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 font-medium text-gray-600 w-20">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{r.nachname}, {r.vorname}</div>
                  <div className="text-xs text-gray-400 sm:hidden">{r.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{r.email}</td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{r.club}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(r)} className="text-herbi-orange hover:text-herbi-orange-dark text-xs font-medium">
                      Bearbeiten
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">
                      Löschen
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Keine Referenten gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Referent bearbeiten' : 'Neuer Referent'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vorname *</label>
              <input
                required
                value={form.vorname}
                onChange={(e) => setForm({ ...form, vorname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachname *</label>
              <input
                required
                value={form.nachname}
                onChange={(e) => setForm({ ...form, nachname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
            <input
              type="email"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Club</label>
            <select
              value={form.club || ''}
              onChange={(e) => setForm({ ...form, club: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">– Bitte wählen –</option>
              {CLUBS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="angefragt">Angefragt</option>
              <option value="bestätigt">Bestätigt</option>
              <option value="abgesagt">Abgesagt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bemerkung</label>
            <textarea
              value={form.bemerkung || ''}
              onChange={(e) => setForm({ ...form, bemerkung: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anzeigen"
              checked={form.anzeigen || false}
              onChange={(e) => setForm({ ...form, anzeigen: e.target.checked })}
              className="rounded border-gray-300 text-herbi-orange focus:ring-herbi-orange"
            />
            <label htmlFor="anzeigen" className="text-sm text-gray-700">
              Auf öffentlicher Seite anzeigen
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-herbi-orange text-white py-2 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50"
            >
              {saving ? 'Speichere...' : 'Speichern'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
