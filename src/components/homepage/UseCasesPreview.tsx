import Image from 'next/image'
import Link from 'next/link'
import type { Homepage, UseCase } from '@/payload-types'

interface UseCasesPreviewProps {
  data: Homepage['useCasesSection']
}

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M16 3 C17 11 21 15 29 16 C21 17 17 21 16 29 C15 21 11 17 3 16 C11 15 15 11 16 3 Z"
      fill="#2B4BF2"
    />
  </svg>
)

const isUseCase = (value: unknown): value is UseCase => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<UseCase>
  return typeof candidate.id === 'number' && typeof candidate.slug === 'string'
}

export default function UseCasesPreview({ data }: UseCasesPreviewProps) {
  if (!data) return null
  const cases = (data.featuredCases ?? []).filter(isUseCase)
  const manualCards = data.manualCards ?? []
  const showManual = cases.length === 0

  const eyebrow = data.eyebrowText || 'Poznaj nasze wdrożenia'

  return (
    <section
      style={{
        margin: '60px 0',
        padding: '60px 48px',
        borderRadius: '28px',
        background: 'linear-gradient(170deg,#DDE5F4 0%, #C9D5EE 100%)',
        border: '1px solid rgba(43,75,242,0.12)',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        <SparkleIcon />
        {eyebrow}
        <SparkleIcon />
      </div>

      {/* Title */}
      {data.sectionTitle && (
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            textAlign: 'center',
            fontSize: '54px',
            lineHeight: 1.08,
            fontWeight: 700,
            marginTop: '14px',
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
          }}
        >
          {data.sectionTitle}
        </h2>
      )}

      {/* Cards grid — 3 cols, max 2 real cards + empty slot */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginTop: '44px',
          maxWidth: '960px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {(showManual ? manualCards : cases).map((item, index) => {
          if (showManual) {
            const card = item as Homepage['useCasesSection']['manualCards'][number]
            const imageUrl =
              card.image && typeof card.image === 'object' && card.image.url
                ? card.image.url
                : index % 2 === 0
                  ? '/usecase-1.svg'
                  : '/usecase-2.svg'

            return (
              <article
                key={`manual-${index}`}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -24px rgba(15,26,61,0.18)',
                  cursor: 'pointer',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                    background: '#E4E9F2',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    unoptimized
                    aria-hidden="true"
                    style={{ objectFit: 'cover' }}
                  />
                  {card.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'var(--primary)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '22px 22px 26px' }}>
                  {card.title && (
                    <h4
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: '18px',
                        fontWeight: 700,
                        marginBottom: '8px',
                        lineHeight: 1.25,
                        color: 'var(--navy)',
                      }}
                    >
                      {card.title}
                    </h4>
                  )}
                  {card.date && (
                    <div
                      style={{
                        color: 'var(--muted)',
                        fontSize: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {card.date}
                    </div>
                  )}
                  {card.excerpt && (
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.55 }}>
                      {card.excerpt}
                    </p>
                  )}
                </div>
              </article>
            )
          }

          const useCase = item as UseCase
          const coverImage =
            useCase.coverImage &&
            typeof useCase.coverImage === 'object' &&
            'url' in useCase.coverImage
              ? useCase.coverImage
              : null

          const categoryName =
            useCase.category && typeof useCase.category === 'object'
              ? useCase.category.name
              : null

          const formattedDate = useCase.publishedDate
            ? new Intl.DateTimeFormat('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date(useCase.publishedDate))
            : null

          // excerpt comes from CMS if available, otherwise fall back to client field
          const excerptText =
            (useCase as UseCase & { excerpt?: string }).excerpt || useCase.client || ''

          return (
            <Link
              key={useCase.id}
              href={`/use-cases/${useCase.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -24px rgba(15,26,61,0.18)',
                  cursor: 'pointer',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                }}
              >
                {/* Thumb */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                    background: '#E4E9F2',
                  }}
                >
                  {coverImage?.url ? (
                    <Image
                      src={coverImage.url}
                      alt={coverImage.alt || useCase.title || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <Image
                      src="/usecase-1.svg"
                      alt=""
                      fill
                      unoptimized
                      aria-hidden="true"
                      style={{ objectFit: 'cover' }}
                    />
                  )}

                  {/* Badge */}
                  {categoryName && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'var(--primary)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                      }}
                    >
                      {categoryName}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '22px 22px 26px' }}>
                  <h4
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      lineHeight: 1.25,
                      color: 'var(--navy)',
                    }}
                  >
                    {useCase.title}
                  </h4>
                  {formattedDate && (
                    <div
                      style={{
                        color: 'var(--muted)',
                        fontSize: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {formattedDate}
                    </div>
                  )}
                  {excerptText && (
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.55 }}>
                      {excerptText}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          )
        })}
        {/* third empty slot, to match design layout */}
        <div aria-hidden="true" />
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[data-usecases] > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section[data-usecases] h2 {
            font-size: 38px !important;
          }
          section[data-usecases] {
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
