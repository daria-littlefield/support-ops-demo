const BLOCKS = [
  { color: 'i', left: '4%', delay: '0s' },
  { color: 'o', left: '14%', delay: '1.2s' },
  { color: 't', left: '26%', delay: '0.4s' },
  { color: 's', left: '38%', delay: '2s' },
  { color: 'z', left: '52%', delay: '0.8s' },
  { color: 'j', left: '64%', delay: '1.6s' },
  { color: 'l', left: '76%', delay: '0.2s' },
  { color: 'i', left: '88%', delay: '2.4s' },
  { color: 'o', left: '92%', delay: '1s' },
]

export function RetroBackdrop() {
  return (
    <div className="retro-backdrop" aria-hidden="true">
      <div className="stars" />
      {BLOCKS.map((b, i) => (
        <span
          key={`${b.color}-${i}`}
          className={`tetris-fall block-${b.color}`}
          style={{ left: b.left, animationDelay: b.delay }}
        />
      ))}
    </div>
  )
}
