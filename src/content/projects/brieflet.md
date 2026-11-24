---
title: Brieflet
blurb: Daily briefing around newest AI papers & news that interests me.
year: 2026
tags: [Python, Streamlit, SQLite, Discord, pytest]
scene: hills
order: 3
---

## Why I am building it

Hundreds of new AI papers land on arXiv every day, and keeping up with the ones that matter to me meant scrolling through feeds and missing most of them anyway. I wanted the opposite: a short, ranked briefing that arrives every morning, built around the topics I care about, without having to go looking for it.

Brieflet is also my project for learning to build software properly: not just getting it to run once, but making it reliable, tested, and designed to grow. It started as a single prototype script, and I've been rebuilding it step by step from an architecture plan I wrote before touching the code.

## Currently:

Every morning, Brieflet:

- **Collects** the latest arXiv AI papers, retrying automatically when the network fails, and records every run so I can see what happened.
- **Ranks** them against my saved interests and picks the top 10 I haven't seen before.
- **Stores** each day's digest as a permanent record, so nothing is ever sent twice and past digests stay readable.
- **Delivers** it to my Discord channel exactly once, even if Discord is down at the time it runs.

A **Streamlit web app** shows today's digest, my full history, and lets me change my interests or explore all of this week's papers. A **command-line tool** does the same from the terminal (`brieflet run-daily`, `brieflet digest`, `brieflet prefs set "LLM, agents, security"`).

Under the hood:

- A modular Python package with a clear separation between the core logic and the CLI, web and Discord layers. An automated test enforces that separation.
- About 150 automated tests, covering the web pages too. None of them touch my real data or the network.
- Secrets are kept out of the code and out of the logs.

## Next steps:

- **Move to the cloud:** hosted Postgres, a GitHub Actions schedule and Streamlit Community Cloud, so the briefing no longer depends on my laptop being awake.
- **Describe interests in plain English:** instead of keywords, I'll write what I'm into and an LLM will turn it into a profile and suggest related topics. It will work with any model provider, or a local one.
- **Smarter ranking:** semantic search with embeddings, so papers match by meaning, not exact words, plus LLM-written "why this matters" summaries.
- **More sources:** news, Hacker News and blogs alongside papers.
- **Learning from feedback:** 👍/👎 reactions through an interactive Discord bot, and a small model trained on my votes that learns what I actually read.
- **Bring your own agent:** an MCP server so AI assistants like Claude can read and steer my briefing directly.
