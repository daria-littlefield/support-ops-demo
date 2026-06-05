import type { TriageScenario } from '../types/triage'

export const triageScenarios: TriageScenario[] = [
  {
    id: 'queue-spike',
    title: 'Queue spike',
    trigger: 'P1 queue +42%. SLA OK for now.',
    signals: [],
    startId: 'q1',
    steps: {
      q1: {
        id: 'q1',
        kind: 'step',
        title: 'Check scope',
        context: '',
        question: 'One queue or many?',
        choices: [
          { label: 'One queue', nextId: 'q2', rationale: '' },
          { label: 'Many queues', nextId: 'o-capacity', rationale: '' },
        ],
      },
      q2: {
        id: 'q2',
        kind: 'step',
        title: 'Recent change?',
        context: '',
        question: 'Config change in last 48h?',
        choices: [
          { label: 'Yes', nextId: 'o-rollback', rationale: '' },
          { label: 'No', nextId: 'o-watch', rationale: '' },
        ],
      },
    },
    outcomes: {
      'o-rollback': {
        id: 'o-rollback',
        kind: 'outcome',
        title: 'Rollback',
        severity: 'P1',
        summary: 'Bad deploy likely.',
        immediateActions: ['Check change log', 'Ping eng'],
        metricsToWatch: ['Queue depth'],
      },
      'o-capacity': {
        id: 'o-capacity',
        kind: 'outcome',
        title: 'Capacity check',
        severity: 'P1',
        summary: 'System-wide pressure.',
        immediateActions: ['Check staffing', 'Post in #ops'],
        metricsToWatch: ['SLA risk'],
      },
      'o-watch': {
        id: 'o-watch',
        kind: 'outcome',
        title: 'Watch',
        severity: 'P3',
        summary: 'Wait and monitor.',
        immediateActions: ['Set 2h watch'],
        metricsToWatch: ['Oldest ticket'],
      },
    },
  },
  {
    id: 'routing-misroute',
    title: 'Wrong queue',
    trigger: 'Enterprise tickets in general queue.',
    signals: [],
    startId: 'r1',
    steps: {
      r1: {
        id: 'r1',
        kind: 'step',
        title: 'SLA risk?',
        context: '',
        question: 'SLA at risk now?',
        choices: [
          { label: 'Yes', nextId: 'o-hotfix', rationale: '' },
          { label: 'No', nextId: 'o-schedule', rationale: '' },
        ],
      },
    },
    outcomes: {
      'o-hotfix': {
        id: 'o-hotfix',
        kind: 'outcome',
        title: 'Hotfix now',
        severity: 'P0',
        summary: 'Fix routing ASAP.',
        immediateActions: ['Patch rule', 'Reroute tickets'],
        metricsToWatch: ['Misroutes'],
      },
      'o-schedule': {
        id: 'o-schedule',
        kind: 'outcome',
        title: 'Schedule fix',
        severity: 'P1',
        summary: 'Fix in next window.',
        immediateActions: ['Log bug', 'Tell TSEs'],
        metricsToWatch: ['Response time'],
      },
    },
  },
  {
    id: 'label-escalation-break',
    title: 'No auto-escalate',
    trigger: 'P1s not escalating after label rename.',
    signals: [],
    startId: 'e1',
    steps: {
      e1: {
        id: 'e1',
        kind: 'step',
        title: 'Tickets stuck?',
        context: '',
        question: 'Open P1s with no owner?',
        choices: [
          { label: 'Yes', nextId: 'o-manual', rationale: '' },
          { label: 'No', nextId: 'o-patch', rationale: '' },
        ],
      },
    },
    outcomes: {
      'o-manual': {
        id: 'o-manual',
        kind: 'outcome',
        title: 'Manual escalate',
        severity: 'P0',
        summary: 'Humans cover gap.',
        immediateActions: ['Run playbook', 'Fix automation'],
        metricsToWatch: ['Escalation SLA'],
      },
      'o-patch': {
        id: 'o-patch',
        kind: 'outcome',
        title: 'Patch automation',
        severity: 'P1',
        summary: 'Update label refs.',
        immediateActions: ['Ship fix', 'Test in staging'],
        metricsToWatch: ['Auto-escalate rate'],
      },
    },
  },
]
