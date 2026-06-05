export type RubricDimension = {
  id: string
  name: string
  description: string
  weight: number
  scores: { value: number; label: string; guidance: string }[]
}

export const intakeTemplate = {
  title: 'Request form',
  purpose: '',
  fields: [
    { name: 'Title', hint: 'what + where' },
    { name: 'Problem', hint: 'what broke' },
    { name: 'Urgency', hint: 'if we wait' },
    { name: 'Fix type', hint: 'one-off or forever' },
  ],
}

export const prioritizationRubric: RubricDimension[] = [
  {
    id: 'impact',
    name: 'Impact',
    description: 'hurt level',
    weight: 0.3,
    scores: [
      { value: 1, label: 'Low', guidance: '' },
      { value: 3, label: 'Med', guidance: '' },
      { value: 5, label: 'High', guidance: '' },
    ],
  },
  {
    id: 'urgency',
    name: 'Urgency',
    description: 'how soon',
    weight: 0.25,
    scores: [
      { value: 1, label: 'Low', guidance: '' },
      { value: 3, label: 'Med', guidance: '' },
      { value: 5, label: 'High', guidance: '' },
    ],
  },
  {
    id: 'leverage',
    name: 'Leverage',
    description: 'fixes class?',
    weight: 0.25,
    scores: [
      { value: 1, label: 'Once', guidance: '' },
      { value: 3, label: 'Maybe', guidance: '' },
      { value: 5, label: 'Yes', guidance: '' },
    ],
  },
  {
    id: 'effort',
    name: 'Effort',
    description: 'how hard',
    weight: 0.2,
    scores: [
      { value: 1, label: 'Hard', guidance: '' },
      { value: 3, label: 'OK', guidance: '' },
      { value: 5, label: 'Easy', guidance: '' },
    ],
  },
]

export type WorkedExampleScore = {
  dimensionId: string
  score: number
  note: string
}

export const workedExample = {
  title: 'Slack alert ask',
  requestSummary: 'Ping @channel when P0 queue > 50.',
  intakeNotes: [] as string[],
  scores: [
    { dimensionId: 'impact', score: 3, note: '' },
    { dimensionId: 'urgency', score: 3, note: '' },
    { dimensionId: 'leverage', score: 1, note: '' },
    { dimensionId: 'effort', score: 5, note: '' },
  ] as WorkedExampleScore[],
  weightedScore: 2.85,
  priorityBand: 'P2',
  decision: 'Say no to @channel. Use tiered alerts + runbook.',
  responseToStakeholder: [] as string[],
  pushbackFraming: '',
  alternativeActions: ['Use dashboard', 'Page on-call only if SLA risk'],
}

export function computeWeightedScore(scores: WorkedExampleScore[]): number {
  const byId = Object.fromEntries(scores.map((s) => [s.dimensionId, s.score]))
  return prioritizationRubric.reduce((sum, dim) => {
    const score = byId[dim.id] ?? 0
    return sum + score * dim.weight
  }, 0)
}
