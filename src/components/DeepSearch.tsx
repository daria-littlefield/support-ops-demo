import { useCallback, useEffect, useState } from 'react'
import { deepSearchScenarios } from '../data/deepSearch'
import type { DeepSearchPhase, SlackHit } from '../types/deepSearch'

const PHASE_LABELS: Record<DeepSearchPhase, string> = {
  idle: 'READY',
  anchoring: 'TICKET',
  querying: 'QUERIES',
  scanning: 'SLACK',
  correlating: 'CODE',
  complete: 'DONE',
}

const SIGNAL_EMOJI: Record<SlackHit['signalType'], string> = {
  deploy: '🚀',
  incident: '🔥',
  debug: '🐛',
  config: '⚙️',
  investigation: '🕵️',
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function phaseProgress(phase: DeepSearchPhase): number {
  if (phase === 'idle') return 0
  const order: DeepSearchPhase[] = [
    'anchoring',
    'querying',
    'scanning',
    'correlating',
    'complete',
  ]
  const i = order.indexOf(phase)
  return i < 0 ? 0 : i + 1
}

export function DeepSearch() {
  const [scenarioId, setScenarioId] = useState(deepSearchScenarios[0].id)
  const [phase, setPhase] = useState<DeepSearchPhase>('idle')
  const [visibleHits, setVisibleHits] = useState(0)
  const [running, setRunning] = useState(false)

  const scenario = deepSearchScenarios.find((s) => s.id === scenarioId)!
  const filled = phaseProgress(phase)

  const reset = useCallback(() => {
    setPhase('idle')
    setVisibleHits(0)
    setRunning(false)
  }, [])

  useEffect(() => {
    reset()
  }, [scenarioId, reset])

  async function runDeepSearch() {
    if (running) return
    setRunning(true)
    setVisibleHits(0)
    setPhase('anchoring')
    await delay(400)
    setPhase('querying')
    await delay(400)
    setPhase('scanning')
    for (let i = 0; i < scenario.slackHits.length; i++) {
      await delay(350)
      setVisibleHits(i + 1)
    }
    setPhase('correlating')
    await delay(500)
    setPhase('complete')
    setRunning(false)
  }

  const showQueries = phase !== 'idle' && phase !== 'anchoring'

  return (
    <div className="deep-search">
      <div className="help-window window" role="note">
        <div className="window-titlebar help-titlebar">
          <span>? WHAT IS DEEP SEARCH?</span>
        </div>
        <div className="window-body help-body">
          <p>
            Starts with <strong>one ticket</strong>. Checks <strong>Slack</strong> for
            what eng is doing. Guesses what code might be broken.
          </p>
          <ol>
            <li>Ticket</li>
            <li>Slack</li>
            <li>Code guess</li>
          </ol>
        </div>
      </div>

      <div className="deep-search-layout">
      <aside className="deep-sidebar panel">
        <h3>LVL</h3>
        <ul className="scenario-list">
          {deepSearchScenarios.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={s.id === scenarioId ? 'active' : ''}
                onClick={() => setScenarioId(s.id)}
                disabled={running}
              >
                {i + 1}. {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="deep-main">
        <header className="deep-header panel compact-head">
          <span className="badge">{scenario.ticketId}</span>
          <button
            type="button"
            className="btn primary"
            onClick={runDeepSearch}
            disabled={running}
          >
            {running ? '...' : '▶ GO'}
          </button>
        </header>

        <div className="progress-blocks">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={n <= filled ? 'filled' : ''} />
          ))}
        </div>
        <p className={`phase phase-${phase}`}>{PHASE_LABELS[phase]}</p>

        <div className="deep-grid">
          <section className="helpdesk-panel">
            <h3 style={{ fontSize: '8px' }}>TICKET</h3>
            <div className="thread">
              {scenario.helpdeskThread.map((msg) => (
                <article
                  key={msg.id}
                  className={`thread-msg role-${msg.role}`}
                >
                  <strong>{msg.author}</strong>
                  <p>{msg.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="search-panel">
            {showQueries && (
              <div className="chips">
                {scenario.searchQueries.map((q) => (
                  <span key={q} className="chip">
                    {q}
                  </span>
                ))}
              </div>
            )}

            {visibleHits > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {scenario.slackHits.slice(0, visibleHits).map((hit) => (
                  <li key={hit.id} className="slack-hit">
                    {SIGNAL_EMOJI[hit.signalType]} {hit.channel}: {hit.excerpt}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="placeholder">▶ GO</p>
            )}

            {phase === 'complete' && (
              <div className="synthesis-block">
                <p>
                  <strong>→</strong> {scenario.hypotheses[0]?.area}
                </p>
                <p>{scenario.synthesis}</p>
                <ul>
                  {scenario.recommendedActions.map((a) => (
                    <li key={a}>► {a}</li>
                  ))}
                </ul>
                <button type="button" className="btn ghost compact" onClick={reset}>
                  ↺
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      </div>
    </div>
  )
}
