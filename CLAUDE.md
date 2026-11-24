# Catacombs of Despair — Claude Code rules

The campaign website for the players: lore, NPCs, locations, mechanics and the session journal. Nuxt 4 + Nuxt Content 3 + Nuxt UI 4, styled with Tailwind 4.

**Start every session by reading this file and [README.md](README.md) (where things live, and the Journal's frontmatter fields). Then read only the files the task touches.**

## Key rules
- **Don't guess.** If it's unclear what a page, mechanic or NPC should say, ask. Never invent lore, rules, names, dates or what happened in a session; the campaign's facts come from the user.
- **The site is public and the players read it.** Never put GM secrets, plans or spoilers in `content/` unless the user says the players may see them. A page with `navigation: false` is only hidden from the menu: anyone with the link can open it. Every hidden page also goes in `public/robots.txt`.
- **Keep the user's words.** Fix typos and grammar only when asked or when it's clearly a slip; don't rewrite lore, jokes, voice or in-world flavour. When writing new text, match the plain, short-sentence style of the existing pages.
- **Content goes in `content/`, not in Vue files.** A new page is a markdown file (the folder is the URL). A new Journal session, quest or campaign follows the schema in `content.config.js`; if a new field is needed, change the schema and the README in the same change.
- **Reuse, never copy.** Before building a block, card or tab set, look for one in `app/components/` (for example `::Tabz{tabs="A, B"}` for tabs in markdown, `components/journal/*` for the Journal). Use Nuxt UI components and the theme colours in `app/assets/css/main.css` / `app/app.config.ts` rather than one-off styles.
- **Images:** `.webp` in `public/images/<area>/`, with `alt` text and `width`/`height` set so the page doesn't jump while loading.
- **Accessibility:** WCAG 2.2 Level AA. Real headings in order, alt text on every image, visible focus, keyboard use, readable contrast on the dark theme, tap targets ≥24 px. Everything must work at 320 px wide on iPhone Safari and Android Chrome.
- **Modern web:** for HTML, CSS and browser JS, use the `modern-web-guidance` skill before writing ad-hoc solutions (Baseline Widely available; newer features only with a fallback). Keep its note in replies to a line or two.
- **Moved or renamed pages** get a redirect in `routeRules` in `nuxt.config.ts` so old links the players saved keep working.
- **Checking work:** there are no automated tests. After a change run `npm run lint` and `npm run build` (it also type-checks), and look at the changed pages in the dev server at desktop and phone width. No screenshots unless the user asks.
- **Git and deploys:** every push or merge to `master` deploys to Netlify (live at https://catacombsofdespair.netlify.app/), and the free plan allows about 20 production deploys a month. Work on a branch per change, batch small content edits together, and merge to `master` once per change, only when the user says to merge.
- Confirm before deleting or renaming content pages or images.
- Secrets (if any are ever needed) live only in `.env` (gitignored). Ask for each one when first needed.

## Commands
- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build, also type-checks
- `npm run generate` — static build
- `npm run lint` / `npm run typecheck`
- If `content.config.js` changes don't show up: stop the dev server, delete `.nuxt` and `node_modules/.cache`, and start again.
