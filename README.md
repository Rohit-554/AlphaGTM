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

Use **Add contact** to create a record with a required name and optional details. The new contact opens in the shared panel. **Delete contact** in that panel asks for confirmation before removing a record. Changes are saved in this browser and remain after reload.

On the board, drag a card into another stage to move it immediately. An **Undo** notice restores the previous stage for a short time. Opening the card and using the Stage field remains the keyboard-friendly option. Small transitions respect the browser's reduced-motion preference.

Use the **Dark mode / Light mode** button in the header to switch palettes. The workspace starts with your system preference on first visit and remembers your selection in this browser. Both palettes use the same layout and contact data.

## Design choices

- **Different density for different jobs.** The table uses compact rows for comparison; cards use a little more space to show who needs attention at each stage. Notes appear in the panel because long text makes both scanning surfaces harder to use.
- **One source of truth.** Contacts live in the `App` component and are keyed by stable IDs. All views derive directly from that array. The editor keeps a local draft until Save; a validated browser-local copy preserves changes across reloads.
- **Visible edge cases.** Customer starts empty, and some contacts lack an email, role, labels, or notes. Missing values are shown as “Not added” or an em dash.
- **Return to context.** The panel overlays the current view; closing it restores focus to the opening control, or to the moved card after a stage change. The table and board remain horizontally scrollable on narrower desktops.
- **Quick moves with a recovery path.** Native drag-and-drop changes one record by ID. The latest board move can be undone; saving another edit clears that pending Undo action.
- **Two palettes, one hierarchy.** Light mode uses soft white surfaces and a restrained green accent. Dark mode uses deep green charcoal surfaces with brighter text and stage colors. The switch is keyboard accessible and its preference is stored separately from contacts.

## Trade-offs and next steps

This remains a browser-only prototype. Its data is not shared across devices or users, and clearing browser storage restores the seed contacts. Only Stage and Notes are editable after creation, matching the original core flow. Cards can move between stages but cannot be reordered within a stage.

The core OpenSpec change is in [`openspec/changes/contact-table-board-prototype`](openspec/changes/contact-table-board-prototype). The optional-feature implementation is tracked in [`openspec/changes/contact-workspace-enhancements`](openspec/changes/contact-workspace-enhancements).
