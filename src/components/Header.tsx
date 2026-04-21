'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

// On the homepage nav items scroll to sections; on other pages they navigate to /.
const NAV_ITEMS = [
  { label: 'Booster', hash: 'home', route: '/' },
  { label: 'Usługi', hash: 'uslugi', route: '/#uslugi' },
  { label: 'Use cases', hash: 'use-cases', route: '/#use-cases' },
  { label: 'Kontakt', hash: 'kontakt', route: '/#kontakt' },
] as const

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomepage = pathname === '/'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('home')
  const mobileNavId = useId()

  // Close drawer on route change
  const [lastPathname, setLastPathname] = useState(pathname)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  // Intersection observer to highlight active section
  useEffect(() => {
    if (!isHomepage) return
    const ids = ['home', 'uslugi', 'use-cases', 'kontakt']
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveHash(en.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [isHomepage])

  // Escape closes mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  // Body scroll lock while drawer open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  function handleNavClick(e: React.MouseEvent, hash: string, route: string, closeMobile?: boolean) {
    if (closeMobile) setMobileMenuOpen(false)
    if (isHomepage) {
      e.preventDefault()
      scrollToId(hash)
      setActiveHash(hash)
    } else {
      // Navigate to homepage then scroll — Next.js router.push + onLoad scroll
      e.preventDefault()
      router.push(route)
    }
  }

  function renderLink(
    item: (typeof NAV_ITEMS)[number],
    closeMobile?: boolean,
  ) {
    const active = isHomepage ? activeHash === item.hash : pathname === item.route
    return (
      <a
        key={item.hash}
        href={isHomepage ? `#${item.hash}` : item.route}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => handleNavClick(e, item.hash, item.route, closeMobile)}
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
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(43,75,242,0.06)'
        }}
        onMouseLeave={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
        }}
      >
        {item.label}
      </a>
    )
  }

  function handleCtaClick(e: React.MouseEvent, closeMobile?: boolean) {
    if (closeMobile) setMobileMenuOpen(false)
    if (isHomepage) {
      e.preventDefault()
      scrollToId('kontakt')
      setActiveHash('kontakt')
    }
    // else let Next.js Link handle routing to /kontakt
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

      {/* Desktop floating pill */}
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
        <a
          href={isHomepage ? '#home' : '/'}
          onClick={(e) => handleNavClick(e, 'home', '/')}
          aria-label="Booster — strona główna"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: 'var(--primary)',
            fontSize: '22px',
            letterSpacing: '0.02em',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BOOSTER
        </a>

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
          {NAV_ITEMS.map((item) => renderLink(item))}
        </div>

        {/* CTA */}
        {isHomepage ? (
          <a
            href="#kontakt"
            onClick={(e) => handleCtaClick(e)}
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
              cursor: 'pointer',
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
          </a>
        ) : (
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
          >
            Darmowa konsultacja
          </Link>
        )}
      </nav>

      {/* Mobile header bar */}
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
        <a
          href={isHomepage ? '#home' : '/'}
          onClick={(e) => handleNavClick(e, 'home', '/')}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: 'var(--primary)',
            fontSize: '20px',
            letterSpacing: '0.02em',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BOOSTER
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls={mobileNavId}
          style={{ padding: '8px', color: 'var(--navy)', background: 'none', border: 'none', cursor: 'pointer' }}
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
          {NAV_ITEMS.map((item) => renderLink(item, true))}
          {isHomepage ? (
            <a
              href="#kontakt"
              onClick={(e) => handleCtaClick(e, true)}
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
                cursor: 'pointer',
              }}
            >
              Darmowa konsultacja
            </a>
          ) : (
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
          )}
        </nav>
      )}
    </header>
  )
}
