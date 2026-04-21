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
  const eyebrow = data.eyebrowText || 'Współpraca'

  return (
    <section
      data-process
      style={{
        margin: '60px 0',
        padding: '64px 56px 70px',
        borderRadius: '32px',
        background:
          'radial-gradient(1200px 800px at 80% -200px, #E8EEF8 0%, transparent 60%), linear-gradient(170deg,#E1E8F5 0%, #CBD6EE 100%)',
        border: '1px solid rgba(43,75,242,0.12)',
        boxShadow: '0 30px 70px -50px rgba(15,26,61,0.25)',
        textAlign: 'center',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--primary)',
          fontWeight: 600,
          fontSize: '14px',
          justifyContent: 'center',
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
            fontSize: '56px',
            lineHeight: 1.12,
            fontWeight: 700,
            marginTop: '18px',
            marginBottom: '8px',
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
            gap: '24px',
            marginTop: '40px',
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                padding: '34px 28px 28px',
                borderRadius: '22px',
                background: 'rgba(216, 228, 242, 0.9)',
                boxShadow: 'inset 0 0 0 1px rgba(43,75,242,0.08)',
                textAlign: 'left',
                overflow: 'hidden',
                minHeight: '260px',
              }}
            >
              {/* Large background number */}
              {step.number && (
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '22px',
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: '120px',
                    lineHeight: 1,
                    color: 'rgba(43,75,242,0.16)',
                    pointerEvents: 'none',
                  }}
                >
                  {step.number}
                </div>
              )}

              {/* Foreground card */}
              <div
                style={{
                  position: 'relative',
                  marginTop: '120px',
                  background: '#EFEFEF',
                  borderRadius: '18px',
                  padding: '22px 20px',
                  boxShadow: '0 10px 24px -18px rgba(15,26,61,0.25)',
                  border: '1px solid rgba(15,26,61,0.05)',
                }}
              >
                {step.title && (
                  <h4
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'var(--navy)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h4>
                )}
                {step.description && (
                  <p style={{ color: '#5E6B87', fontSize: '14px', lineHeight: 1.55 }}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          section[data-process] {
            padding: 48px 24px 56px !important;
          }
          section[data-process] h2 {
            font-size: 38px !important;
          }
          section[data-process] > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section[data-process] > div:last-child > div {
            min-height: auto !important;
          }
          section[data-process] > div:last-child > div > div {
            margin-top: 90px !important;
          }
        }
      `}</style>
    </section>
  )
}
