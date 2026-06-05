import { useMemo, useState } from 'react'
import { triageScenarios } from '../data/triageScenarios'
import type { PathEntry, TriageOutcome, TriageStep } from '../types/triage'

export function TriageFlow() {
  const [scenarioId, setScenarioId] = useState(triageScenarios[0].id)
  const [currentId, setCurrentId] = useState(triageScenarios[0].startId)
  const [path, setPath] = useState<PathEntry[]>([])

  const scenario = useMemo(
    () => triageScenarios.find((s) => s.id === scenarioId)!,
    [scenarioId],
  )

  const outcome = scenario.outcomes[currentId] as TriageOutcome | undefined
  const step = scenario.steps[currentId] as TriageStep | undefined

  function resetScenario(nextId: string) {
    const next = triageScenarios.find((s) => s.id === nextId)!
    setScenarioId(nextId)
    setCurrentId(next.startId)
    setPath([])
  }

  function choose(choice: TriageStep['choices'][number]) {
    if (!step) return
    setPath((prev) => [
      ...prev,
      {
        stepId: step.id,
        stepTitle: step.title,
        choiceLabel: choice.label,
        rationale: '',
      },
    ])
    setCurrentId(choice.nextId)
  }

  function resetPath() {
    setCurrentId(scenario.startId)
    setPath([])
  }

  return (
    <div className="triage-layout">
      <aside className="triage-sidebar panel">
        <h3>LVL</h3>
        <ul className="scenario-list">
          {triageScenarios.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={s.id === scenarioId ? 'active' : ''}
                onClick={() => resetScenario(s.id)}
              >
                {i + 1}. {s.title}
              </button>
            </li>
          ))}
        </ul>
        {path.length > 0 && (
          <button type="button" className="btn ghost" onClick={resetPath}>
            ↺
          </button>
        )}
      </aside>

      <div className="triage-main">
        <header className="panel compact-head">
          <h2 style={{ fontSize: '10px', margin: 0 }}>{scenario.title}</h2>
          <p className="trigger">{scenario.trigger}</p>
        </header>

        {outcome ? (
          <article className={`outcome severity-${outcome.severity}`}>
            <span className="severity">{outcome.severity}</span>
            <h3 style={{ fontSize: '9px' }}>{outcome.title}</h3>
            <ul>
              {outcome.immediateActions.map((a) => (
                <li key={a}>► {a}</li>
              ))}
            </ul>
          </article>
        ) : step ? (
          <article className="step-card">
            <p className="question">{step.question}</p>
            <div className="choices">
              {step.choices.map((choice, i) => (
                <button
                  key={choice.label}
                  type="button"
                  className="choice-btn"
                  onClick={() => choose(choice)}
                >
                  {i === 0 ? 'A' : 'B'}: {choice.label}
                </button>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}
