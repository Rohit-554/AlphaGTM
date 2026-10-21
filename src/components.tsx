import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Columns3,
  FileText,
  LayoutGrid,
  Mail,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Contact, initials, ownerInitials, Stage, stages } from './data'

export type View = 'table' | 'board' | 'insights'

export function Avatar({
  contact,
  size = 'normal',
}: {
  contact: Contact
  size?: 'normal' | 'large'
}) {
  return (
    <span
      className={`avatar avatar--${contact.color} ${size === 'large' ? 'avatar--large' : ''}`}
      aria-hidden="true"
    >
      {initials(contact.name)}
    </span>
  )
}

function StagePill({ stage }: { stage: Stage }) {
  return (
    <span className={`stage-pill stage-pill--${stage.toLowerCase()}`}>
      <span className="stage-dot" />
      {stage}
    </span>
  )
}

function Owner({ name }: { name: string }) {
  return (
    <span className="owner">
      <span className="owner-avatar" aria-hidden="true">
        {ownerInitials(name)}
      </span>
      <span>{name}</span>
    </span>
  )
}

function Labels({ labels, limit }: { labels: string[]; limit?: number }) {
  if (!labels.length) return <span className="missing-value">—</span>
  const visible = limit ? labels.slice(0, limit) : labels
  return (
    <span className="labels">
      {visible.map((label) => (
        <span className="label" key={label}>
          {label}
        </span>
      ))}
      {limit && labels.length > limit ? (
        <span className="label label--more">+{labels.length - limit}</span>
      ) : null}
    </span>
  )
}

