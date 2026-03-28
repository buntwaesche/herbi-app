import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Raum, Zeitslot, Berufsfeld } from '@/lib/types'

interface PlanungMap {
  get(key: string): number | null | undefined
}

export function generateBerufsfeldPDF(
  raeume: Raum[],
  zeitslots: Zeitslot[],
  berufsfelder: Berufsfeld[],
  planung: PlanungMap
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  // Titel
  doc.setFontSize(18)
  doc.setTextColor(26, 26, 46)
  doc.text('HerBI – Berufsfelder-Übersicht', 14, 15)

  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)
  doc.text(`Stand: ${new Date().toLocaleDateString('de-DE')}`, 14, 21)

  // Berufsfelder mit Raum- und Zeitslot-Zuweisungen sammeln
  const entries: { name: string; raum: string; zeitslot: string }[] = []

  berufsfelder
    .filter((bf) => bf.anzeige)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'))
    .forEach((bf) => {
      let found = false
      raeume.forEach((r) => {
        zeitslots.forEach((z) => {
          const bfId = planung.get(`${r.id}-${z.id}`)
          if (bfId === bf.id) {
            entries.push({
              name: bf.name,
              raum: `${r.bezeichnung} (${r.geschoss || ''})`,
              zeitslot: z.label,
            })
            found = true
          }
        })
      })
      if (!found) {
        entries.push({ name: bf.name, raum: '– nicht geplant –', zeitslot: '–' })
      }
    })

  autoTable(doc, {
    startY: 25,
    head: [['Berufsfeld', 'Raum', 'Zeitslot']],
    body: entries.map((e) => [e.name, e.raum, e.zeitslot]),
    styles: {
      fontSize: 8,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [26, 26, 46],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 65 },
      1: { cellWidth: 55 },
      2: { cellWidth: 55 },
    },
    didParseCell(data) {
      if (data.section === 'body' && data.column.index === 1) {
        const value = data.cell.text.join('')
        if (value.includes('nicht geplant')) {
          data.cell.styles.textColor = [180, 180, 180]
          data.cell.styles.fontStyle = 'italic'
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

  doc.save('HerBI_Berufsfelder.pdf')
}
