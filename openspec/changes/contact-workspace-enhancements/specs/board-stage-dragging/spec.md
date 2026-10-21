# Spec Delta

## Purpose

Allow quick pointer-based stage movement on the board while preserving a clear recovery path and a keyboard-accessible editing alternative.

## ADDED Requirements

### Requirement: Drag contact between stages
The board SHALL let a pointer user drag a card into another stage group. A successful drop SHALL update the same record used by all views and SHALL not create a duplicate.

#### Scenario: Move a card
- **WHEN** the user drags a Lead card onto the Customer group
- **THEN** the card appears once in Customer and its stage is updated in the table

### Requirement: Undo drag movement
After a successful drag movement, the workspace SHALL show an Undo action that restores the contact's previous stage while it is available.

#### Scenario: Undo a move
- **WHEN** the user activates Undo after moving a card
- **THEN** the card returns to its previous group

### Requirement: Accessible alternative and motion preference
The details panel SHALL remain available for keyboard stage changes. Visual motion SHALL be subtle and SHALL respect the user's reduced-motion setting.

#### Scenario: Keyboard stage change
- **WHEN** a keyboard user opens a card and changes Stage in the details panel
- **THEN** the card moves after Save without needing drag-and-drop

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion
- **THEN** nonessential movement animations are disabled
