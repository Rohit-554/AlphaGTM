export const stages = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const
export type Stage = (typeof stages)[number]

export type Contact = {
  id: string
  name: string
  email?: string
  company?: string
  role?: string
  owner: string
  labels: string[]
  stage: Stage
  notes: string
  color: string
}

export const initialContacts: Contact[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    email: 'maya@northstar.co',
    company: 'Northstar',
    role: 'VP, Partnerships',
    owner: 'Alex Carter',
    labels: ['Partner', 'Priority'],
    stage: 'Qualified',
    notes:
      'Met at the Future of Work summit. Interested in exploring a pilot with their partnerships team.',
    color: 'peach',
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    email: 'jordan@fable.studio',
    company: 'Fable Studio',
    role: 'Founder',
    owner: 'Riley Hart',
    labels: ['Founder'],
    stage: 'Lead',
    notes: 'Introduced by Sam. Follow up after their new product launch.',
    color: 'lavender',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    email: 'priya@meridian.io',
    company: 'Meridian',
    role: 'Head of Product',
    owner: 'Alex Carter',
    labels: ['Warm intro'],
    stage: 'Prospect',
    notes:
      'Looking for a better way to track strategic relationships across teams.',
    color: 'mint',
  },
  {
    id: 'ethan-brooks',
    name: 'Ethan Brooks',
    email: 'ethan@atlasworks.com',
    company: 'Atlas Works',
    role: 'Design Director',
    owner: 'Sam Kim',
    labels: ['Design'],
    stage: 'Qualified',
    notes:
      'Great first call. Send over the product walkthrough and sample workspace.',
    color: 'blue',
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    email: 'amara@solstice.team',
    company: 'Solstice',
    role: 'COO',
    owner: 'Riley Hart',
    labels: ['Priority'],
    stage: 'Lead',
    notes: '',
    color: 'rose',
  },
  {
    id: 'noah-williams',
    name: 'Noah Williams',
    email: 'noah@forma.co',
    company: 'Forma',
    role: 'Growth Lead',
    owner: 'Sam Kim',
    labels: [],
    stage: 'Prospect',
    notes: 'Requested a short summary of the team workflow.',
    color: 'sand',
  },
  {
    id: 'sofia-ramirez',
    name: 'Sofia Ramirez',
    email: 'sofia@bloom.co',
    company: 'Bloom',
    role: 'VP, Marketing',
    owner: 'Alex Carter',
    labels: ['Warm intro'],
    stage: 'Lead',
    notes: 'Connected through a mutual colleague.',
    color: 'lilac',
  },
  {
    id: 'liam-patel',
    name: 'Liam Patel',
    email: 'liam@argo.dev',
    company: 'Argo',
    role: 'Product Lead',
    owner: 'Riley Hart',
    labels: ['Product'],
    stage: 'Prospect',
    notes: '',
    color: 'sky',
  },
  {
    id: 'isabel-torres',
    name: 'Isabel Torres',
    email: 'isabel@morrow.design',
    company: 'Morrow',
    role: 'Founder',
    owner: 'Sam Kim',
    labels: ['Founder', 'Priority'],
    stage: 'Qualified',
    notes:
      'Interested in bringing the whole studio into one shared contact workflow.',
    color: 'apricot',
  },
  {
    id: 'oliver-grant',
    name: 'Oliver Grant',
    company: 'Kinetic',
    owner: 'Alex Carter',
    labels: [],
    stage: 'Lead',
    notes:
      'Met briefly at a local founder meetup. Still need an email address and role.',
    color: 'sage',
  },
]

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

export function ownerInitials(name: string) {
  return initials(name)
}
