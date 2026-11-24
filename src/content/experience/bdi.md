---
role: AI & Automation Intern
place: Bank Danamon Indonesia
years: "2026"
scene: hills
order: 1
---

Four months (May to September 2026) in Jakarta on the bank's AI and automation team, building AI pilots and automations in a regulated environment where requirements are rarely clear.

## What I did

- **Credit analysis pilot.** I was the sole backend developer on a pilot that helps credit teams analyze credit documents. I built the backend in TypeScript, Node.js, and Express, covering document processing with OCR, structured LLM prompts routed to different models depending on the task, JSON output, Excel import and export, REST APIs, authentication, and job logging. It was built to plug into an existing internal platform, and another developer is continuing it after my internship.
- **Working with the business.** I met business users every week to demo progress and clarify requirements. I also represented the IT team in user story meetings, flagging roadblocks and requests that weren't technically feasible. My mentor approved my first design, but a solution architect suggested a better approach a week later, so I rebuilt around it.
- **Improving an internal chatbot.** I investigated why an internal RAG chatbot struggled to find documents in its knowledge base. I traced the issues through retrieval and the vector database, tuned prompts, and documented my recommendations.
- **Frontier model proof of concept.** I built a proof of concept connecting a cloud AI platform to an on-premise knowledge base through a REST API, to test whether stronger models could work with internal data.
- **News summarization automation.** I built an automation with Power Automate and Copilot Studio that summarizes news relevant to the bank's business clients. It started as a pilot, and a business team now uses it every day.
- **AI safety research.** I researched ways to keep personal data out of LLM prompts, including PII detection and masking. I also tested a safety classifier against prompt-injection attempts.
- **Evaluating AI tools.** I helped evaluate enterprise AI assistants for leadership. I built a scoring rubric and looked at governance and data protection frameworks such as the NIST AI RMF.

## What I learned

- **Ask early, demo often.** Requirements in a bank are almost never clear on day one. Weekly demos caught misunderstandings before they turned into rework.
- **Hold designs loosely.** One approval doesn't mean a design is right. Having a solution architect redirect my work early taught me to welcome review instead of defending my first idea.
- **Most LLM failures aren't model failures.** When the chatbot gave bad answers, the problem usually started in retrieval and data, not in the model.
- **Constraints shape architecture.** Data residency rules, personal data, and on-premise systems decided what was possible long before model quality did.
- **Small tools can have the biggest impact.** My smallest pilot, the news summarizer, is the one people use every day.
- **Build for the next person.** Since someone else is continuing my main pilot, I learned to write code and documentation that others can pick up without me.
- **Owning my time.** I often worked independently on several tasks at once. That taught me to prioritize, share progress without being asked, and know when to ask for help.