export function TableView({
  contacts,
  onOpen,
}: {
  contacts: Contact[]
  onOpen: (id: string, trigger: HTMLElement) => void
}) {
  return (
    <div
      className="table-scroll"
      role="region"
      aria-label="Contacts table"
      tabIndex={0}
    >
      <table className="contacts-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Company / role</th>
            <th scope="col">Stage</th>
            <th scope="col">Owner</th>
            <th scope="col">Email</th>
            <th scope="col">Labels</th>
            <th scope="col">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              onClick={(event) => {
                const button =
                  event.currentTarget.querySelector<HTMLButtonElement>(
                    '.contact-name-button',
                  )
                if (button) onOpen(contact.id, button)
              }}
            >
              <td>
                <button
                  className="contact-name-button"
                  type="button"
                  data-contact-id={contact.id}
                  onClick={(event) => {
                    event.stopPropagation()
                    onOpen(contact.id, event.currentTarget)
                  }}
                >
                  <Avatar contact={contact} />
                  <span className="contact-name">{contact.name}</span>
                </button>
              </td>
              <td>
                <span className="company-cell">
                  <span className="company-name">
                    {contact.company || (
                      <span className="missing-value">Not added</span>
                    )}
                  </span>
                  <span className="role-name">
                    {contact.role || 'Role not added'}
                  </span>
                </span>
              </td>
              <td>
                <StagePill stage={contact.stage} />
              </td>
              <td>
                <Owner name={contact.owner} />
              </td>
              <td>
                {contact.email ? (
                  <a
                    className="email-link"
                    href={`mailto:${contact.email}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {contact.email}
                  </a>
                ) : (
                  <span className="missing-value">Not added</span>
                )}
              </td>
              <td>
                <Labels labels={contact.labels} limit={2} />
              </td>
              <td>
                <ChevronRight
                  className="row-chevron"
                  size={16}
                  aria-hidden="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BoardView({
  contacts,
  onOpen,
  filtered = false,
}: {
  contacts: Contact[]
  onOpen: (id: string, trigger: HTMLElement) => void
  filtered?: boolean
}) {
  return (
    <div
      className="board-scroll"
      role="region"
      aria-label="Contacts board"
      tabIndex={0}
    >
      <div className="board-grid">
        {stages.map((stage) => {
          const people = contacts.filter((contact) => contact.stage === stage)
          return (
            <section
              className="board-column"
              key={stage}
              aria-label={`${stage}, ${people.length} contacts`}
            >
              <div className="board-column-heading">
                <div className="board-column-title">
                  <span
                    className={`column-marker column-marker--${stage.toLowerCase()}`}
                  />
                  <h2>{stage}</h2>
                  <span className="column-count">{people.length}</span>
                </div>
                <span className="column-rule" />
              </div>
              <div className="board-cards">
                {people.length ? (
                  people.map((contact) => (
                    <button
                      className="contact-card"
                      key={contact.id}
                      type="button"
                      data-contact-id={contact.id}
                      onClick={(event) =>
                        onOpen(contact.id, event.currentTarget)
                      }
                    >
                      <span className="card-top">
                        <Avatar contact={contact} />
                        <ArrowUpRight
                          size={15}
                          className="card-arrow"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="card-name">{contact.name}</span>
                      <span className="card-company">
                        {contact.company || 'Company not added'}
                        {contact.role ? <span> · {contact.role}</span> : null}
                      </span>
                      <span className="card-divider" />
                      <span className="card-bottom">
                        <span className="card-owner">
                          <span className="owner-avatar" aria-hidden="true">
                            {ownerInitials(contact.owner)}
                          </span>
                          {contact.owner}
                        </span>
                        <Labels labels={contact.labels} limit={1} />
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="empty-column">
                    <div className="empty-icon">
                      <LayoutGrid size={20} strokeWidth={1.6} />
                    </div>
                    <strong>
                      {filtered ? 'No matches here' : 'No contacts yet'}
                    </strong>
                    <span>
                      {filtered
                        ? 'Try another filter to see more contacts.'
                        : 'Move a contact here by changing their stage.'}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export function DetailsPanel({
  contact,
  onClose,
  onSave,
}: {
  contact: Contact
  onClose: () => void
  onSave: (id: string, stage: Stage, notes: string) => void
}) {
  const [stage, setStage] = useState<Stage>(contact.stage)
  const [notes, setNotes] = useState(contact.notes)
  const dialogRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLSelectElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stageRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), select, textarea, a[href]',
        ) ?? [],
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const changed = stage !== contact.stage || notes !== contact.notes

  return (
    <div className="panel-layer">
      <div className="panel-scrim" onClick={onClose} aria-hidden="true" />
      <aside
        ref={dialogRef}
        className="details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        aria-describedby="panel-description"
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">CONTACT DETAILS</span>
            <p id="panel-description">
              View the relationship and update its progress.
            </p>
          </div>
          <button
            className="icon-button panel-close"
            type="button"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={19} />
          </button>
        </div>
        <div className="panel-content">
          <div className="panel-person">
            <Avatar contact={contact} size="large" />
            <div>
              <h2 id="panel-title">{contact.name}</h2>
              <p>
                {contact.company || 'Company not added'}
                {contact.role ? ` · ${contact.role}` : ''}
              </p>
            </div>
          </div>
          <div className="panel-section-title">CONTACT INFORMATION</div>
          <dl className="detail-list">
            <div>
              <dt>
                <Mail size={16} />
                Email
              </dt>
              <dd>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                ) : (
                  <span className="missing-value">Not added</span>
                )}
              </dd>
            </div>
            <div>
              <dt>
                <BriefcaseBusiness size={16} />
                Company
              </dt>
              <dd>
                {contact.company || (
                  <span className="missing-value">Not added</span>
                )}
              </dd>
            </div>
            <div>
              <dt>
                <Columns3 size={16} />
                Role
              </dt>
              <dd>
                {contact.role || (
                  <span className="missing-value">Not added</span>
                )}
              </dd>
            </div>
            <div>
              <dt>
                <span className="detail-icon-spacer" />
                Owner
              </dt>
              <dd>
                <Owner name={contact.owner} />
              </dd>
            </div>
            <div>
              <dt>
                <span className="detail-icon-spacer" />
                Labels
              </dt>
              <dd>
                <Labels labels={contact.labels} />
              </dd>
            </div>
          </dl>
          <div className="panel-section-title panel-section-title--edit">
            EDIT CONTACT
          </div>
          <label className="field-label" htmlFor="contact-stage">
            Stage
          </label>
          <div className="select-wrap">
            <select
              id="contact-stage"
              ref={stageRef}
              value={stage}
              onChange={(event) => setStage(event.target.value as Stage)}
            >
              {stages.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            <span className={`select-dot select-dot--${stage.toLowerCase()}`} />
          </div>
          <label className="field-label notes-label" htmlFor="contact-notes">
            <FileText size={15} /> Notes
          </label>
          <textarea
            id="contact-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add a note about this contact..."
            rows={6}
          />
          <p className="field-hint">
            Only stage and notes are editable in this prototype.
          </p>
        </div>
        <div className="panel-footer">
          <span
            className={`save-status ${changed ? 'save-status--changed' : ''}`}
            aria-live="polite"
          >
            {changed ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <div className="panel-actions">
            <button
              className="button button--secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="button button--primary"
              type="button"
              onClick={() => onSave(contact.id, stage, notes)}
            >
              Save changes
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
