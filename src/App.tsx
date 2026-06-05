import { useEffect, useState } from 'react'
import { DeepSearch } from './components/DeepSearch'
import { Home } from './components/Home'
import { IntakePrioritization } from './components/IntakePrioritization'
import { MarqueeBar } from './components/MarqueeBar'
import { RetroBackdrop } from './components/RetroBackdrop'
import { TriageFlow } from './components/TriageFlow'
import './App.css'

type Section = 'home' | 'triage' | 'intake' | 'deep-search'

const nav: { id: Section; label: string; icon: string }[] = [
  { id: 'home', label: 'HOME', icon: '🏠' },
  { id: 'triage', label: 'TRIAGE', icon: '⚡' },
  { id: 'deep-search', label: 'DEEP SEARCH', icon: '🔍' },
  { id: 'intake', label: 'INTAKE', icon: '📋' },
]

const SECTIONS: Section[] = ['home', 'triage', 'deep-search', 'intake']

const PAGE_TITLES: Record<Section, string> = {
  home: '★ SUPPORT OPS ★',
  triage: '★ TRIAGE ★',
  'deep-search': '★ DEEP SEARCH ★',
  intake: '★ INTAKE ★',
}

function sectionFromHash(): Section {
  const hash = window.location.hash.replace(/^#/, '')
  return SECTIONS.includes(hash as Section) ? (hash as Section) : 'home'
}

function App() {
  const [section, setSection] = useState<Section>(sectionFromHash)

  useEffect(() => {
    const onHashChange = () => setSection(sectionFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function goTo(next: Section) {
    setSection(next)
    window.location.hash = next === 'home' ? '' : next
  }

  return (
    <div className="app">
      <RetroBackdrop />
      <MarqueeBar text={PAGE_TITLES[section]} />

      <header className="site-header window">
        <div className="window-titlebar">
          <button
            type="button"
            className="brand"
            onClick={() => goTo('home')}
          >
            ▶ SUPPORT OPS v1.0
          </button>
          <span className="window-btns">[_][□][×]</span>
        </div>
        <nav className="window-body nav-grid" aria-label="Main">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-block ${item.id === 'deep-search' ? 'deep-search-nav' : ''} ${section === item.id ? 'active' : ''}`}
              onClick={() => goTo(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-window window">
        <div className="window-titlebar section-bar">
          <span>{PAGE_TITLES[section]}</span>
        </div>
        <div className="window-body">
          {section === 'home' && <Home onNavigate={(s) => goTo(s)} />}
          {section === 'triage' && <TriageFlow />}
          {section === 'deep-search' && <DeepSearch />}
          {section === 'intake' && <IntakePrioritization />}
        </div>
      </main>

      <footer className="site-footer">
        <a
          href="https://cursor.com/careers/support-operations-systems-lead"
          target="_blank"
          rel="noreferrer"
        >
          apply
        </a>
      </footer>
    </div>
  )
}

export default App
