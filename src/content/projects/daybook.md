---
title: Daybook
blurb: A personal dashboard for internship applications, todos, notes, calendar and focus time, which Claude can also read and update.
year: 2026
tags:
  [
    Next.js,
    React,
    TypeScript,
    shadcn/ui,
    Neon,
    Drizzle ORM,
    Better Auth,
    CodeMirror 6,
  ]
scene: hills
order: 1
---

## Link:

https://internship-tracker-mu-lyart.vercel.app/

## Why I built it

I was tracking my internship applications in a Google Sheet. It was awkward on my phone, and I kept forgetting to update it. I wanted one place I could open anywhere, and I wanted an AI assistant to be able to update it for me while I worked on the applications themselves.

It started as an internship tracker. Once I was opening it every day, I added the other things I kept in separate apps: todos, notes, my calendar and a Pomodoro timer.

Now I use it every day to keep track of my todos and organize my day. Built using my ideas + help with the mighty **claude code**.

## How it works

Daybook is a full-stack Next.js app on Postgres, deployed on Vercel.

- **One set of rules, two ways in.** The web UI and an MCP server both call the same service functions, so Claude and I work on the same data under the same validation. Every change is recorded with who made it: the web, the AI, or an import.
- **25 MCP tools.** Claude can list, add and update applications, todos and notes. Access goes through OAuth 2.1, with my app acting as the authorization server.
- **Notes are real markdown files** in a private GitHub repo, so I can also edit them in Obsidian or VS Code. The editor is CodeMirror 6 with a live preview I built on top of it, and saves detect conflicts when the file changed somewhere else.
- **The Pomodoro timer runs in the browser** and stays in sync across tabs, with finished sessions saved to the database for weekly stats.

### How I use it

- **Internships.** A Claude automation runs every day, searches for internships that fit me, and adds them to Daybook through the MCP server. I open the app to a list of new roles to review instead of searching for them myself.
- **Todos.** Every morning I add my todos for the day, then check them off as I go.

## Future progress

- Open-source it so other people can run their own copy.
- Add a Goals tab.
- Let users choose their time zone. It is currently fixed to mine.
- Add a morning briefing, through either Brieflet or Claude's morning brief.
