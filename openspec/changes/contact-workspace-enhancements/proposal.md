# Proposal

## Why

The core exercise is complete and the user has asked to build the optional follow-ups. The next iteration should make the fictional workspace easier to explore and manipulate while preserving the original table, board, and editing behavior.

## What Changes

- Add contact search, stage/owner/label filters, and an Insights view that summarizes the currently visible contacts.
- Add contact creation and deletion with validation and confirmation, while keeping the same dataset in all views.
- Persist the contact collection in browser local storage so changes survive reloads on the same device.
- Add board card drag-and-drop stage changes with a visible Undo action; the details panel remains the keyboard-accessible alternative.
- Add restrained interaction animations that respect reduced-motion preferences.
- Expand browser checks and update documentation and the Vercel preview.

## Capabilities

### New Capabilities

- `contact-discovery`: Search, filter, and inspect contact summaries across the workspace.
- `contact-lifecycle`: Create, delete, and locally persist fictional contacts.
- `board-stage-dragging`: Move contacts between board stages with a reversible pointer interaction and reduced-motion visual feedback.

### Modified Capabilities

None. The core change remains active in OpenSpec and has not yet been synced into main specs.

## Impact

Changes to React state ownership, view controls, board interactions, styling, local storage handling, tests, and README. No backend or external data service is added.
