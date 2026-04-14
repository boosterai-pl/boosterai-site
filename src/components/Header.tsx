'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

import boosterWordmark from '../../public/Booster-logo.png'
import boosterSygnet from '../../public/Blue-sygnet-with-background-1x1-1.png'
import { navItems, type NavItem } from './Header.nav'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded'

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function navLinkClass(active: boolean): string {
  const base = 'transition-colors motion-reduce:transition-none'
  const state = active
    ? 'text-blue-600 font-semibold underline underline-offset-8 decoration-2'
    : 'text-gray-700 hover:text-blue-600'
  return `${base} ${state} ${focusRing}`
}

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const mobileNavId = useId()

  // Close drawer on route change (derive during render — React 19 pattern)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  // Close drawer on Escape
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

  const renderLink = (item: NavItem, onClick?: () => void) => {
    const active = isActive(pathname, item.href)
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={navLinkClass(active)}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Booster AI — strona główna"
            className={`flex items-center gap-2 ${focusRing}`}
          >
            <Image src={boosterSygnet} alt="" priority className="h-9 w-9 md:h-10 md:w-10" />
            <Image src={boosterWordmark} alt="Booster AI" priority className="h-6 md:h-7 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
            {navItems.map((item) => renderLink(item))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="/kontakt"
            className={`hidden md:inline-flex items-center px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors motion-reduce:transition-none ${focusRing}`}
          >
            Umów spotkanie
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`md:hidden p-3 text-gray-700 hover:text-blue-600 ${focusRing}`}
            aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileNavId}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id={mobileNavId} className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {navItems.map((item) => renderLink(item, () => setMobileMenuOpen(false)))}
              <Link
                href="/kontakt"
                className={`inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors motion-reduce:transition-none ${focusRing}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Umów spotkanie
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
