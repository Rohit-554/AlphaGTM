import { Plus, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Contact, Stage, stages } from './data'

const colors = [
  'peach',
  'lavender',
  'mint',
  'blue',
  'rose',
  'sand',
  'lilac',
  'sky',
  'apricot',
  'sage',
]

export function CreateContactDialog({
  contacts,
  onClose,
  onSave,
}: {
  contacts: Contact[]
  onClose: () => void
  onSave: (contact: Contact) => void
}) {
  const owners = [...new Set(contacts.map((contact) => contact.owner))].sort()
  if (!owners.length) owners.push('Alex Carter', 'Riley Hart', 'Sam Kim')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [owner, setOwner] = useState(owners[0])
  const [labels, setLabels] = useState('')
  const [stage, setStage] = useState<Stage>('Lead')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    nameRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, select, textarea',
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Name is required.')
      nameRef.current?.focus()
      return
    }
    const newContact: Contact = {
      id: crypto.randomUUID(),
      name: trimmedName,
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(company.trim() ? { company: company.trim() } : {}),
      ...(role.trim() ? { role: role.trim() } : {}),
      owner,
      labels: [
        ...new Set(
          labels
            .split(',')
            .map((label) => label.trim())
            .filter(Boolean),
        ),
      ],
      stage,
      notes: notes.trim(),
      color: colors[contacts.length % colors.length],
    }
    onSave(newContact)
  }

  return (
    <div className="modal-layer">
      <div className="modal-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className="create-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-title"
        aria-describedby="create-description"
      >
        <div className="create-header">
          <div>
            <span className="panel-kicker">NEW RELATIONSHIP</span>
            <h2 id="create-title">Add a contact</h2>
            <p id="create-description">
              Keep the details you know. Add the rest later.
            </p>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close new contact form"
          >
            <X size={19} />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="create-fields">
            <label className="create-field create-field--full">
              Name <span>Required</span>
              <input
                ref={nameRef}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setError('')
                }}
                placeholder="e.g. Avery Morgan"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'name-error' : undefined}
              />
              {error ? (
                <small id="name-error" className="field-error">
                  {error}
                </small>
              ) : null}
            </label>
            <label className="create-field">
              Email{' '}
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="avery@company.com"
              />
            </label>
            <label className="create-field">
              Company{' '}
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Company name"
              />
            </label>
            <label className="create-field">
              Role{' '}
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Role or title"
              />
            </label>
            <label className="create-field">
              Owner{' '}
              <select
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
              >
                {owners.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="create-field">
              Stage{' '}
              <select
                value={stage}
                onChange={(event) => setStage(event.target.value as Stage)}
              >
                {stages.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="create-field">
              Labels{' '}
              <input
                value={labels}
                onChange={(event) => setLabels(event.target.value)}
                placeholder="Separate with commas"
              />
            </label>
            <label className="create-field create-field--full">
              Notes{' '}
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="A little context for next time..."
                rows={3}
              />
            </label>
          </div>
          <div className="create-footer">
            <span>Saved in this browser</span>
            <div>
              <button
                type="button"
                className="button button--secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="button button--primary">
                <Plus size={15} /> Add contact
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
