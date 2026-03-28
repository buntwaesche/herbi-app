import Link from 'next/link'

export default function PublicFooter() {
  return (
    <footer className="bg-herbi-blue text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              Her<span className="text-herbi-orange">BI</span>
            </h3>
            <p className="text-sm">
              Herforder Berufsinformationstag &ndash; organisiert von den Rotary Clubs im Kreis Herford.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Links</h4>
            <div className="space-y-1 text-sm">
              <Link href="/berufsfelder" className="block hover:text-white transition">Berufsfelder</Link>
              <Link href="/anfahrt" className="block hover:text-white transition">Anfahrt</Link>
              <Link href="/weitersagen" className="block hover:text-white transition">Weitersagen</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Rechtliches</h4>
            <div className="space-y-1 text-sm">
              <Link href="/impressum" className="block hover:text-white transition">Impressum</Link>
              <Link href="/datenschutz" className="block hover:text-white transition">Datenschutz</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-herbi-blue-light text-xs text-center">
          &copy; {new Date().getFullYear()} HerBI &ndash; Herforder Berufsinformationstag
        </div>
      </div>
    </footer>
  )
}
