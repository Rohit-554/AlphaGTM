# Spec Delta

## Purpose

Let users add and remove fictional contacts while keeping all views consistent and retaining local changes across reloads on the same browser.

## ADDED Requirements

### Requirement: Create contact
The workspace SHALL offer a contact form with the required Name, Owner, and Stage fields and optional Email, Company, Role, Labels, and Notes fields. It SHALL reject an empty or whitespace-only Name and SHALL add a valid contact exactly once to the shared collection.

#### Scenario: Save new contact
- **WHEN** the user enters a valid name and saves the form
- **THEN** the new contact appears in the table and in its selected board stage

#### Scenario: Cancel or invalid name
- **WHEN** the user cancels creation or tries to save without a valid name
- **THEN** no new contact is added

### Requirement: Delete contact
The workspace SHALL require explicit confirmation before deleting a contact and SHALL remove a confirmed contact from every view.

#### Scenario: Confirm deletion
- **WHEN** the user confirms deletion from a contact's details panel
- **THEN** that contact is absent from the table, board, and insights

#### Scenario: Cancel deletion
- **WHEN** the user cancels the confirmation
- **THEN** the contact remains unchanged

### Requirement: Browser-local persistence
The workspace SHALL retain created, edited, moved, and deleted contacts across reloads in the same browser. If stored data is unavailable or malformed, it SHALL safely show the initial fictional dataset.

#### Scenario: Reload after edit
- **WHEN** the user saves a contact change and reloads
- **THEN** the saved change remains visible

#### Scenario: Malformed local data
- **WHEN** the browser has invalid saved contact data
- **THEN** the workspace loads its initial fictional contacts without crashing
