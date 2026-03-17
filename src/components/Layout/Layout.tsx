import type { ReactNode } from 'react'
import Navbar from '../Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-300">
      <Navbar />
      <main className="pt-14">
        {children}
      </main>
    </div>
  )
}
