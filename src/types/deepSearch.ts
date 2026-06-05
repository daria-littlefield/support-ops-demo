export type HelpdeskMessage = {
  id: string
  author: string
  role: 'customer' | 'tse' | 'system'
  time: string
  body: string
}

export type SlackHit = {
  id: string
  channel: string
  author: string
  team: string
  time: string
  excerpt: string
  relevance: string
  signalType: 'deploy' | 'incident' | 'debug' | 'config' | 'investigation'
}

export type CodebaseHypothesis = {
  area: string
  confidence: 'high' | 'medium' | 'low'
  evidence: string[]
  suggestedOwner: string
}

export type DeepSearchScenario = {
  id: string
  title: string
  ticketId: string
  subject: string
  labels: string[]
  helpdeskThread: HelpdeskMessage[]
  searchQueries: string[]
  slackHits: SlackHit[]
  hypotheses: CodebaseHypothesis[]
  synthesis: string
  recommendedActions: string[]
}

export type DeepSearchPhase =
  | 'idle'
  | 'anchoring'
  | 'querying'
  | 'scanning'
  | 'correlating'
  | 'complete'
