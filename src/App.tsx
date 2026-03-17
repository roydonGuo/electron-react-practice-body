import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5">
        {[
          { code: 'en', label: 'EN' },
          { code: 'zh', label: '中' },
          { code: 'ja', label: '日' },
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border
              ${i18n.language.startsWith(lang.code)
                ? 'bg-indigo-500/30 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-800/40 text-slate-500 border-slate-700/40 hover:bg-slate-700/40 hover:text-slate-300'
              }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Main content card */}
      <div className="relative z-10 text-center px-8">
        {/* Electron logo / icon area */}
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
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-xl scale-150" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
          {t('hello')}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          {(() => {
            const parts = t('subtitle', {
              react: '|||REACT|||',
              vite: '|||VITE|||',
              tailwind: '|||TAILWIND|||',
            }).split('|||')
            return parts.map((part, i) => {
              if (part === 'REACT') return <span key={i} className="text-indigo-400 font-medium">React</span>
              if (part === 'VITE') return <span key={i} className="text-purple-400 font-medium">Vite</span>
              if (part === 'TAILWIND') return <span key={i} className="text-cyan-400 font-medium">TailwindCSS</span>
              return <span key={i}>{part}</span>
            })
          })()}
        </p>

        {/* Tech badges */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { key: 'electron', color: 'from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/20' },
            { key: 'react', color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/20' },
            { key: 'vite', color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/20' },
            { key: 'tailwindcss', color: 'from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/20' },
            { key: 'typescript', color: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20' },
          ].map((tech) => (
            <span
              key={tech.key}
              className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r border backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default ${tech.color}`}
            >
              {t(`techStack.${tech.key}`)}
            </span>
          ))}
        </div>

        {/* Bottom hint */}
        <p className="mt-12 text-slate-600 text-sm">
          {(() => {
            const parts = t('editHint', { file: '|||FILE|||' }).split('|||')
            return parts.map((part, i) => {
              if (part === 'FILE') {
                return (
                  <code key={i} className="px-2 py-1 rounded bg-slate-800/50 text-slate-400 text-xs font-mono">
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
  )
}

export default App
