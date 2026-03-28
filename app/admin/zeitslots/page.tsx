'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Zeitslot } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import Modal from '@/components/Modal'

const emptyForm = { label: '', reihenfolge: 0 }

export default function ZeitslotsPage() {
  const [zeitslots, setZeitslots] = useState<Zeitslot[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('zeitslots').select('*').order('reihenfolge')
    setZeitslots(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm({ label: '', reihenfolge: (zeitslots.length + 1) })
    setEditId(null)
    setModalOpen(true)
  }

  function openEdit(z: Zeitslot) {
    setForm({ label: z.label, reihenfolge: z.reihenfolge })
    setEditId(z.id)
    setModalOpen(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('zeitslots').update(form).eq('id', editId)
    } else {
      await supabase.from('zeitslots').insert(form)
    }
    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id: number) {
    if (!confirm('Zeitslot wirklich löschen? Bestehende Planungen für diesen Slot gehen verloren.')) return
    await supabase.from('zeitslots').delete().eq('id', id)
    load()
  }

  async function moveUp(z: Zeitslot) {
    const idx = zeitslots.findIndex((s) => s.id === z.id)
    if (idx <= 0) return
    const prev = zeitslots[idx - 1]
    await Promise.all([
      supabase.from('zeitslots').update({ reihenfolge: prev.reihenfolge }).eq('id', z.id),
      supabase.from('zeitslots').update({ reihenfolge: z.reihenfolge }).eq('id', prev.id),
    ])
    load()
  }

  async function moveDown(z: Zeitslot) {
    const idx = zeitslots.findIndex((s) => s.id === z.id)
    if (idx >= zeitslots.length - 1) return
    const next = zeitslots[idx + 1]
    await Promise.all([
      supabase.from('zeitslots').update({ reihenfolge: next.reihenfolge }).eq('id', z.id),
      supabase.from('zeitslots').update({ reihenfolge: z.reihenfolge }).eq('id', next.id),
    ])
    load()
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Zeitslots...</div>

  return (
    <>
      <AdminPageHeader
        title="Zeitslots"
        description={`${zeitslots.length} Zeitblöcke konfiguriert`}
        actions={
          <button onClick={openNew} className="px-4 py-2 text-sm bg-herbi-orange text-white rounded-lg hover:bg-herbi-orange-dark transition">
            + Neuer Zeitslot
          </button>
        }
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-16">#</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Bezeichnung</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-32">Reihenfolge</th>
              <th className="px-4 py-3 w-40"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {zeitslots.map((z, idx) => (
              <tr key={z.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{z.label}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveUp(z)}
                      disabled={idx === 0}
                      className="px-2 py-1 text-xs border rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(z)}
                      disabled={idx === zeitslots.length - 1}
                      className="px-2 py-1 text-xs border rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ↓
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(z)} className="text-herbi-orange text-xs font-medium">Bearbeiten</button>
                    <button onClick={() => handleDelete(z.id)} className="text-red-500 text-xs font-medium">Löschen</button>
                  </div>
                </td>
              </tr>
            ))}
            {zeitslots.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Noch keine Zeitslots angelegt.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Zeitslot bearbeiten' : 'Neuer Zeitslot'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bezeichnung *</label>
            <input
              required
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="z.B. Block 1: 14:00 – 14:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reihenfolge</label>
            <input
              type="number"
              value={form.reihenfolge}
              onChange={(e) => setForm({ ...form, reihenfolge: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange outline-none"
            />
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
