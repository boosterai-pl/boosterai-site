import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: '1200px',
        margin: '60px auto 40px',
        padding: '44px 48px 32px',
        borderRadius: '28px',
        background: 'linear-gradient(180deg,#DFE6F3 0%, #CFDAEE 100%)',
        border: '1px solid rgba(43,75,242,0.12)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr',
          gap: '40px',
        }}
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              color: 'var(--primary)',
              fontSize: '24px',
              letterSpacing: '0.02em',
              textDecoration: 'none',
            }}
          >
            BOOSTER
          </Link>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '14px',
              margin: '14px 0 20px',
              lineHeight: 1.5,
              maxWidth: '240px',
            }}
          >
            Automatyzuj procesy i zwiększaj sprzedaż razem z nami!
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: 'inline-grid',
              placeItems: 'center',
              width: '34px',
              height: '34px',
              background: 'var(--primary)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            in
          </a>
        </div>

        {/* Usługi */}
        <nav aria-label="Usługi">
          <h5
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              margin: '6px 0 18px',
              color: 'var(--navy)',
            }}
          >
            Usługi
          </h5>
          {[
            { href: '/uslugi', label: 'B2B Lead Generation' },
            { href: '/uslugi', label: 'Konsultacje' },
            { href: '/uslugi', label: 'Wdrożenia AI' },
            { href: '/uslugi', label: 'Oferty pracy' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'block',
                color: 'var(--muted)',
                fontSize: '14px',
                textDecoration: 'none',
                marginBottom: '10px',
                lineHeight: 1.5,
                transition: 'color .15s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Materiały */}
        <nav aria-label="Materiały">
          <h5
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              margin: '6px 0 18px',
              color: 'var(--navy)',
            }}
          >
            Materiały
          </h5>
          {[
            { href: '/kontakt', label: 'Umów spotkanie' },
            { href: '/use-cases', label: 'Referencje' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'block',
                color: 'var(--muted)',
                fontSize: '14px',
                textDecoration: 'none',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Kontakt */}
        <div>
          <h5
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              margin: '6px 0 18px',
              color: 'var(--navy)',
            }}
          >
            Kontakt
          </h5>
          <a
            href="mailto:kontakt@boosterai.pl"
            style={{
              display: 'block',
              color: 'var(--muted)',
              fontSize: '14px',
              textDecoration: 'none',
              marginBottom: '10px',
              lineHeight: 1.5,
            }}
          >
            kontakt@boosterai.pl
          </a>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '14px',
              marginBottom: '10px',
              lineHeight: 1.5,
            }}
          >
            Sales Booster sp. z o.o.
            <br />
            Wrocław
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
            NIP: PL8992976718
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(15,26,61,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: 'var(--muted)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          Copyright © {new Date().getFullYear()}&nbsp;
          <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>
            Sales Booster sp. z o.o.
          </strong>
          &nbsp; All rights reserved.
        </div>
        <Link
          href="/polityka-prywatnosci"
          style={{ color: 'var(--muted)', textDecoration: 'underline' }}
        >
          Ciasteczka i Polityka prywatności
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
