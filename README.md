<div align="center">

# 🕊️ Echoes of July

### *An interactive documentary of the 2024 July Uprising in Bangladesh.*

Relive seven pivotal days of July 2024 through a narrative web experience built for a hackathon — move through chapters, weigh choices, and review verified historical evidence along the way.

<p>
  <a href="https://echoes-of-july.vercel.app/" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo on Vercel" />
  </a>
  <a href="https://github.com/Mazharull-Islam/echoes-of-july" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source on GitHub" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript strict" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Made%20with-Framer%20Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p>
  <a href="#-live-demo">Live Demo</a> ·
  <a href="#-overview">Overview</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-chapter-tour">Chapter Tour</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-running-locally">Running Locally</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-design-principles">Design Principles</a> ·
  <a href="#-credits">Credits</a> ·
  <a href="#-license">License</a>
</p>

</div>

---

## 🚀 Live Demo

<table>
  <tr>
    <td align="center" width="33%">
      <h3>🌐 Deployed App</h3>
      <a href="https://echoes-of-july.vercel.app/" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/Open%20App-echoes--of--july.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Open live demo" />
      </a>
      <br /><br />
      <sub>Hosted on Vercel · auto-deploys from <code>main</code></sub>
    </td>
    <td align="center" width="33%">
      <h3>📂 Source Code</h3>
      <a href="https://github.com/Mazharull-Islam/echoes-of-july" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/View%20Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="View GitHub repo" />
      </a>
      <br /><br />
      <sub><code>Mazharull-Islam/echoes-of-july</code></sub>
    </td>
    <td align="center" width="33%">
      <h3>🛠 Run It Yourself</h3>
      <a href="#-running-locally">
        <img src="https://img.shields.io/badge/Setup-Local%20Dev-2EA44F?style=for-the-badge&logo=git&logoColor=white" alt="Run locally" />
      </a>
      <br /><br />
      <sub><code>npm install && npm run dev</code></sub>
    </td>
  </tr>
</table>

<p align="center">
  <a href="https://echoes-of-july.vercel.app/" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/▶%20Start%20the%20Story-Open%20Echoes%20of%20July-0f172a?style=for-the-badge" alt="Start the story" />
  </a>
</p>

---

## 📖 Overview

> *Story comes before technology. Historical accuracy is prioritized over spectacle. Every interaction should reinforce learning.*

**Echoes of July** is an interactive documentary that lets readers relive important days from the **July 2024 Bangladesh movement** through a fictional interactive narrative — and then surfaces **verified historical information and sources** alongside it.

- 🎭 **Narrative-first** — chapters are built from JSON-driven scenes with dialogue, choice forks, and evidence reviews.
- 📚 **Sourced** — every photograph, clipping, and account is credited to its outlet in the story itself.
- 🪶 **Respectful** — figures and casualty estimates are reported as reported figures, not collapsed into one number.
- ⚡ **Zero backend** — everything runs on the client; no auth, no DB, no API.

### 👥 Built By

