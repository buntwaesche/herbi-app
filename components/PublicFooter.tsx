import Link from 'next/link'

export default function PublicFooter() {
  return (
    <footer className="bg-white mt-12">
      {/* Rotary Logo */}
      <div className="text-center py-10">
        <p className="text-sm text-gray-500 mb-4">
          HerBI ist eine Veranstaltung der Rotary Clubs in Herford
        </p>
        <img
          src="/images/rotary-clubs-im-kreis-herford.png"
          alt="Rotary Clubs im Kreis Herford"
          className="mx-auto h-24"
        />
      </div>

      {/* Links */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link href="/impressum" className="hover:text-herbi-blue transition">Impressum</Link>
          <span>|</span>
          <Link href="/datenschutz" className="hover:text-herbi-blue transition">Datenschutz</Link>
          <span>|</span>
          <Link href="/admin/login" className="hover:text-herbi-blue transition">Anmelden</Link>
        </div>
      </div>
    </footer>
  )
}
