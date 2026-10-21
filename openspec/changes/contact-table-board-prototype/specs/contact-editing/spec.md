# Spec Delta

## Purpose

Let users inspect a contact and make deliberate Stage and Notes changes from either view, with clear save and cancel outcomes.

## ADDED Requirements

### Requirement: Open contact details
The application SHALL let the user open the same contact details panel from a table row or board card. The panel SHALL show all eight contact fields and represent missing optional data clearly.

#### Scenario: Open from either view
- **WHEN** the user activates a contact in Table or Board
- **THEN** its details panel opens with that contact's current data

### Requirement: Save edits
The application SHALL allow Stage and Notes to be edited in the panel and SHALL commit both values only when Save changes is activated.

#### Scenario: Move stage
- **WHEN** the user changes a contact's stage and saves
- **THEN** the table reflects the new stage and the board card appears in the new group

#### Scenario: Repeat edit
- **WHEN** the user reopens an edited contact and saves another change
- **THEN** the latest saved values are shown everywhere

### Requirement: Cancel edits
The application SHALL discard unsaved Stage and Notes changes when Cancel or the close control is activated.

#### Scenario: Cancel draft
- **WHEN** the user changes Stage or Notes and cancels
- **THEN** the underlying record retains its previously saved values

### Requirement: Keyboard operation and focus
The details panel SHALL be operable by keyboard, close on Escape, and restore focus to a sensible contact or view control on close.

#### Scenario: Keyboard return
- **WHEN** a keyboard user opens and closes a contact panel
- **THEN** focus returns to the control that opened it when that control is still available