| | |
|---|---|
| 👨‍💻 **Mazharul Islam** | GitHub: [@Mazharull-Islam](https://github.com/Mazharull-Islam) · Repo owner |
| 👨‍💻 **Nafiz Shahriar Sami** | GitHub: [@Nafiz-codes](https://github.com/Nafiz-codes) · Contributor |

---

## ✨ Features

<p>
  <img src="https://img.shields.io/badge/Interactive%20Dialogue-Yes-22c55e?style=flat-square" alt="Interactive dialogue" />
  <img src="https://img.shields.io/badge/Choice%20Branching-Yes-22c55e?style=flat-square" alt="Choice branching" />
  <img src="https://img.shields.io/badge/Evidence%20Captions-Bengali%20%2B%20English-22c55e?style=flat-square" alt="Evidence captions" />
  <img src="https://img.shields.io/badge/Save%20Progress-LocalStorage-22c55e?style=flat-square" alt="Save progress" />
  <img src="https://img.shields.io/badge/Resume%20Modal-Yes-22c55e?style=flat-square" alt="Resume modal" />
  <img src="https://img.shields.io/badge/Responsive%20Layout-Mobile%20%2B%20Desktop-22c55e?style=flat-square" alt="Responsive" />
  <img src="https://img.shields.io/badge/Keyboard%20Nav-Native-22c55e?style=flat-square" alt="Keyboard nav" />
  <img src="https://img.shields.io/badge/Data--Driven%20Content-100%25-22c55e?style=flat-square" alt="Data driven" />
  <img src="https://img.shields.io/badge/A11y-aria--live%20%2B%20roles-22c55e?style=flat-square" alt="A11y" />
</p>

| Icon | Feature | What it does |
|:---:|---|---|
| 📜 | **Branching scenes** | Walk through dialogue, then pick which thread to follow. |
| 🧭 | **Timeline sidebar** | Jump between chapters from inside any chapter. |
| 🖼️ | **Evidence blocks** | Photographs, newspaper clippings, and quotes with full captions. |
| 💾 | **Auto-save progress** | Saves your choice history in `localStorage`; resume prompt on re-entry. |
| ⏮ | **Back button** | Step back to the previous scene if you went the wrong way. |
| 🔗 | **Source captions** | Every claim is attributed inline to a named outlet. |
| 📱 | **Responsive by default** | Works on a phone in Dhaka or a laptop in Stockholm. |
| 🈳 | **Bengali headlines** | Original newspaper clippings keep their language. |

---

## 🗂 Chapter Tour

> Click any chapter to jump straight into it on the deployed app.

| # | Date | Chapter | Open |
|:--:|---|---|:---:|
| 01 | **1 July 2024** | The Catalyst for the July Revolution | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-01) |
| 02 | **10 July 2024** | Escalating Resistance | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-02) |
| 03 | **15 July 2024** | Campus Violence on 15 July | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-03) |
| 04 | **16 July 2024** | The Killing of Abu Sayed | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-04) |
| 05 | **18–21 July 2024** | Total Shutdown, 18–21 July 2024 | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-05) |
| 06 | **26 Jul – 3 Aug 2024** | Detentions, Red Profiles, and the One-Point Demand | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-06) |
| 07 | **4–5 August 2024** | Non-Cooperation and Resignation | [▶ Start](https://echoes-of-july.vercel.app/story/chapter-07) |

<p align="center">
  <a href="https://echoes-of-july.vercel.app/timeline" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/🗂%20See%20the%20Full%20Timeline-Open%20%2Ftimeline-0f172a?style=for-the-badge" alt="Full timeline" />
  </a>
  <a href="https://echoes-of-july.vercel.app/history/chapter-01" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/📚%20Read%20the%20History-Open%20%2Fhistory-0f172a?style=for-the-badge" alt="Read history" />
  </a>
</p>

---

## 🧰 Tech Stack

<table>
  <tr>
    <th>Layer</th>
    <th>Choice</th>
    <th>Why</th>
  </tr>
  <tr>
    <td>Framework</td>
    <td><a href="https://nextjs.org">Next.js 16</a> (App Router)</td>
    <td>File-based routing, server components, zero-config deploys.</td>
  </tr>
  <tr>
    <td>Language</td>
    <td><a href="https://www.typescriptlang.org">TypeScript</a> (strict, no <code>any</code>)</td>
    <td>Catch shape errors in JSON-driven content before they ship.</td>
  </tr>
  <tr>
    <td>Styling</td>
    <td><a href="https://tailwindcss.com">Tailwind CSS v4</a> + <a href="https://ui.shadcn.com">shadcn/ui</a></td>
    <td>Utility-first + accessible primitives; no design drift.</td>
  </tr>
  <tr>
    <td>Animation</td>
    <td><a href="https://www.framer.com/motion/">Framer Motion</a></td>
    <td>Bring-narrative-life motion without a custom engine.</td>
  </tr>
  <tr>
    <td>Icons</td>
    <td><a href="https://lucide.dev">Lucide React</a></td>
    <td>Tidy line icons that match the editorial tone.</td>
  </tr>
  <tr>
    <td>Content</td>
    <td>JSON in <code>data/</code></td>
    <td>Every chapter is a single JSON file — no hardcoded content.</td>
  </tr>
</table>

---

## 💻 Running Locally

> **Prerequisites:** Node.js 20+, npm.

### 1️⃣ Clone & install

```bash
git clone https://github.com/Mazharull-Islam/echoes-of-july.git
cd echoes-of-july
npm install
```

### 2️⃣ Start the dev server

```bash
npm run dev
```

### 3️⃣ Open it

```bash
# macOS
open https://echoes-of-july.vercel.app/

# Or visit the local URL printed in the terminal:
# http://localhost:3000
```

<p align="center">
  <a href="https://echoes-of-july.vercel.app/" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Prefer%20No%20Setup%3F-Open%20Live%20App-0f172a?style=for-the-badge" alt="Open live app" />
  </a>
</p>

### 4️⃣ Production build

```bash
npm run build   # bundles for production
npm start       # serves the production build
npm run lint    # ESLint over the whole repo
```

---

## 🏗 Architecture

```
app/
├── layout.tsx          # Root shell: fonts, header, footer, container
├── page.tsx            # Landing page (resume prompt + chapter CTAs)
├── globals.css         # Tailwind v4 entry + design tokens
├── timeline/           # Timeline grid (one card per chapter)
├── story/[chapter]/    # Story player — scenes + evidence
└── history/[chapter]/  # Pure read-along history view

data/
├── timeline.json       # Chapter list used by sidebar + landing
└── stories/*.json      # One chapter per file (scenes + evidence)

components/             # Reusable UI primitives (Card, Button, …)
types/                  # Shared TypeScript interfaces
lib/                    # Helpers (save-system, utils)
public/evidence/        # Photograph + newspaper assets per chapter
docs/                   # Design + ADRs + permissions
```

### Key pieces

- **`app/story/[chapter]/story-chapter-view.tsx`** — owns scene state, choice history, and save/restore via `localStorage`.
- **`app/story/[chapter]/chapter-sidebar.tsx`** — sticky list of every chapter for in-chapter navigation.
- **`app/story/[chapter]/evidence-list.tsx`** — renders typed evidence items (photograph / newspaper / video / document) with the shared placeholder fallback.
- **`lib/save-system.ts`** — single source of truth for resume progress.

---

## 🎯 Design Principles

> These are the rules we held ourselves to while building the MVP.

| # | Principle |
|---|---|
| 1 | Story comes before technology. |
| 2 | Historical accuracy is prioritized over spectacle. |
| 3 | Every interaction should reinforce learning. |
| 4 | Simplicity is preferred over unnecessary complexity. |
| 5 | One polished experience is more valuable than many unfinished features. |
| 6 | Data should drive behavior whenever possible. |

**Non-goals** for the MVP: no multiplayer, no auth, no backend, no attempt to cover every event of the movement.

---

## 🙌 Credits

<table>
  <tr>
    <td align="center" width="50%">
      <h3>👨‍💻 Mazharul Islam</h3>
      <p><em>Repo owner · Product &amp; engineering</em></p>
      <a href="https://github.com/Mazharull-Islam" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/GitHub-Mazharull--Islam-181717?style=for-the-badge&logo=github&logoColor=white" alt="Mazharul Islam" />
      </a>
    </td>
    <td align="center" width="50%">
      <h3>👨‍💻 Nafiz Shahriar Sami</h3>
      <p><em>Contributor</em></p>
      <a href="https://github.com/Nafiz-codes" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/GitHub-Nafiz--codes-181717?style=for-the-badge&logo=github&logoColor=white" alt="Nafiz Shahriar Sami" />
      </a>
    </td>
  </tr>
</table>

### 📰 Source outlets cited in the story

- The Daily Star · The Daily Samoyer Alo · Shomoyer Alo · Swadesh Pratidin
- The Wire · Amnesty International · APWLD
- EUAA Country of Origin Information Report · Wikipedia (used as secondary cross-checks)
- Duniyakapanojuly.org (july-36 archive, with documented permission)

Every photograph and clipping is attributed inline inside the story.

---

## 🪪 License

This project is released under the **MIT License**. Source attributions for historical content live alongside the relevant chapter under `data/stories/`.

---

<div align="center">

<p>
  <a href="https://echoes-of-july.vercel.app/" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/▶%20Open%20Echoes%20of%20July-echoes--of--july.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Open the live app" />
  </a>
</p>

<sub>Built with care by <strong>Mazharul Islam</strong> &amp; <strong>Nafiz Shahriar Sami</strong> · © 2024</sub>

</div>
