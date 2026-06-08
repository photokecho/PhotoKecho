import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function PageShell({ children, title, subtitle }: {
  children: React.ReactNode
  title?: string
  subtitle?: string
}) {
  return (
    <>
      <Navigation />

      {title && (
        <div style={{
          paddingTop: 'clamp(120px,16svh,160px)',
          paddingBottom: 'clamp(48px,6vw,80px)',
          paddingLeft: 'var(--sx)',
          paddingRight: 'var(--sx)',
          background: 'var(--ivory)',
          borderBottom: '1px solid var(--ivory-3)',
        }}>
          <div style={{ maxWidth: 'var(--cmax)', margin: '0 auto' }}>
            <h1 className="fs" style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '-.01em',
              lineHeight: 1.08,
              marginBottom: subtitle ? 18 : 0,
              whiteSpace: 'pre-line',
            }}>
              {title}
            </h1>
            {subtitle && (
              <p className="fs" style={{
                fontSize: 'clamp(15px,1.5vw,18px)',
                fontStyle: 'italic',
                color: 'var(--stone)',
                lineHeight: 1.85,
                maxWidth: 600,
              }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
