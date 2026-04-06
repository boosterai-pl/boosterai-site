'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
            <span>BOOSTER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-current="page"
            >
              Booster
            </Link>
            <Link href="/uslugi" className="text-gray-700 hover:text-blue-600 transition-colors">
              Usługi
            </Link>
            <Link href="/use-cases" className="text-gray-700 hover:text-blue-600 transition-colors">
              Use cases
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="/kontakt"
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Darmowa konsultacja
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Booster
              </Link>
              <Link
                href="/uslugi"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Usługi
              </Link>
              <Link
                href="/use-cases"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use cases
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Darmowa konsultacja
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
