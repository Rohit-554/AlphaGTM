# Spec Delta

## Purpose

Help users find contacts and understand their distribution without changing the shared records or losing the current search context.

## ADDED Requirements

### Requirement: Contact search
The workspace SHALL provide a case-insensitive search across Name, Email, Company, Role, Owner, Labels, and Notes. The query SHALL remain in effect when switching views.

#### Scenario: Search from table
- **WHEN** the user enters part of a contact's company name
- **THEN** the table displays matching contacts and a result count

#### Scenario: Search across views
- **WHEN** the user switches from Table to Board with a query active
- **THEN** the board displays the same matching set

### Requirement: Contact filters
The workspace SHALL provide Stage, Owner, and Label filters. Active filters SHALL combine with search, be removable together, and remain in effect when switching views.

#### Scenario: Combined filters
- **WHEN** the user chooses a stage and owner
- **THEN** only contacts matching both selections and any search query appear

#### Scenario: No matches
- **WHEN** no contact matches the active search and filters
- **THEN** the current view shows an explanatory empty result with a way to clear the controls

### Requirement: Insights view
The workspace SHALL provide a third view summarizing the currently visible contacts by stage and owner, and allow a contact to be opened from that view.

#### Scenario: Filtered insights
- **WHEN** the user opens Insights with a filter active
- **THEN** its totals and breakdowns use the same filtered set as Table and Board

#### Scenario: Open from insights
- **WHEN** the user activates a contact in Insights
- **THEN** that contact's shared details panel opens and closing it returns to Insights
