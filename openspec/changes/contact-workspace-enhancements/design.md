# Design

## Context

The existing Vite application stores ten contacts in `App`, derives Table and Board from that array, and uses one details panel for Stage and Notes. The new controls must continue to feed that same state owner. See proposal.md and the three capability specs for behavior.

## Goals / Non-Goals

**Goals:**
- Add useful exploration without duplicating contact state.
- Make optional changes reversible or explicitly confirmed.
- Keep the code understandable and the original views visually focused.

**Non-Goals:**
- Multi-user synchronization, backend storage, authentication, or cross-device data.
- A general-purpose spreadsheet editor or drag ordering within a stage.

## Decisions

1. **Derive visible contacts.** Keep the full collection in one state variable. Search and Stage/Owner/Label filters derive a visible subset. Table, Board, and Insights use that subset, while the top-level collection count still represents all saved contacts. Separate copies per view were rejected because they could diverge.
2. **Add Insights as a summary view.** The third view gives stage and owner breakdowns of the visible set plus a contact list that opens the shared panel. Another card grid would add little beyond Board.
3. **Persist a versioned collection.** Initialize state from a versioned local-storage key with runtime shape checks and a seed fallback. Write only after state changes. This is simpler than a database for fictional data, and the UI/README will label the storage boundary.
4. **Use one creation dialog and one delete confirmation.** The creation form collects all contact fields but requires only a trimmed name plus selected owner and stage. Deletion is initiated from the details panel and confirmed in a distinct dialog. Inline insertion and immediate deletion were rejected because they obscure the action outcome.
5. **Use native browser drag events.** Board cards carry their stable contact ID; columns accept drops. A successful drop updates Stage and shows a short-lived Undo notice. The details panel select remains the non-drag alternative. No drag library is needed for four static columns.
6. **Animate through CSS.** Use brief opacity/position transitions for changing views, cards, dialogs, and the undo notice. A `prefers-reduced-motion` rule disables nonessential effects.

## Risks / Trade-offs

- [Saved local data can be stale after a code update] → Validate stored records and fall back to seed data when malformed; use a versioned key.
- [Search plus filters can hide a newly created contact] → Clear search and filters after creation, then open the new contact.
- [Drag can be hard to discover] → Add a small board hint and visible drop highlight; keep stage editing in the panel.
- [Undo can become stale after later edits] → Only retain the latest move and clear it on another record change.
- [Extra controls can crowd the original layout] → Place discovery controls in a compact row and retain table/board density.

## Migration Plan

Deploy the updated static bundle to the existing Vercel project after checks pass. The prior deployment remains available in Vercel for rollback. Existing visitors receive the seed dataset on first load; users who have only seen the current in-memory version have no stored data to migrate.
