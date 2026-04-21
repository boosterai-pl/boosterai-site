import type { Homepage } from '@/payload-types'

interface ProcessSectionProps {
  data: Homepage['processSteps']
}

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M16 3 C17 11 21 15 29 16 C21 17 17 21 16 29 C15 21 11 17 3 16 C11 15 15 11 16 3 Z"
      fill="#2B4BF2"
    />
  </svg>
)

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data) return null
  const steps = data.steps ?? []

  return (
    <section
      style={{
        margin: '60px 0',
        padding: '60px 48px',
        borderRadius: '28px',
        background: 'linear-gradient(170deg,#E1E8F5 0%, #CBD6EE 100%)',
        border: '1px solid rgba(43,75,242,0.12)',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--primary)',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        <SparkleIcon />
        Współpraca
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

      {/* Steps grid */}
      {steps.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '44px',
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                background:
                  'linear-gradient(180deg,rgba(255,255,255,.7), rgba(255,255,255,.35))',
                border: '1px solid rgba(255,255,255,.7)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Big faded number */}
              {step.number && (
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: '76px',
                    lineHeight: 1,
                    color: 'rgba(43,75,242,0.22)',
                    marginBottom: '56px',
                  }}
                >
                  {step.number}
                </div>
              )}
              {step.title && (
                <h4
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '10px',
                    color: 'var(--navy)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h4>
              )}
              {step.description && (
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55 }}>
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          section[data-process] {
            padding: 40px 24px !important;
          }
          section[data-process] h2 {
            font-size: 38px !important;
          }
          section[data-process] > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
