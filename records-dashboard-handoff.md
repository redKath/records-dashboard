# Project Handoff: Internal Records Dashboard

**Purpose:** A portfolio project for a Next.js/React frontend job. It needs to show data tables, mock JSON data, add/edit forms with Zod validation, responsive Tailwind UI, and a GitHub PR workflow with Vercel previews.
**Repo name:** `records-dashboard` (new public repo under github.com/redKath)
**Deploy:** Vercel (connected to the repo, so every PR gets a preview link)

## Stack

- Next.js (latest, App Router) + TypeScript (strict)
- Tailwind CSS
- TanStack Table v8
- react-hook-form + Zod
- No backend. Data comes from a static mock JSON file, and edits live in client state.

## Workflow (important: this is part of what's being showcased)

- `main` stays deployable. Do every feature on a branch, with a PR into `main`.
- Suggested PR sequence:
  1. `chore/setup`: scaffold, Tailwind, ESLint, Prettier, folder structure, README stub
  2. `feat/mock-data`: types, Zod schema, `data/employees.json` (~50 rows)
  3. `feat/table`: TanStack table with columns and sorting
  4. `feat/search-filters`: global search, department/status filters, pagination
  5. `feat/detail-drawer`: row click opens a detail drawer
  6. `feat/add-edit`: add/edit modal with Zod validation, and delete with confirm
  7. `feat/responsive`: mobile card layout and loading, empty, and no-results states
  8. `docs/readme`: final README with screenshots and links
- **Kat does all git operations herself.** Don't run `git commit`, `git push`, create branches, or open/merge PRs.
- Work through the milestones in order. When a milestone is done and `npm run build` and `npm run lint` pass, **stop and give Kat**:
  1. The branch name to create (e.g. `feat/table`)
  2. A conventional commit message, with a subject line ≤ 72 chars and a short body listing the changes. If the milestone is big, suggest 2–3 commits and list which files go in each.
  3. A PR title and description (what changed, how to test it). Leave a placeholder line for the Vercel preview link.
- Then wait for Kat to confirm she's pushed and merged before starting the next milestone.

## Data

`data/employees.json`: about 50 fictional employees (invented names, no real people). Fields:

```ts
{
  id: string; // "EMP-001"
  name: string;
  email: string; // fictional domain, e.g. @example.com
  department: "Engineering" | "Design" | "Marketing" | "Sales" | "Operations";
  role: string;
  status: "Active" | "On Leave" | "Inactive";
  location: string; // a few fictional cities or offices
  startDate: string; // ISO date
}
```

- Generate it once as a static file and commit it. Don't use runtime faker.
- Spread values so filters and sorting have meaningful results.
- Load it through a small `lib/data.ts` with a simulated ~500ms delay, so the loading state is real.

## Features

### Table (desktop and tablet)

- Columns: ID, Name, Email, Department, Role, Status (colored badge), Location, Start date (formatted), Actions
- Sort by clicking a column header (asc, desc, none), with an indicator
- Global search across name, email, and role (debounced)
- Filter dropdowns for department and status, plus a "Clear filters" button
- Pagination: 10 per page, prev/next, page X of Y, and a rows-per-page select (10/20/50)
- Show the result count ("Showing 11–20 of 37")

### Detail drawer

- Clicking a row (or an "eye" action) opens a side drawer with the full record
- Closes on ESC, backdrop click, or the close button. Focus is trapped while open.

### Add / Edit / Delete

- An "Add employee" button and an "Edit" row action open the same modal form
- Zod validation: name 2–80 chars, valid and unique email, department and status required, role required, start date required and not more than 1 year in the future
- Inline errors, submit disabled while invalid, and focus on the first invalid field
- Saving updates client state immediately, and a toast confirms it
- Delete row action with a confirm dialog
- Optional: persist edits to localStorage with a "Reset demo data" button (wrap in try/catch)

### Responsive and states

- Below 768px, render records as stacked cards with the key fields; search, filters, and pagination still work
- Loading skeleton while data loads
- Empty state if there is no data, and a "No results" state with a clear-filters button when filters match nothing
- Comfortable at 375px. No horizontal page scroll.

## Code quality

- One Zod schema is the source of truth; the type comes from `z.infer`
- Column definitions in their own file; reusable UI parts (Badge, Drawer, Modal, Select, Toast)
- Suggested structure: `app/`, `components/table/`, `components/ui/`, `components/forms/`, `lib/`, `data/`
- No `any`. ESLint passes with zero warnings.
- Accessible: table semantics, labeled controls, keyboard support for the drawer and modal, visible focus

## README

- One-line description, live Vercel link, screenshot or GIF (desktop and mobile)
- Stack list and feature list
- How to run locally
- Note: "Mock data only; built with Claude Code, all code reviewed and tested manually."

## Done when

- [ ] All 8 milestones done, each handed to Kat with a branch name, commit message(s), and PR description
- [ ] Production Vercel URL works; sort, search, filters, pagination, drawer, add, edit, and delete all tested by hand
- [ ] Validation rules verified, including the unique email check
- [ ] Card layout works at 375px; loading, empty, and no-results states show correctly
- [ ] `npm run build` and `npm run lint` pass
- [ ] README complete; give Kat the live URL and repo URL
