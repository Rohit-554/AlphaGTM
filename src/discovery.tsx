import {
  BarChart3,
  ContactRound,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Avatar } from './components'
import { Contact, Stage, stages } from './data'

export type DiscoveryFilters = {
  query: string
  stage: Stage | ''
  owner: string
  label: string
}

export function filterContacts(contacts: Contact[], filters: DiscoveryFilters) {
  const query = filters.query.trim().toLocaleLowerCase()
  return contacts.filter((contact) => {
    if (filters.stage && contact.stage !== filters.stage) return false
    if (filters.owner && contact.owner !== filters.owner) return false
    if (filters.label && !contact.labels.includes(filters.label)) return false
    if (!query) return true
    return [
      contact.name,
      contact.email,
      contact.company,
      contact.role,
      contact.owner,
      ...contact.labels,
      contact.notes,
    ]
      .filter(Boolean)
      .some((value) => value?.toLocaleLowerCase().includes(query))
  })
}

export function DiscoveryControls({
  contacts,
  filters,
  onChange,
  onClear,
}: {
  contacts: Contact[]
  filters: DiscoveryFilters
  onChange: (filters: DiscoveryFilters) => void
  onClear: () => void
}) {
  const owners = [...new Set(contacts.map((contact) => contact.owner))].sort()
  const labels = [
    ...new Set(contacts.flatMap((contact) => contact.labels)),
  ].sort()
  const active = Object.values(filters).some(Boolean)

  return (
    <div className="discovery-controls">
      <label className="search-field">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">Search contacts</span>
        <input
          aria-label="Search contacts"
          type="search"
          value={filters.query}
          onChange={(event) =>
            onChange({ ...filters, query: event.target.value })
          }
          placeholder="Search contacts..."
        />
      </label>
      <span className="filter-label" aria-hidden="true">
        <SlidersHorizontal size={15} /> Filters
      </span>
      <label className="filter-select">
        <span className="sr-only">Filter by stage</span>
        <select
          aria-label="Filter by stage"
          value={filters.stage}
          onChange={(event) =>
            onChange({ ...filters, stage: event.target.value as Stage | '' })
          }
        >
          <option value="">All stages</option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </label>
      <label className="filter-select">
        <span className="sr-only">Filter by owner</span>
        <select
          aria-label="Filter by owner"
          value={filters.owner}
          onChange={(event) =>
            onChange({ ...filters, owner: event.target.value })
          }
        >
          <option value="">All owners</option>
          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      </label>
      <label className="filter-select">
        <span className="sr-only">Filter by label</span>
        <select
          aria-label="Filter by label"
          value={filters.label}
          onChange={(event) =>
            onChange({ ...filters, label: event.target.value })
          }
        >
          <option value="">All labels</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {active ? (
        <button className="clear-filters" type="button" onClick={onClear}>
          <X size={14} /> Clear
        </button>
      ) : null}
    </div>
  )
}

export function NoMatches({ onClear }: { onClear: () => void }) {
  return (
    <div className="no-matches" role="status">
      <span className="no-matches-icon">
        <Search size={23} />
      </span>
      <h3>No contacts found</h3>
      <p>Try another search or clear your filters to see all contacts.</p>
      <button
        className="button button--secondary"
        type="button"
        onClick={onClear}
      >
        Clear search and filters
      </button>
    </div>
  )
}

export function NoContacts({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="no-matches" role="status">
      <span className="no-matches-icon">
        <ContactRound size={23} />
      </span>
      <h3>No contacts yet</h3>
      <p>Add your first contact to start filling this workspace.</p>
      <button className="button button--primary" type="button" onClick={onAdd}>
        Add contact
      </button>
    </div>
  )
}

export function InsightsView({
  contacts,
  onOpen,
}: {
  contacts: Contact[]
  onOpen: (id: string, trigger: HTMLElement) => void
}) {
  const owners = [...new Set(contacts.map((contact) => contact.owner))].sort()
  const maxOwnerCount = Math.max(
    1,
    ...owners.map(
      (owner) => contacts.filter((contact) => contact.owner === owner).length,
    ),
  )

  return (
    <div className="insights-view" role="region" aria-label="Contact insights">
      <div className="insights-summary">
        <div className="insights-intro">
          <span className="insights-icon">
            <BarChart3 size={20} />
          </span>
          <span className="insights-overline">PIPELINE SNAPSHOT</span>
          <strong>{contacts.length}</strong>
          <span>contacts in this view</span>
        </div>
        <div className="stage-breakdown">
          {stages.map((stage) => {
            const count = contacts.filter(
              (contact) => contact.stage === stage,
            ).length
            return (
              <div className="stage-breakdown-row" key={stage}>
                <div>
                  <span
                    className={`column-marker column-marker--${stage.toLowerCase()}`}
                  />
                  <span>{stage}</span>
                  <strong>{count}</strong>
                </div>
                <span className="insights-track">
                  <span
                    className={`insights-fill insights-fill--${stage.toLowerCase()}`}
                    style={{
                      width: `${(count / Math.max(contacts.length, 1)) * 100}%`,
                    }}
                  />
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="insights-lower">
        <section className="insights-card" aria-label="Contacts by owner">
          <h3>By owner</h3>
          <p>How contacts are shared across the team.</p>
          <div className="owner-breakdown">
            {owners.map((owner) => {
              const count = contacts.filter(
                (contact) => contact.owner === owner,
              ).length
              return (
                <div className="owner-breakdown-row" key={owner}>
                  <span>{owner}</span>
                  <span className="insights-track">
                    <span
                      className="insights-fill insights-fill--owner"
                      style={{ width: `${(count / maxOwnerCount) * 100}%` }}
                    />
                  </span>
                  <strong>{count}</strong>
                </div>
              )
            })}
          </div>
        </section>
        <section className="insights-card" aria-label="Contacts in this view">
          <h3>Contacts in this view</h3>
          <p>Open anyone to see the full relationship.</p>
          <div className="insights-contact-list">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                data-contact-id={contact.id}
                onClick={(event) => onOpen(contact.id, event.currentTarget)}
              >
                <Avatar contact={contact} />
                <span>
                  <strong>{contact.name}</strong>
                  <small>
                    {contact.company || 'Company not added'} · {contact.stage}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
