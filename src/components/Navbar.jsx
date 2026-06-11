import React from 'react'

export const Navbar = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/" className="flex items-baseline gap-2 no-underline">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Nano<span className="text-ember">Factz</span>
          </span>
        </a>
        <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted sm:block">
          {today}
        </span>
      </div>
    </nav>
  )
}

export default Navbar
