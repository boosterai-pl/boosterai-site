'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

import { navItems, type NavItem } from './Header.nav'

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const mobileNavId = useId()

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  const renderPillLink = (item: NavItem, onClick?: () => void) => {
    const active = isActive(pathname, item.href)
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        style={{
          color: active ? 'var(--primary)' : 'var(--navy)',
          background: active ? 'rgba(43,75,242,0.08)' : 'transparent',
          fontWeight: active ? 600 : 500,
          textDecoration: 'none',
          fontSize: '14.5px',
          padding: '10px 20px',
          borderRadius: '999px',
          transition: 'background .2s, color .2s',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(43,75,242,0.06)'
        }}
        onMouseLeave={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
        }}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header style={{ position: 'sticky', top: '20px', zIndex: 50, marginBottom: '-20px' }}>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded"
        style={{ background: 'var(--primary)', color: '#fff' }}
      >
        Skip to main content
      </a>

      {/* Floating pill — desktop */}
      <nav
        className="hidden md:flex"
        aria-label="Primary navigation"
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '0 8px 0 24px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="Booster — strona główna"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: 'var(--primary)',
            fontSize: '22px',
            letterSpacing: '0.02em',
            textDecoration: 'none',
          }}
        >
          BOOSTER
        </Link>

        {/* Pill */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 10px 40px -20px rgba(15,26,61,0.25)',
            padding: '8px',
            borderRadius: '999px',
          }}
        >
          {navItems.map((item) => renderPillLink(item))}
        </div>

        {/* CTA */}
        <Link
          href="/kontakt"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            padding: '12px 22px',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: '14.5px',
            boxShadow: '0 10px 30px -10px rgba(242,110,86,0.55)',
            transition: 'transform .15s ease, box-shadow .2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 14px 36px -10px rgba(242,110,86,0.6)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 10px 30px -10px rgba(242,110,86,0.55)'
          }}
        >
          Darmowa konsultacja
        </Link>
      </nav>

      {/* Mobile header */}
      <div
        className="md:hidden flex items-center justify-between"
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '0 16px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(43,75,242,0.1)',
          height: '60px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: 'var(--primary)',
            fontSize: '20px',
            letterSpacing: '0.02em',
            textDecoration: 'none',
          }}
        >
          BOOSTER
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls={mobileNavId}
          style={{
            padding: '8px',
            color: 'var(--navy)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id={mobileNavId}
          aria-label="Mobile navigation"
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderTop: '1px solid rgba(43,75,242,0.1)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navItems.map((item) => renderPillLink(item, () => setMobileMenuOpen(false)))}
          <Link
            href="/kontakt"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              padding: '12px 22px',
              borderRadius: '999px',
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14.5px',
              textDecoration: 'none',
              marginTop: '4px',
            }}
          >
            Darmowa konsultacja
          </Link>
        </nav>
      )}
    </header>
  )
}
