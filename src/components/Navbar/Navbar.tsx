import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import viteLogo from '/favicon.svg'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
]

const themeOptions = [
  { value: 'light' as const, icon: '☀️' },
  { value: 'dark' as const, icon: '🌙' },
  { value: 'system' as const, icon: '💻' },
]

function Dropdown({
  trigger,
  children,
  open,
  onToggle,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  open: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) onToggle()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onToggle])

  return (
    <div ref={ref} className="relative">
      <button onClick={onToggle} className="cursor-pointer">
        {trigger}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl border border-[var(--border)] bg-[var(--dropdown-bg)] backdrop-blur-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)

  const currentLang = languages.find((l) => i18n.language.startsWith(l.code)) || languages[0]
  const currentThemeOption = themeOptions.find((o) => o.value === theme) || themeOptions[2]

  const handleLangSelect = (code: string) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  const handleThemeSelect = (value: 'light' | 'dark' | 'system') => {
    setTheme(value)
    setThemeOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={viteLogo} alt="Logo" className="w-8 h-8" />
        <span className="text-base font-semibold text-[var(--text-primary)] tracking-tight hidden sm:inline">
          Electron App
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Language Dropdown */}
        <Dropdown
          open={langOpen}
          onToggle={() => { setLangOpen(!langOpen); setThemeOpen(false) }}
          trigger={
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM7 9.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 7 9.5Zm.75-3.25a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z" clipRule="evenodd" />
              </svg>
              <span>{currentLang.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-60">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          }
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLangSelect(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer
                ${i18n.language.startsWith(lang.code)
                  ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]'
                }`}
            >
              {lang.label}
            </button>
          ))}
        </Dropdown>

        {/* Theme Dropdown */}
        <Dropdown
          open={themeOpen}
          onToggle={() => { setThemeOpen(!themeOpen); setLangOpen(false) }}
          trigger={
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors">
              <span>{currentThemeOption.icon}</span>
              <span>{t(`navbar.theme.${theme}`)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-60">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          }
        >
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleThemeSelect(opt.value)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 cursor-pointer
                ${theme === opt.value
                  ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]'
                }`}
            >
              <span>{opt.icon}</span>
              <span>{t(`navbar.theme.${opt.value}`)}</span>
            </button>
          ))}
        </Dropdown>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--border)] mx-1" />

        {/* Avatar */}
        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow cursor-pointer">
          U
        </button>
      </div>
    </nav>
  )
}
