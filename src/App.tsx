import {
  ArrowUpRight,
  BarChart3,
  ContactRound,
  LayoutGrid,
  List,
  Plus,
  Sparkles,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BoardView, DetailsPanel, TableView, View } from './components'
import { Contact, Stage } from './data'
import { CreateContactDialog } from './contactManagement'
import {
  DiscoveryControls,
  DiscoveryFilters,
  filterContacts,
  InsightsView,
  NoContacts,
  NoMatches,
} from './discovery'
import { loadContacts, saveContacts } from './storage'

const emptyFilters: DiscoveryFilters = {
  query: '',
  stage: '',
  owner: '',
  label: '',
}

type LastMove = { id: string; name: string; from: Stage; to: Stage }

function App() {
  const [contacts, setContacts] = useState(loadContacts)
  const [view, setView] = useState<View>('table')
  const [filters, setFilters] = useState<DiscoveryFilters>(emptyFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [lastMove, setLastMove] = useState<LastMove | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const createButtonRef = useRef<HTMLButtonElement>(null)
  const tableTabRef = useRef<HTMLButtonElement>(null)
  const boardTabRef = useRef<HTMLButtonElement>(null)
  const insightsTabRef = useRef<HTMLButtonElement>(null)
  const selectedContact = contacts.find((contact) => contact.id === selectedId)
  const visibleContacts = useMemo(
    () => filterContacts(contacts, filters),
    [contacts, filters],
  )
  const filtered = Object.values(filters).some(Boolean)

  useEffect(() => saveContacts(contacts), [contacts])
  useEffect(() => {
    if (!lastMove) return
    const timer = window.setTimeout(() => setLastMove(null), 8000)
    return () => window.clearTimeout(timer)
  }, [lastMove])

  const openContact = (id: string, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setSelectedId(id)
  }

  const closeContact = () => {
    const id = selectedId
    setSelectedId(null)
    requestAnimationFrame(() => {
      const original = triggerRef.current
      if (original?.isConnected) {
        original.focus()
        return
      }
      const movedCard = id
        ? document.querySelector<HTMLElement>(`[data-contact-id="${id}"]`)
        : null
      ;(
        movedCard ??
        (view === 'table'
          ? tableTabRef.current
          : view === 'board'
            ? boardTabRef.current
            : insightsTabRef.current)
      )?.focus()
    })
  }

  const saveContact = (id: string, stage: Stage, notes: string) => {
    setLastMove(null)
    setContacts((current) =>
      current.map((contact) =>
        contact.id === id ? { ...contact, stage, notes } : contact,
      ),
    )
    closeContact()
  }

  const closeCreate = () => {
    setCreating(false)
    requestAnimationFrame(() => createButtonRef.current?.focus())
  }

  const addContact = (contact: Contact) => {
    setLastMove(null)
    setContacts((current) => [...current, contact])
    setFilters(emptyFilters)
    setCreating(false)
    triggerRef.current = createButtonRef.current
    setSelectedId(contact.id)
  }

  const deleteContact = (id: string) => {
    setLastMove(null)
    setContacts((current) => current.filter((contact) => contact.id !== id))
    closeContact()
  }

  const moveContact = (id: string, to: Stage) => {
    const contact = contacts.find((person) => person.id === id)
    if (!contact || contact.stage === to) return
    setContacts((current) =>
      current.map((person) =>
        person.id === id ? { ...person, stage: to } : person,
      ),
    )
    setLastMove({ id, name: contact.name, from: contact.stage, to })
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-contact-id="${id}"]`)?.focus(),
    )
  }

  const undoMove = () => {
    if (!lastMove) return
    setContacts((current) =>
      current.map((contact) =>
        contact.id === lastMove.id && contact.stage === lastMove.to
          ? { ...contact, stage: lastMove.from }
          : contact,
      ),
    )
    setLastMove(null)
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>(`[data-contact-id="${lastMove.id}"]`)
        ?.focus(),
    )
  }

  const counts = {
    lead: contacts.filter((contact) => contact.stage === 'Lead').length,
    prospect: contacts.filter((contact) => contact.stage === 'Prospect').length,
    qualified: contacts.filter((contact) => contact.stage === 'Qualified')
      .length,
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>
            kinship<span className="brand-dot">.</span>
          </span>
        </div>
        <div className="topbar-right">
          <span className="demo-badge">
            <span />
            Demo workspace
          </span>
          <span className="topbar-divider" />
          <span className="profile-avatar" aria-label="Rohit profile">
            R
          </span>
        </div>
      </header>

      <main className="workspace">
        <div className="breadcrumb">
          <span>Workspace</span>
          <span className="breadcrumb-slash">/</span>
          <span>Contacts</span>
        </div>
        <section className="page-heading">
          <div>
            <div className="eyebrow">
              <ContactRound size={14} /> RELATIONSHIP HUB
            </div>
            <h1>
              Contacts<span className="heading-period">.</span>
            </h1>
            <p>Every relationship, one clear view.</p>
          </div>
          <div className="heading-art" aria-hidden="true">
            <div className="art-circle art-circle--one" />
            <div className="art-circle art-circle--two" />
            <div className="art-circle art-circle--three" />
            <div className="art-spark">
              <Sparkles size={19} />
            </div>
          </div>
        </section>

        <section className="overview" aria-label="Contact overview">
          <div className="overview-main">
            <span className="overview-icon">
              <ContactRound size={20} strokeWidth={1.7} />
            </span>
            <div>
              <span className="overview-label">TOTAL CONTACTS</span>
              <strong>{contacts.length}</strong>
            </div>
            <span className="overview-caption">
              People in your workspace <ArrowUpRight size={14} />
            </span>
          </div>
          <div className="overview-stage">
            <span className="overview-marker overview-marker--lead" />
            <span>Leads</span>
            <strong>{counts.lead}</strong>
          </div>
          <div className="overview-stage">
            <span className="overview-marker overview-marker--prospect" />
            <span>Prospects</span>
            <strong>{counts.prospect}</strong>
          </div>
          <div className="overview-stage">
            <span className="overview-marker overview-marker--qualified" />
            <span>Qualified</span>
            <strong>{counts.qualified}</strong>
          </div>
        </section>

        <section className="content-panel" aria-label="Contacts workspace">
          <div className="content-toolbar">
            <div>
              <h2>
                All contacts{' '}
                <span>
                  {filtered
                    ? `${visibleContacts.length} / ${contacts.length}`
                    : contacts.length}
                </span>
              </h2>
              <p>A home for every conversation and connection.</p>
            </div>
            <div className="toolbar-actions">
              <button
                ref={createButtonRef}
                className="button button--primary add-contact"
                type="button"
                onClick={() => setCreating(true)}
              >
                <Plus size={15} /> Add contact
              </button>
              <div
                className="view-switch"
                role="group"
                aria-label="View contacts as"
              >
                <button
                  ref={tableTabRef}
                  type="button"
                  className={
                    view === 'table'
                      ? 'view-button view-button--active'
                      : 'view-button'
                  }
                  aria-pressed={view === 'table'}
                  onClick={() => setView('table')}
                >
                  <List size={16} /> Table
                </button>
                <button
                  ref={boardTabRef}
                  type="button"
                  className={
                    view === 'board'
                      ? 'view-button view-button--active'
                      : 'view-button'
                  }
                  aria-pressed={view === 'board'}
                  onClick={() => setView('board')}
                >
                  <LayoutGrid size={16} /> Board
                </button>
                <button
                  ref={insightsTabRef}
                  type="button"
                  className={
                    view === 'insights'
                      ? 'view-button view-button--active'
                      : 'view-button'
                  }
                  aria-pressed={view === 'insights'}
                  onClick={() => setView('insights')}
                >
                  <BarChart3 size={16} /> Insights
                </button>
              </div>
            </div>
          </div>
          <DiscoveryControls
            contacts={contacts}
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(emptyFilters)}
          />
          {contacts.length === 0 ? (
            <NoContacts onAdd={() => setCreating(true)} />
          ) : filtered && visibleContacts.length === 0 ? (
            <NoMatches onClear={() => setFilters(emptyFilters)} />
          ) : view === 'table' ? (
            <TableView contacts={visibleContacts} onOpen={openContact} />
          ) : view === 'board' ? (
            <BoardView
              contacts={visibleContacts}
              onOpen={openContact}
              onMove={moveContact}
              filtered={filtered}
            />
          ) : (
            <InsightsView contacts={visibleContacts} onOpen={openContact} />
          )}
          <div className="content-footer">
            <span>
              <span className="footer-dot" />
              Showing {visibleContacts.length} of {contacts.length} fictional
              contacts
            </span>
            <span>
              Click a{' '}
              {view === 'table' ? 'row' : view === 'board' ? 'card' : 'contact'}{' '}
              to view details
            </span>
          </div>
        </section>
        <footer className="page-footer">
          Built as a contact workspace concept <span>✳</span> Explore, edit, and
          stay in sync.
        </footer>
      </main>
      {selectedContact ? (
        <DetailsPanel
          key={selectedContact.id}
          contact={selectedContact}
          onClose={closeContact}
          onSave={saveContact}
          onDelete={deleteContact}
        />
      ) : null}
      {creating ? (
        <CreateContactDialog
          contacts={contacts}
          onClose={closeCreate}
          onSave={addContact}
        />
      ) : null}
      {lastMove ? (
        <div className="undo-toast" role="status" aria-live="polite">
          <span>
            {lastMove.name} moved to {lastMove.to}
          </span>
          <button type="button" onClick={undoMove}>
            Undo
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default App
