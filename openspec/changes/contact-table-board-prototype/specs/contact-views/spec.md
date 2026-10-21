# Spec Delta

## Purpose

Provide complementary ways to scan one fictional contact collection without losing consistency or the user's place when switching views.

## ADDED Requirements

### Requirement: Shared contact collection
The application SHALL display 8–12 fictional contacts with Name, Email, Company, Role, Owner, Labels, Stage, and Notes fields. Every contact MUST have exactly one of Lead, Prospect, Qualified, or Customer as its stage. Some optional fields SHALL be absent.

#### Scenario: Initial dataset
- **WHEN** the application loads
- **THEN** both views represent the same set of contact records without duplicates

### Requirement: Table view
The application SHALL provide a table that shows contacts as rows and selected fields as scannable columns.

#### Scenario: Scan contacts
- **WHEN** the user selects Table
- **THEN** each contact appears once as a row and its current stage is visible

### Requirement: Board view
The application SHALL provide a board with Lead, Prospect, Qualified, and Customer groups, including an empty group when no contact is in that stage.

#### Scenario: Scan stages
- **WHEN** the user selects Board
- **THEN** each contact appears once in the group matching its current stage and an empty group remains visible

### Requirement: View continuity
The application SHALL preserve the current view when a details panel is closed and SHALL show saved contact data when switching views.

#### Scenario: Return to context
- **WHEN** the user closes a contact panel from Board
- **THEN** the board remains the active view

#### Scenario: Switch after edit
- **WHEN** the user saves an edit and switches views repeatedly
- **THEN** the latest saved values appear in both views without duplicate or stale records

### Requirement: Narrow desktop usability
The application SHALL keep both views usable on a narrower desktop viewport.

#### Scenario: Reduced width
- **WHEN** the viewport becomes narrower than the full board or table width
- **THEN** the user can still reach every group and field without clipped controls
