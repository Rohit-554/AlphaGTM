# Kinship contacts

A standalone contact table and stage board built for Alpha's Frontend Design Engineer exercise. The same ten fictional contacts appear in both views, and Stage and Notes edits are kept in one React state owner.

**Live preview:** https://alpha-contact-workspace.vercel.app

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production bundle:

```bash
npm run build
npm run preview
```

To run the browser interaction checks, install Playwright's Chromium once with `npx playwright install chromium`, then run `npm run test:e2e`.

## Core interaction

Switch between **Table** and **Board** with the view control. Open any row or card to inspect a contact. Change **Stage** or **Notes**, then choose **Save changes** to commit both fields, or **Cancel**, the close button, or Escape to discard the draft. A saved stage change immediately moves the board card and updates the table. The active view remains in place when the panel closes.

Search matches names, companies, roles, owners, email, labels, and notes. Stage, Owner, and Label filters can be combined and remain active across views. **Insights** uses the same filtered contacts to show stage and owner summaries; its contact list opens the same details panel.

## Design choices

- **Different density for different jobs.** The table uses compact rows for comparison; cards use a little more space to show who needs attention at each stage. Notes appear in the panel because long text makes both scanning surfaces harder to use.
- **One source of truth.** Contacts live in the `App` component and are keyed by stable IDs. Both views derive directly from that array. The editor keeps a local draft until Save.
- **Visible edge cases.** Customer starts empty, and some contacts lack an email, role, labels, or notes. Missing values are shown as “Not added” or an em dash.
- **Return to context.** The panel overlays the current view; closing it restores focus to the opening control, or to the moved card after a stage change. The table and board remain horizontally scrollable on narrower desktops.

## Trade-offs and next steps

This is intentionally an in-memory prototype: edits reset on reload. Only Stage and Notes are editable, matching the requested core flow. Drag-and-drop, contact creation, persistence, and expanded browser tests are being added in the follow-up change.

The OpenSpec proposal, behavior specs, design decisions, and task checklist are in [`openspec/changes/contact-table-board-prototype`](openspec/changes/contact-table-board-prototype). Optional follow-ups are listed separately in `future.md` there.
