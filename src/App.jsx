import { Navbar } from './components/Navbar'
import SkillCard from './components/SkillCard'
import './App.css'

function App() {
  return (
    <div className="relative z-10 overflow-x-clip">
      <Navbar />

      <main className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <header className="text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-ember">
            The daily almanac
          </p>
          <h1 className="mx-auto mt-3 max-w-[18ch] text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
            A small fact, freshly&nbsp;drawn.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            One curious thing from the world&rsquo;s encyclopedia, pulled at random
            whenever you ask. No accounts, no algorithms — just serendipity.
          </p>
        </header>

        <div className="mx-auto mt-12 flex items-center justify-center gap-4 text-muted">
          <span className="h-px w-12 bg-line" />
          <span className="font-display text-sm italic">today&rsquo;s draw</span>
          <span className="h-px w-12 bg-line" />
        </div>

        <div className="mt-8">
          <SkillCard />
        </div>
      </main>
    </div>
  )
}

export default App
