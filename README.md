# Catacombs of Despair

The campaign website: lore, NPCs, mechanics and the session journal. Built with Nuxt 4, Nuxt Content and Nuxt UI.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Lore, NPC, mechanics pages | `content/c/**.md`. The folder is the URL: `content/c/npc/silas.md` is `/c/npc/silas` |
| Images | `public/images/`. Use `.webp` (much smaller than `.png`) |
| Despair flaw table | `tables/flaws.json` |
| Site colours, fonts, page styles | `app/assets/css/main.css` |

## The Journal (`/journal`)

All in `content/journal/`:

- **Campaigns**: `campaigns/c01.yml`, one per party. `slug` is the id used everywhere else; `party` lists members and their notes (`npc: true` marks an NPC).
- **Sessions**: `sessions/c01-s03.md`, one per session. Frontmatter: `title`, `campaign` (a campaign slug), `session` (number), `summary`, optional `played` date (`2026-11-21`), `leftOff` (list), `tags`, `meanwhile`. The text below the frontmatter is the full write-up. The newest session's `leftOff` becomes "Where We Left Off".
- **Quests**: `quests/<name>.md`. Frontmatter: `title`, `campaign` (a campaign slug, or `shared` to show it on the World tab), `status` (`active` or `completed`), `order`, `tags`.

## Hidden pages

Add `navigation: false` to a page's frontmatter to keep it out of the menu. Anyone with the link can still open it, so also add its path to `public/robots.txt` to keep search engines away.

## If changes don't show up

If you change `content.config.js` and the site still acts the old way, stop the dev server, delete `.nuxt` and `node_modules/.cache`, and start again.
