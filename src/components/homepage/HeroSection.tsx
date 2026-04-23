import Image from 'next/image'
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface HeroSectionProps {
  data: Homepage['hero']
}

export default function HeroSection({ data }: HeroSectionProps) {
  const headline = data?.headline || 'AI & Automation Agency'
  const subheadline = data?.subheadline || 'Wdrażamy Automatyzację i AI w procesach sprzedaży.'
  const ctaLabel = data?.ctaLabel || 'Kontakt'
  const ctaUrl = data?.ctaUrl || '/kontakt'
  const badgeText = data?.badgeText || 'Najpopularniejsze LLMy dla Twojej firmy'
  const badgeSubtext = data?.badgeSubtext || 'Ponad 300 gotowych automatyzacji'

  const illustration =
    data?.illustration && typeof data.illustration === 'object' ? data.illustration : null
  const illustrationUrl = illustration?.url ?? null

  return (
    <section
      id="home"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        padding: '80px 0 60px',
      }}
    >
      <div>
        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '76px',
            lineHeight: 1.02,
            fontWeight: 700,
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: 'var(--primary)' }}>Booster</span>
          {/* Rocket inline SVG */}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: '8px',
              transform: 'translateY(-4px)',
            }}
          >
            <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 4 C44 16 48 28 48 40 L40 40 L32 52 L24 40 L16 40 C16 28 20 16 32 4 Z"
                fill="#2B4BF2"
              />
              <circle cx="32" cy="24" r="5" fill="#fff" />
              <path d="M20 42 L14 54 L24 48 Z" fill="#F26E56" />
              <path d="M44 42 L50 54 L40 48 Z" fill="#F26E56" />
            </svg>
          </span>
          <br />
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          style={{
            marginTop: '22px',
            color: 'var(--muted)',
            fontSize: '17px',
            maxWidth: '480px',
            lineHeight: 1.5,
          }}
        >
          {subheadline}
        </p>

        {/* CTAs row */}
        <div
          style={{
            marginTop: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* Blue CTA */}
          <Link
            href={ctaUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary)',
              color: '#fff',
              textDecoration: 'none',
              padding: '12px 22px',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '14.5px',
              boxShadow: '0 12px 30px -10px rgba(43,75,242,0.5)',
              transition: 'transform .15s ease, box-shadow .2s ease',
            }}
          >
            {ctaLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* LLM logos row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Claude-ish sunburst */}
              <div style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                  <g fill="#D97757">
                    <rect x="15" y="2" width="2" height="8" rx="1" />
                    <rect x="15" y="22" width="2" height="8" rx="1" />
                    <rect x="2" y="15" width="8" height="2" rx="1" />
                    <rect x="22" y="15" width="8" height="2" rx="1" />
                    <rect x="15" y="2" width="2" height="8" rx="1" transform="rotate(45 16 16)" />
                    <rect x="15" y="2" width="2" height="8" rx="1" transform="rotate(-45 16 16)" />
                    <rect x="15" y="22" width="2" height="8" rx="1" transform="rotate(45 16 16)" />
                    <rect x="15" y="22" width="2" height="8" rx="1" transform="rotate(-45 16 16)" />
                  </g>
                </svg>
              </div>
              {/* GPT-ish knot */}
              <div style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="#0F1A3D"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M16 4 a6 6 0 0 1 6 6 v12 a6 6 0 0 1-6 6 a6 6 0 0 1-6-6 v-12 a6 6 0 0 1 6-6Z" />
                  <path d="M4 16 a6 6 0 0 1 6-6 h12 a6 6 0 0 1 6 6 a6 6 0 0 1-6 6 h-12 a6 6 0 0 1-6-6Z" />
                </svg>
              </div>
              {/* Gemini-ish sparkle */}
              <div style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    d="M16 3 C17 11 21 15 29 16 C21 17 17 21 16 29 C15 21 11 17 3 16 C11 15 15 11 16 3 Z"
                    fill="#2B4BF2"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--navy)',
                  fontWeight: 600,
                }}
              >
                {badgeText}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '2px' }}>
                {badgeSubtext}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div>
        {illustrationUrl ? (
          <Image
            src={illustrationUrl}
            alt={illustration?.alt || ''}
            width={520}
            height={460}
            priority
            style={{ width: '100%', maxWidth: '520px', display: 'block', marginLeft: 'auto' }}
          />
        ) : (
          <Image
            src="/hero-illustration.svg"
            alt=""
            width={520}
            height={460}
            unoptimized
            aria-hidden="true"
            style={{ width: '100%', maxWidth: '520px', display: 'block', marginLeft: 'auto' }}
          />
        )}
      </div>

      {/* Mobile styles via inline media — handled via Tailwind responsive classes below */}
      <style>{`
        @media (max-width: 900px) {
          #home {
            grid-template-columns: 1fr !important;
            padding: 40px 0 !important;
          }
          #home h1 {
            font-size: 52px !important;
          }
        }
      `}</style>
    </section>
  )
}
