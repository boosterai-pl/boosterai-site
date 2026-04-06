import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Usługi Column */}
          <nav aria-label="Services">
            <h3 className="font-bold text-gray-900 mb-4">Usługi</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/uslugi/sales-booster"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sales Booster
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/ai-booster"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  AI Booster
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/konsultacje"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Konsultacje
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/wdrozenia"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Wdrożenia
                </Link>
              </li>
            </ul>
          </nav>

          {/* Materiały Column */}
          <nav aria-label="Resources">
            <h3 className="font-bold text-gray-900 mb-4">Materiały</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-600 hover:text-blue-600 transition-colors">
                  O nas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt Column */}
          <nav aria-label="Contact">
            <h3 className="font-bold text-gray-900 mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:kontakt@boosterai.pl"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  kontakt@boosterai.pl
                </a>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Formularz kontaktowy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social/About Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Booster AI</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Automatyzacja i AI w procesach sprzedaży. Pomagamy firmom B2B osiągać lepsze wyniki.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Booster AI. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link
              href="/polityka-prywatnosci"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
