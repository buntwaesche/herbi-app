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
    <header className="bg-white">
      {/* Titel */}
      <div className="text-center pt-6 pb-2">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-extrabold text-herbi-blue">
            HerBI 2027
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            18. Herforder Berufs&shy;informations&shy;tag
          </p>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center justify-center gap-8 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-semibold uppercase tracking-wide transition ${
              pathname === item.href
                ? 'text-herbi-orange'
                : 'text-gray-600 hover:text-herbi-blue'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-center pb-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 p-2"
          aria-label="Menü"
        >
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
        <nav className="md:hidden border-t border-gray-200 px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-semibold uppercase ${
                pathname === item.href ? 'text-herbi-orange' : 'text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
