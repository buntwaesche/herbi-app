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
  // Querformat A4 - wie beim Raumplan
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  // Titel
  doc.setFontSize(18)
  doc.setTextColor(26, 26, 46)
  doc.text('HerBI \u2013 Berufsfelder-\u00dcbersicht', 14, 15)

  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)
  doc.text(`Stand: ${new Date().toLocaleDateString('de-DE')}`, 14, 21)

  // Pro Berufsfeld eine Zeile, pro Zeitslot eine Spalte mit dem Raum.
  // Laeuft ein Berufsfeld im selben Block in mehreren Raeumen, stehen
  // beide in der Zelle.
  const raumLabel = (r: Raum) =>
    r.geschoss ? `${r.bezeichnung} (${r.geschoss})` : r.bezeichnung

  const rows = berufsfelder
    .filter((bf) => bf.anzeige)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'))
    .map((bf) => {
      const cells = zeitslots.map((z) => {
        const raumNamen = raeume
          .filter((r) => planung.get(`${r.id}-${z.id}`) === bf.id)
          .map(raumLabel)
        return raumNamen.length > 0 ? raumNamen.join(', ') : '\u2013'
      })
      return [bf.name, ...cells]
    })

  // Spaltenbreiten: Berufsfeld fest, Rest gleichmaessig auf die Bloecke
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 14
  const nameWidth = 70
  const slotWidth =
    Math.floor(((pageWidth - margin * 2 - nameWidth) / Math.max(zeitslots.length, 1)) * 100) / 100

  const columnStyles: Record<number, { cellWidth: number; fontStyle?: 'bold' }> = {
    0: { cellWidth: nameWidth, fontStyle: 'bold' },
  }
  zeitslots.forEach((_, i) => {
    columnStyles[i + 1] = { cellWidth: slotWidth }
  })

  autoTable(doc, {
    startY: 25,
    margin: { left: margin, right: margin },
    head: [['Berufsfeld', ...zeitslots.map((z) => z.label)]],
    body: rows,
    styles: {
      fontSize: 8,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
      overflow: 'linebreak',
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
    columnStyles,
    didParseCell(data) {
      // Freie Bloecke ausgrauen
      if (data.section === 'body' && data.column.index >= 1) {
        if (data.cell.text.join('') === '\u2013') {
          data.cell.styles.textColor = [180, 180, 180]
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
