# Tasks

## 1. Discovery

- [x] 1.1 Add shared case-insensitive search and Stage/Owner/Label filters; verify combined filters produce the same visible IDs in Table and Board.
- [x] 1.2 Add clear controls and no-match states; verify users can recover from zero results in either view.
- [x] 1.3 Add an Insights view with stage and owner breakdowns plus contact entry points; verify its counts follow active filters and its panel returns to Insights.
- [x] 1.4 Add browser checks and README guidance for search, filters, and Insights; verify the checks pass and the documented behavior matches the UI.

## 2. Contact lifecycle

- [x] 2.1 Add guarded browser-local persistence with a seed fallback; verify edits survive reload and malformed saved data does not crash the app.
- [x] 2.2 Add the contact creation form with required-name validation and optional fields; verify Save adds one contact and Cancel adds none.
- [x] 2.3 Add deletion with a distinct confirmation step; verify Cancel keeps the record and Confirm removes it from every view.
- [x] 2.4 Add browser checks and README guidance for creation, deletion, and the local-storage boundary; verify the checks pass.

## 3. Board interaction and motion

- [x] 3.1 Add card drag-and-drop between stage columns with a visible target; verify the moved record appears once in its new group and the table stage updates.
- [x] 3.2 Add a time-limited Undo action for the latest board move; verify Undo restores the previous stage and later edits clear stale undo state.
- [x] 3.3 Add subtle transitions and a reduced-motion rule; verify the rule disables nonessential animations while keyboard stage editing remains available.
- [x] 3.4 Add browser checks and README guidance for drag-and-drop and Undo; verify the checks pass.

## 4. Integration and delivery

- [x] 4.1 Run formatting, production build, and the full browser suite across repeated edits, filters, creation, deletion, reload, and drag; verify all checks pass.
- [x] 4.2 Update the existing Vercel deployment and README preview link; verify the public site shows the new controls.
