'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Schule } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import Modal from '@/components/Modal'

const emptyForm = { name: '', basis_schueler: 0 }

export default function SchulenPage() {
  const [schulen, setSchulen] = useState<Schule[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('schulen').select('*').order('name')
    setSchulen(data || [])
    setLoading(false)
  }

  const filtered = schulen.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setModalOpen(true)
  }

  function openEdit(s: Schule) {
    setForm({ name: s.name, basis_schueler: s.basis_schueler })
    setEditId(s.id)
    setModalOpen(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('schulen').update(form).eq('id', editId)
    } else {
      await supabase.from('schulen').insert(form)
    }
    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id: number) {
    if (!confirm('Schule wirklich löschen?')) return
    await supabase.from('schulen').delete().eq('id', id)
    load()
  }

  function exportCSV() {
    const headers = ['Name', 'Basisschüler']
    const rows = filtered.map((s) => [s.name, s.basis_schueler.toString()])
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(';')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `schulen_export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCSVImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const lines = text.split('\n').filter((l) => l.trim())
    // Erste Zeile = Header, Rest = Daten
    const dataLines = lines.slice(1)

    const inserts = dataLines.map((line) => {
      // CSV mit Semikolon oder Komma
      const sep = line.includes(';') ? ';' : ','
      const cols = line.split(sep).map((c) => c.replace(/^"|"$/g, '').trim())
      return {
        name: cols[0] || '',
        basis_schueler: parseInt(cols[1]) || 0,
      }
    }).filter((s) => s.name)

    if (inserts.length === 0) {
      alert('Keine gültigen Daten in der CSV-Datei gefunden.')
      return
    }

    if (!confirm(`${inserts.length} Schulen importieren?`)) return

    const { error } = await supabase.from('schulen').insert(inserts)
    if (error) {
      alert('Fehler beim Import: ' + error.message)
    } else {
      load()
    }
    e.target.value = ''
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Schulen...</div>

  const totalSchueler = schulen.reduce((sum, s) => sum + s.basis_schueler, 0)

  return (
    <>
      <AdminPageHeader
        title="Schulen"
        description={`${schulen.length} Schulen, ${totalSchueler.toLocaleString('de-DE')} Basisschüler gesamt`}
        actions={
          <div className="flex gap-2 flex-wrap">
            <button onClick={exportCSV} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              CSV-Export
            </button>
            <label className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              CSV-Import
              <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
            </label>
            <button onClick={openNew} className="px-4 py-2 text-sm bg-herbi-orange text-white rounded-lg hover:bg-herbi-orange-dark transition">
              + Neue Schule
            </button>
          </div>
        }
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Schule suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Schulname</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Basisschüler</th>
              <th className="px-4 py-3 w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-right text-gray-600">{s.basis_schueler.toLocaleString('de-DE')}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(s)} className="text-herbi-orange text-xs font-medium">Bearbeiten</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-500 text-xs font-medium">Löschen</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">Keine Schulen gefunden.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Schule bearbeiten' : 'Neue Schule'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schulname *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Basisschülerzahl</label>
            <input
              type="number"
              min={0}
              value={form.basis_schueler}
              onChange={(e) => setForm({ ...form, basis_schueler: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Grundlage für die prozentuale Auswertung</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-herbi-orange text-white py-2 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50">
              {saving ? 'Speichere...' : 'Speichern'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Abbrechen</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
