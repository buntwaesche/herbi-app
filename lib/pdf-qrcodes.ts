import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import type { Raum, Zeitslot, Berufsfeld } from '@/lib/types'

interface PlanungMap {
  get(key: string): number | null | undefined
}

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://herbi.rocks'

export async function generateQRCodePDF(
  raeume: Raum[],
  zeitslots: Zeitslot[],
  berufsfelder: Berufsfeld[],
  planung: PlanungMap
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const bfMap = new Map(berufsfelder.map((bf) => [bf.id, bf.name]))

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const qrSize = 40
  const colCount = 4
  const rowCount = 5
  const cellWidth = (pageWidth - margin * 2) / colCount
  const cellHeight = (pageHeight - margin * 2 - 15) / rowCount // 15mm für Titel

  // QR-Codes sammeln
  const items: { raum: Raum; zeitslot: Zeitslot; bfName: string; scanUrl: string }[] = []

  for (const r of raeume) {
    for (const z of zeitslots) {
      const bfId = planung.get(`${r.id}-${z.id}`)
      if (bfId) {
        items.push({
          raum: r,
          zeitslot: z,
          bfName: bfMap.get(bfId) || 'Unbekannt',
          scanUrl: `${BASE_URL}/scan?r=${r.id}&s=${z.id}`,
        })
      }
    }
  }

  let itemIndex = 0

  while (itemIndex < items.length) {
    if (itemIndex > 0) doc.addPage()

    // Titel
    doc.setFontSize(12)
    doc.setTextColor(26, 26, 46)
    doc.text('HerBI – QR-Codes für Seminarteilnahme', margin, 12)

    for (let row = 0; row < rowCount && itemIndex < items.length; row++) {
      for (let col = 0; col < colCount && itemIndex < items.length; col++) {
        const item = items[itemIndex]
        const x = margin + col * cellWidth
        const y = margin + 15 + row * cellHeight

        // QR-Code generieren
        try {
          const qrDataUrl = await QRCode.toDataURL(item.scanUrl, {
            width: 200,
            margin: 1,
            color: { dark: '#1A1A2E', light: '#FFFFFF' },
          })

          // QR-Code zentriert in Zelle
          const qrX = x + (cellWidth - qrSize) / 2
          doc.addImage(qrDataUrl, 'PNG', qrX, y, qrSize, qrSize)

          // Raum-Bezeichnung
          doc.setFontSize(8)
          doc.setTextColor(26, 26, 46)
          doc.setFont('helvetica', 'bold')
          const raumText = item.raum.bezeichnung
          const raumWidth = doc.getTextWidth(raumText)
          doc.text(raumText, x + (cellWidth - raumWidth) / 2, y + qrSize + 4)

          // Zeitslot
          doc.setFontSize(6)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(100, 100, 100)
          const slotText = item.zeitslot.label
          const slotWidth = doc.getTextWidth(slotText)
          doc.text(slotText, x + (cellWidth - slotWidth) / 2, y + qrSize + 8)

          // Berufsfeld (abgekürzt wenn nötig)
          doc.setFontSize(5)
          let bfText = item.bfName
          if (doc.getTextWidth(bfText) > cellWidth - 4) {
            bfText = bfText.substring(0, 25) + '...'
          }
          const bfWidth = doc.getTextWidth(bfText)
          doc.text(bfText, x + (cellWidth - bfWidth) / 2, y + qrSize + 11)
        } catch {
          // QR-Code Fehler – Platzhalter
          doc.setFontSize(7)
          doc.text('QR-Fehler', x + 5, y + 20)
        }

        itemIndex++
      }
    }

    // Footer
    doc.setFontSize(6)
    doc.setTextColor(150, 150, 150)
    doc.setFont('helvetica', 'normal')
    const pageNum = doc.getNumberOfPages()
    doc.text(
      `HerBI – QR-Code-Sheet | Seite ${pageNum}`,
      margin,
      pageHeight - 5
    )
  }

  if (items.length === 0) {
    doc.setFontSize(14)
    doc.setTextColor(150, 150, 150)
    doc.text('Keine Planungen vorhanden.', pageWidth / 2 - 30, pageHeight / 2)
  }

  doc.save('HerBI_QR-Codes.pdf')
}
