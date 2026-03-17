import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'

function App() {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] flex items-center justify-center relative overflow-hidden transition-colors duration-300">
        {/* Animated background orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[var(--orb-indigo)] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--orb-purple)] rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--orb-cyan)] rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

        {/* Main content */}
        <div className="relative z-10 text-center px-8">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-12 h-12 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-xl scale-150" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, var(--title-from), var(--title-via), var(--title-to))`,
            }}
          >
            {t('hello')}
          </h1>

          {/* Subtitle */}
          <p className="text-[var(--subtitle-text)] text-lg mb-8 max-w-md mx-auto leading-relaxed">
            {(() => {
              const parts = t('subtitle', {
                react: '|||REACT|||',
                vite: '|||VITE|||',
                tailwind: '|||TAILWIND|||',
              }).split('|||')
              return parts.map((part, i) => {
                if (part === 'REACT') return <span key={i} className="text-[var(--cyan-text)] font-medium">React</span>
                if (part === 'VITE') return <span key={i} className="text-[var(--purple-text)] font-medium">Vite</span>
                if (part === 'TAILWIND') return <span key={i} className="text-[var(--teal-text)] font-medium">TailwindCSS</span>
                return <span key={i}>{part}</span>
              })
            })()}
          </p>

          {/* Tech badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { key: 'electron', bg: 'var(--sky-badge)', text: 'var(--sky-text)', border: 'var(--sky-badge)' },
              { key: 'react', bg: 'var(--cyan-badge)', text: 'var(--cyan-text)', border: 'var(--cyan-badge)' },
              { key: 'vite', bg: 'var(--purple-badge)', text: 'var(--purple-text)', border: 'var(--purple-badge)' },
              { key: 'tailwindcss', bg: 'var(--teal-badge)', text: 'var(--teal-text)', border: 'var(--teal-badge)' },
              { key: 'typescript', bg: 'var(--blue-badge)', text: 'var(--blue-text)', border: 'var(--blue-badge)' },
            ].map((tech) => (
              <span
                key={tech.key}
                className="px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default border"
                style={{
                  backgroundColor: tech.bg,
                  color: tech.text,
                  borderColor: tech.border,
                }}
              >
                {t(`techStack.${tech.key}`)}
              </span>
            ))}
          </div>

          {/* Bottom hint */}
          <p className="mt-12 text-[var(--text-muted)] text-sm">
            {(() => {
              const parts = t('editHint', { file: '|||FILE|||' }).split('|||')
              return parts.map((part, i) => {
                if (part === 'FILE') {
                  return (
                    <code key={i} className="px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--code-text)] text-xs font-mono">
                      src/App.tsx
                    </code>
                  )
                }
                return <span key={i}>{part}</span>
              })
            })()}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default App
