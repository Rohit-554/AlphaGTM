import {
  ArrowUpRight,
  ContactRound,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { BoardView, DetailsPanel, TableView, View } from './components'
import { initialContacts, Stage } from './data'

function App() {
  const [contacts, setContacts] = useState(initialContacts)
  const [view, setView] = useState<View>('table')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const tableTabRef = useRef<HTMLButtonElement>(null)
  const boardTabRef = useRef<HTMLButtonElement>(null)
  const selectedContact = contacts.find((contact) => contact.id === selectedId)

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
        (view === 'table' ? tableTabRef.current : boardTabRef.current)
      )?.focus()
    })
  }

  const saveContact = (id: string, stage: Stage, notes: string) => {
    setContacts((current) =>
      current.map((contact) =>
        contact.id === id ? { ...contact, stage, notes } : contact,
      ),
    )
    closeContact()
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
                All contacts <span>{contacts.length}</span>
              </h2>
              <p>A home for every conversation and connection.</p>
            </div>
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
            </div>
          </div>
          {view === 'table' ? (
            <TableView contacts={contacts} onOpen={openContact} />
          ) : (
            <BoardView contacts={contacts} onOpen={openContact} />
          )}
          <div className="content-footer">
            <span>
              <span className="footer-dot" />
              Showing {contacts.length} fictional contacts
            </span>
            <span>
              Click a {view === 'table' ? 'row' : 'card'} to view details
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
        />
      ) : null}
    </div>
  )
}

export default App
