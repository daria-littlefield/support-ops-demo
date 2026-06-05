export type TriageChoice = {
  label: string
  nextId: string
  rationale: string
}

export type TriageStep = {
  id: string
  kind: 'step'
  title: string
  context: string
  question: string
  choices: TriageChoice[]
}

export type TriageOutcome = {
  id: string
  kind: 'outcome'
  title: string
  severity: 'P0' | 'P1' | 'P2' | 'P3'
  summary?: string
  immediateActions: string[]
  escalation?: string
  durableFix?: string
  metricsToWatch?: string[]
}

export type TriageScenario = {
  id: string
  title: string
  trigger: string
  signals: string[]
  startId: string
  steps: Record<string, TriageStep>
  outcomes: Record<string, TriageOutcome>
}

export type PathEntry = {
  stepId: string
  stepTitle: string
  choiceLabel: string
  rationale: string
}
