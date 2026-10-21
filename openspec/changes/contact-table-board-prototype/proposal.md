# Proposal

## Why

Alpha's exercise asks for a compact, convincing demonstration of frontend design and state management for a contact workspace. The prototype needs to make the same records useful in both a dense table and a stage board while keeping edits predictable.

## What Changes

- Build a standalone React and TypeScript application with 10 fictional contacts and one shared in-memory dataset.
- Add table and board views, with board groups for Lead, Prospect, Qualified, and Customer.
- Add a shared details panel for editing Stage and Notes with explicit Save and Cancel behavior.
- Handle empty groups, missing optional fields, repeated edits, keyboard focus, and narrower desktop widths.
- Document setup, design choices, trade-offs, and optional follow-up work in a short README.

## Capabilities

### New Capabilities

- `contact-views`: Display and switch between synchronized table and board views of the same contacts.
- `contact-editing`: Inspect contacts and save or cancel Stage and Notes edits from either view.

### Modified Capabilities

None.

## Impact

New Vite, React, and TypeScript frontend files, local mock data, styling, and documentation. There are no backend services or external APIs.
