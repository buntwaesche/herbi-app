'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Berufsfeld } from '@/lib/types'
import AdminPageHeader from '@/components/AdminPageHeader'
import Modal from '@/components/Modal'

const emptyForm = {
  name: '',
  beschreibung: '',
  anzeige: true,
  bild_url: null as string | null,
}

export default function BerufsfelderPage() {
  const [berufsfelder, setBerufsfelder] = useState<Berufsfeld[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('berufsfelder').select('*').order('name')
    setBerufsfelder(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setModalOpen(true)
  }

  function openEdit(b: Berufsfeld) {
    setForm({
      name: b.name,
      beschreibung: b.beschreibung || '',
      anzeige: b.anzeige,
      bild_url: b.bild_url,
    })
    setEditId(b.id)
    setModalOpen(true)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from('berufsfeld-bilder')
      .upload(fileName, file, { upsert: true })

    if (!error) {
      const { data } = supabase.storage
        .from('berufsfeld-bilder')
        .getPublicUrl(fileName)
      setForm({ ...form, bild_url: data.publicUrl })
    }
    setUploading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (editId) {
      await supabase.from('berufsfelder').update(form).eq('id', editId)
    } else {
      await supabase.from('berufsfelder').insert(form)
    }

    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function handleDelete(id: number) {
    if (!confirm('Berufsfeld wirklich löschen?')) return
    await supabase.from('berufsfelder').delete().eq('id', id)
    load()
  }

  async function toggleAnzeige(b: Berufsfeld) {
    await supabase.from('berufsfelder').update({ anzeige: !b.anzeige }).eq('id', b.id)
    load()
  }

  if (loading) return <div className="p-8 text-gray-500">Lade Berufsfelder...</div>

  return (
    <>
      <AdminPageHeader
        title="Berufsfelder"
        description={`${berufsfelder.length} Berufsfelder, davon ${berufsfelder.filter(b => b.anzeige).length} sichtbar`}
        actions={
          <button onClick={openNew} className="px-4 py-2 text-sm bg-herbi-orange text-white rounded-lg hover:bg-herbi-orange-dark transition">
            + Neues Berufsfeld
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {berufsfelder.map((b) => (
          <div key={b.id} className={`bg-white rounded-xl shadow overflow-hidden ${!b.anzeige ? 'opacity-60' : ''}`}>
            {b.bild_url && (
              <div className="h-32 bg-gray-100 overflow-hidden">
                <img src={b.bild_url} alt={b.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-herbi-blue">{b.name}</h3>
                <button
                  onClick={() => toggleAnzeige(b)}
                  className={`text-xs px-2 py-0.5 rounded-full ${b.anzeige ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                >
                  {b.anzeige ? 'Sichtbar' : 'Ausgeblendet'}
                </button>
              </div>
              {b.beschreibung && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{b.beschreibung}</p>
              )}
              <div className="flex gap-3 mt-3 pt-3 border-t">
                <button onClick={() => openEdit(b)} className="text-herbi-orange hover:text-herbi-orange-dark text-xs font-medium">
                  Bearbeiten
                </button>
                <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">
                  Löschen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {berufsfelder.length === 0 && (
        <div className="text-center py-12 text-gray-400">Noch keine Berufsfelder vorhanden.</div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Berufsfeld bearbeiten' : 'Neues Berufsfeld'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea
              value={form.beschreibung || ''}
              onChange={(e) => setForm({ ...form, beschreibung: e.target.value })}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-herbi-orange focus:border-herbi-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bild</label>
            {form.bild_url && (
              <div className="mb-2 h-24 w-full bg-gray-100 rounded-lg overflow-hidden">
                <img src={form.bild_url} alt="Vorschau" className="h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm"
            />
            {uploading && <p className="text-xs text-gray-400 mt-1">Bild wird hochgeladen...</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anzeige"
              checked={form.anzeige}
              onChange={(e) => setForm({ ...form, anzeige: e.target.checked })}
              className="rounded border-gray-300 text-herbi-orange focus:ring-herbi-orange"
            />
            <label htmlFor="anzeige" className="text-sm text-gray-700">
              Auf öffentlicher Seite anzeigen
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-herbi-orange text-white py-2 rounded-lg hover:bg-herbi-orange-dark transition disabled:opacity-50">
              {saving ? 'Speichere...' : 'Speichern'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Abbrechen
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
