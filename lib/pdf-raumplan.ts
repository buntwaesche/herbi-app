import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Raum, Zeitslot, Berufsfeld } from '@/lib/types'

interface PlanungMap {
  get(key: string): number | null | undefined
}

export function generateRaumplanPDF(
  raeume: Raum[],
  zeitslots: Zeitslot[],
  berufsfelder: Berufsfeld[],
  planung: PlanungMap
) {
  // Querformat A4
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  const bfMap = new Map(berufsfelder.map((bf) => [bf.id, bf.name]))

  // Titel
  doc.setFontSize(18)
  doc.setTextColor(26, 26, 46) // herbi-blue
  doc.text('HerBI – Raumplan', 14, 15)

  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)
  doc.text(`Stand: ${new Date().toLocaleDateString('de-DE')}`, 14, 21)

  // Tabelle
  const headers = ['Raum', 'Geschoss', ...zeitslots.map((z) => z.label)]

  const rows = raeume.map((r) => {
    const row = [r.bezeichnung, r.geschoss || '']
    zeitslots.forEach((z) => {
      const bfId = planung.get(`${r.id}-${z.id}`)
      row.push(bfId ? bfMap.get(bfId) || '–' : '–')
    })
    return row
  })

  autoTable(doc, {
    startY: 25,
    head: [headers],
    body: rows,
    styles: {
      fontSize: 7,
      cellPadding: 2,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [26, 26, 46],
      textColor: [255, 255, 255],
      fontSize: 7,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 22 },
      1: { cellWidth: 20 },
    },
    didParseCell(data) {
      // Orange Hintergrund für belegte Slots
      if (data.section === 'body' && data.column.index >= 2) {
        const value = data.cell.text.join('')
        if (value && value !== '–') {
          data.cell.styles.fillColor = [247, 147, 30]
          data.cell.styles.textColor = [255, 255, 255]
          data.cell.styles.fontStyle = 'bold'
        }
      }
    },
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `HerBI – Herforder Berufsinformationstag | Seite ${i} von ${pageCount}`,
      14,
      doc.internal.pageSize.getHeight() - 7
    )
  }

  doc.save('HerBI_Raumplan.pdf')
}
