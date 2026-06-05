# Support Ops Systems — Portfolio Demo

Interactive demo for the [Cursor Support Operations Systems Lead](https://cursor.com/careers/support-operations-systems-lead) role.

## What's inside

1. **Interactive triage** — Three scenarios (queue spike, routing misroute, broken escalation) with a live decision path sidebar.
2. **Deep search** — Helpdesk thread as anchor → Slack engineering comms scan → codebase hypotheses.
3. **Intake & prioritization** — Request template, weighted rubric, and a worked example with stakeholder pushback.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173/** (or **http://localhost:5173/#deep-search** for Deep search directly).

If the nav still shows only three items without “Deep search”, stop any old dev server and run `npm run dev` again—a stale process can serve an older build.

## Deploy (for your application)

Build and deploy to Vercel, Netlify, or GitHub Pages:

```bash
npm run build
```

- **Vercel / Netlify**: Connect this repo; build command `npm run build`, output `dist`.
- **GitHub Pages**: Set `base` in `vite.config.ts` to your repo name if needed.

Link the live URL in your application (GitHub field or project note).

## Application tip

In "Please write a short note on a project you're proud of", summarize:

- The problem (ambiguous ops signals + noisy intake)
- What you built (triage logic + prioritization rubric)
- One metric you'd track after shipping (e.g. escalation SLA compliance, misroute rate)
