import type { Homepage } from '@/payload-types'

const extractLexicalText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const collect = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const current = node as { text?: string; children?: unknown[] }
    const ownText = typeof current.text === 'string' ? current.text : ''
    const childrenText = Array.isArray(current.children)
      ? current.children.map((child) => collect(child)).join(' ')
      : ''
    return `${ownText} ${childrenText}`.trim()
  }
  const lexical = value as { root?: unknown }
  const root = lexical.root ?? value
  return collect(root).replace(/\s+/g, ' ').trim()
}

/* Inline icon SVGs matching the design */
const icons: Record<string, React.ReactNode> = {
  leads: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="15" r="5" />
      <path d="M12 11 L20 3 M16 3h4v4" />
    </svg>
  ),
  strategy: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h12a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V6Z" />
      <path d="M4 6a3 3 0 0 1 3-3h12v14" />
    </svg>
  ),
  crm: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5 L20 20" />
      <path d="M9 11 h4" />
    </svg>
  ),
  consulting: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 5h7v15H6a2 2 0 0 1-2-2V5Z" />
      <path d="M20 5h-7v15h5a2 2 0 0 0 2-2V5Z" />
      <path d="M4 5 L2 5 M20 5 L22 5" />
    </svg>
  ),
  voice: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="13" rx="3" />
      <path d="M5 11 a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  ),
  chat: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h12a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V6Z" />
      <path d="M4 6a3 3 0 0 1 3-3h12v14" />
    </svg>
  ),
  docs: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5 L20 20" />
      <path d="M8 11h6 M11 8v6" />
    </svg>
  ),
  custom: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20 V8 M9 20 V12 M14 20 V5 M19 20 V10" />
      <path d="M3 20 h18" />
    </svg>
  ),
}

const DEFAULT_ICONS = ['leads', 'strategy', 'crm', 'consulting', 'voice', 'chat', 'docs', 'custom']

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M16 3 C17 11 21 15 29 16 C21 17 17 21 16 29 C15 21 11 17 3 16 C11 15 15 11 16 3 Z"
      fill="#2B4BF2"
    />
  </svg>
)

const FALLBACK_SALES = [
  {
    title: 'Wsparcie sprzedaży B2B',
    description:
      'Wspieramy firmy, które chcą pozyskiwać więcej klientów B2B i zwiększać wyniki sprzedaży. Pomagamy optymalizować procesy, prowadzimy spersonalizowane kampanie i dopasowujemy strategie do rynku i sytuacji przedsiębiorstwa.',
  },
  {
    title: 'Generowanie leadów B2B',
    description:
      'Pozyskujemy wartościowe kontakty biznesowe, które zamieniamy w Twoich potencjalnych klientów.',
  },
  {
    title: 'Strategie sprzedaży B2B',
    description:
      'Tworzymy skuteczne strategie sprzedaży B2B, które pomagają osiągać lepsze wyniki i zdobywać przewagę na rynku.',
  },
  {
    title: "Wdrożenia CRM'ów",
    description:
      'Wdrażamy systemy CRM, które usprawniają zarządzanie sprzedażą i poprawiają efektywność zespołów handlowych.',
  },
  {
    title: 'Konsultacje',
    description:
      'Prowadzimy konsultacje, które pomagają usprawnić procesy sprzedażowe i osiągać lepsze wyniki biznesowe.',
  },
]

const FALLBACK_AI = [
  {
    title: 'AI w optymalizacji procesów',
    description:
      'Wykorzystujemy AI do optymalizacji procesów, zwiększając efektywność zespołów i automatyzując kluczowe obszary w przedsiębiorstwie.',
  },
  {
    title: 'AI Voice Boty',
    description:
      'Wdrażamy AI voice boty, które automatyzują obsługę klienta i wspierają procesy sprzedażowe.',
  },
  {
    title: 'AI Chat Boty',
    description:
      'Tworzymy AI chat boty, które usprawniają komunikację z klientami i wspierają działania sprzedażowe.',
  },
  {
    title: 'AI Document Processing',
    description:
      'Automatyzujemy przetwarzanie dokumentów, usprawniając zarządzanie danymi i oszczędzając czas.',
  },
  {
    title: 'Wdrożenia indywidualne',
    description:
      'Realizujemy indywidualne wdrożenia, dopasowane do specyfiki i potrzeb Twojego biznesu.',
  },
]

interface ServicesSectionProps {
  data: Homepage['salesBooster'] | Homepage['aiBooster']
  sectionId?: string
}

export default function ServicesSection({ data, sectionId }: ServicesSectionProps) {
  if (!data) return null

  const subtitle = extractLexicalText(data.sectionSubtitle)
  const services =
    data.services && data.services.length > 0
      ? data.services
      : sectionId === 'sales-booster'
        ? FALLBACK_SALES
        : FALLBACK_AI

  const [highlightService, ...smallServices] = services

  return (
    <section id={sectionId} style={{ padding: '40px 0' }}>
      {/* Section label (tag line above bento) */}
      {data.sectionTitle && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--primary)',
            fontWeight: 600,
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          <SparkleIcon />
          {data.sectionTitle}
          <SparkleIcon />
        </div>
      )}

      {subtitle && (
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>{subtitle}</p>
      )}

      {/* Bento grid */}
      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '1fr',
        }}
      >
        {/* Highlight card — spans 2 columns */}
        {highlightService && (
          <div
            style={{
              gridColumn: 'span 2',
              background:
                'radial-gradient(600px 300px at 20% -20%, rgba(255,255,255,.9), transparent 60%), linear-gradient(160deg,#E5ECFB 0%, #CCD8F2 100%)',
              border: '1px solid rgba(43,75,242,0.18)',
              borderRadius: '22px',
              padding: '36px',
              position: 'relative',
              transition: 'transform .2s ease, box-shadow .2s ease',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '14px',
                marginBottom: '22px',
              }}
            >
              <SparkleIcon />
              {data.sectionTitle}
            </div>
            <h3
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '44px',
                lineHeight: 1.1,
                fontWeight: 700,
                marginBottom: '18px',
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
              }}
            >
              {highlightService.title ?? ''}
            </h3>
            {highlightService.description && (
              <p
                style={{ color: '#4B5778', fontSize: '15.5px', lineHeight: 1.6, maxWidth: '420px' }}
              >
                {highlightService.description}
              </p>
            )}
          </div>
        )}

        {/* Small service cards */}
        {smallServices.map((service, index) => {
          const iconKey = DEFAULT_ICONS[index + 1] ?? 'custom'
          return (
            <div
              key={('id' in service && service.id) || index}
              style={{
                background: 'linear-gradient(180deg,#FDFDFF 0%, #F4F7FD 100%)',
                border: '1px solid var(--border)',
                borderRadius: '22px',
                padding: '28px',
                position: 'relative',
                transition: 'transform .2s ease, box-shadow .2s ease',
              }}
            >
              {/* Icon wrap */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(180deg,#DDE6F7,#C7D4EF)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--navy-soft)',
                  marginBottom: '32px',
                  border: '1px solid rgba(43,75,242,0.12)',
                }}
              >
                {icons[iconKey]}
              </div>
              <h4
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '10px 0 8px',
                  color: 'var(--navy)',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.title}
              </h4>
              {service.description && (
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55 }}>
                  {service.description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #${sectionId ?? 'services'} > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #${sectionId ?? 'services'} > div:last-child > div:first-child {
            grid-column: span 1 !important;
          }
          #${sectionId ?? 'services'} > div:last-child h3 {
            font-size: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
