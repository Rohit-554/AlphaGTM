# Design

## Context

This is a greenfield repository. The exercise requires a standalone frontend with local mock data and a short delivery window. See proposal.md for the motivation and the two capability specs for observable behavior.

## Goals / Non-Goals

**Goals:**
- Make the table and board feel like two deliberate lenses on one collection.
- Keep state changes easy to trace and review in a small codebase.
- Support keyboard use and reduced desktop widths without introducing a component framework.

**Non-Goals:**
- Persistence across reloads, authentication, server data, or contact creation and deletion.
- Search, filtering, drag-and-drop, animation, and extra views for the core submission.

## Decisions

1. **One state owner.** `App` holds the contact array and active view; table and board receive the same array. Saving updates a contact by stable ID. This avoids two copies of the dataset. A state library was considered but adds setup and indirection to a small prototype.
2. **One shared editor.** Both views open a single details panel. Stage and Notes are draft values initialized on open; Save commits them together and Cancel discards them. Inline table and card editors were considered but duplicate interaction patterns and complicate cancel behavior.
3. **Intentional information density.** The table foregrounds Name, Company/Role, Stage, Owner, Email, and Labels. Cards foreground Name, Company/Role, Owner, and Labels. The panel shows every field and gives Notes enough room for editing. Notes stay out of scanning surfaces because long text disrupts their density.
4. **Fixed stage order and stable IDs.** Board groups are rendered in the given stage order even when empty. Records are filtered from the shared array for each group. Cards are keyed by ID so stage moves cannot leave duplicate instances.
5. **Responsive overflow.** The table scrolls horizontally inside its own region. The board keeps four readable columns and scrolls horizontally on narrower desktops. The details panel overlays content so opening it does not reset scroll or view state.
6. **Plain CSS and semantic controls.** A small visual system in CSS gives precise control over density and focus styles. No component library is needed for this scope. The panel uses dialog semantics, initial focus, Escape handling, and focus restoration.

## Risks / Trade-offs

- [In-memory edits disappear on reload] → State this clearly in the README; persistence is outside the exercise.
- [Four columns exceed smaller desktops] → Keep all columns reachable by horizontal scrolling with visible group headings.
- [A saved stage move removes the original card trigger] → Fall back to the active view switch when restoring focus if the original card is gone.
- [Decorative styling can crowd the data] → Keep the palette restrained and test the table and board at dense and narrow widths.
