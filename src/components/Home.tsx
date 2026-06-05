type HomeProps = {
  onNavigate: (section: 'triage' | 'intake' | 'deep-search') => void
}

const demos = [
  { id: 'triage' as const, emoji: '⚡', title: 'TRIAGE', color: 't' },
  { id: 'deep-search' as const, emoji: '🔍', title: 'DEEP SEARCH', color: 'i' },
  { id: 'intake' as const, emoji: '📋', title: 'INTAKE', color: 'o' },
]

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="home">
      <div className="welcome-window window">
        <div className="window-titlebar">
          <span>START</span>
          <span className="window-btns">[_][□][×]</span>
        </div>
        <div className="window-body center-text">
          <h1 className="blast-title">SUPPORT OPS</h1>
          <p className="subtitle">pick one ↓</p>
        </div>
      </div>

      <div className="tetris-menu">
        {demos.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`tetris-block block-${d.color}`}
            onClick={() => onNavigate(d.id)}
          >
            <span className="block-emoji">{d.emoji}</span>
            <span className="block-title">{d.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
