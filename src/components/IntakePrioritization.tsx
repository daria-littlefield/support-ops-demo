import { useState } from 'react'
import {
  computeWeightedScore,
  intakeTemplate,
  prioritizationRubric,
  workedExample,
} from '../data/intake'

type Tab = 'score' | 'form'

export function IntakePrioritization() {
  const [tab, setTab] = useState<Tab>('score')
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(workedExample.scores.map((s) => [s.dimensionId, s.score])),
  )

  const liveScore = computeWeightedScore(
    prioritizationRubric.map((dim) => ({
      dimensionId: dim.id,
      score: scores[dim.id] ?? 3,
      note: '',
    })),
  )

  function band(score: number): string {
    if (score >= 4) return 'P0'
    if (score >= 3.2) return 'P1'
    if (score >= 2.5) return 'P2'
    return 'P3'
  }

  const meterPct = ((liveScore - 1) / 4) * 100

  return (
    <div className="intake-stack">
      <div className="intake-tabs">
        <button
          type="button"
          className={`tab-btn ${tab === 'score' ? 'active' : ''}`}
          onClick={() => setTab('score')}
        >
          SCORE
        </button>
        <button
          type="button"
          className={`tab-btn ${tab === 'form' ? 'active' : ''}`}
          onClick={() => setTab('form')}
        >
          FORM
        </button>
      </div>

      {tab === 'score' && (
        <section className="panel highlight">
          <p className="request-summary">{workedExample.requestSummary}</p>

          <div className="score-meter">
            <div
              className="score-meter-fill"
              style={{ width: `${meterPct}%` }}
            />
          </div>
          <div className="score-result">
            <span>{liveScore.toFixed(1)}</span>
            <span className="band">{band(liveScore)}</span>
          </div>

          <div className="slider-grid">
            {prioritizationRubric.map((dim) => (
              <div key={dim.id} className="slider-row">
                <label htmlFor={`score-${dim.id}`}>{dim.name}</label>
                <input
                  id={`score-${dim.id}`}
                  type="range"
                  min={1}
                  max={5}
                  step={2}
                  value={scores[dim.id] ?? 3}
                  onChange={(e) =>
                    setScores((prev) => ({
                      ...prev,
                      [dim.id]: Number(e.target.value),
                    }))
                  }
                />
                <span>{scores[dim.id] ?? 3}</span>
              </div>
            ))}
          </div>

          <p className="verdict">
            <strong>→</strong> {workedExample.decision}
          </p>
        </section>
      )}

      {tab === 'form' && (
        <section className="panel">
          {intakeTemplate.fields.map((field) => (
            <div key={field.name} className="template-field">
              <label>{field.name}</label>
              <input type="text" placeholder={field.hint} aria-label={field.name} />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
