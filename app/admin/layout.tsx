'use client'

import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/admin/referenten', label: 'Referenten', icon: '👤' },
  { href: '/admin/berufsfelder', label: 'Berufsfelder', icon: '📋' },
  { href: '/admin/zuordnung', label: 'Zuordnung', icon: '🔗' },
  { href: '/admin/raeume', label: 'Räume', icon: '🏫' },
  { href: '/admin/zeitslots', label: 'Zeitslots', icon: '⏰' },
  { href: '/admin/planung', label: 'Planung', icon: '📅' },
  { href: '/admin/schulen', label: 'Schulen', icon: '🎓' },
  { href: '/admin/auswertung', label: 'Auswertung', icon: '📊' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Login-Seite ohne Admin-Layout rendern
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-herbi-blue text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1"
          aria-label="Menü öffnen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <h1 className="text-lg font-bold">
          Her<span className="text-herbi-orange">BI</span> Admin
        </h1>
        <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white">
          Abmelden
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-herbi-blue text-white transform transition-transform lg:translate-x-0 lg:static lg:inset-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-6 hidden lg:block">
            <Link href="/admin/referenten" className="block">
              <h1 className="text-2xl font-bold">
                Her<span className="text-herbi-orange">BI</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">Admin-Bereich</p>
            </Link>
          </div>

          <nav className="mt-4 lg:mt-0 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                    ${isActive
                      ? 'bg-herbi-orange text-white'
                      : 'text-gray-300 hover:bg-herbi-blue-light hover:text-white'}
                  `}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 hidden lg:block">
            <hr className="border-herbi-blue-light mb-4" />
            <Link href="/" className="block text-sm text-gray-400 hover:text-white mb-3 px-4">
              Zur Webseite &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-herbi-blue-light transition"
            >
              Abmelden
            </button>
          </div>
        </aside>

        {/* Overlay für mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Hauptinhalt */}
        <main className="flex-1 min-h-screen lg:min-h-screen">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
