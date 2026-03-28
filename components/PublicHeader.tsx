'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Start' },
  { href: '/berufsfelder', label: 'Berufsfelder' },
  { href: '/anfahrt', label: 'Anfahrt' },
  { href: '/weitersagen', label: 'Weitersagen' },
]

export default function PublicHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-herbi-blue text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Her<span className="text-herbi-orange">BI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href ? 'text-herbi-orange' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-1" aria-label="Menü">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden border-t border-herbi-blue-light px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm ${pathname === item.href ? 'text-herbi-orange' : 'text-gray-300'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
