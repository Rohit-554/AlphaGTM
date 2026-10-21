import { Contact, initialContacts, stages } from './data'

export const CONTACTS_STORAGE_KEY = 'kinship.contacts.v1'

function isContact(value: unknown): value is Contact {
  if (typeof value !== 'object' || value === null) return false
  const contact = value as Record<string, unknown>
  return (
    typeof contact.id === 'string' &&
    contact.id.length > 0 &&
    typeof contact.name === 'string' &&
    contact.name.trim().length > 0 &&
    (contact.email === undefined || typeof contact.email === 'string') &&
    (contact.company === undefined || typeof contact.company === 'string') &&
    (contact.role === undefined || typeof contact.role === 'string') &&
    typeof contact.owner === 'string' &&
    contact.owner.trim().length > 0 &&
    Array.isArray(contact.labels) &&
    contact.labels.every((label) => typeof label === 'string') &&
    stages.includes(contact.stage as Contact['stage']) &&
    typeof contact.notes === 'string' &&
    typeof contact.color === 'string'
  )
}

export function loadContacts(): Contact[] {
  try {
    const raw = window.localStorage.getItem(CONTACTS_STORAGE_KEY)
    if (!raw) return initialContacts
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return initialContacts
    const store = parsed as Record<string, unknown>
    if (store.version !== 1 || !Array.isArray(store.contacts))
      return initialContacts
    if (!store.contacts.every(isContact)) return initialContacts
    const contacts = store.contacts as Contact[]
    if (
      new Set(contacts.map((contact) => contact.id)).size !== contacts.length
    ) {
      return initialContacts
    }
    return contacts
  } catch {
    return initialContacts
  }
}

export function saveContacts(contacts: Contact[]) {
  try {
    window.localStorage.setItem(
      CONTACTS_STORAGE_KEY,
      JSON.stringify({ version: 1, contacts }),
    )
  } catch {
    // Storage can be unavailable in private or locked-down browser sessions.
  }
}
