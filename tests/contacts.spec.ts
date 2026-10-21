import { expect, test } from '@playwright/test'
import { initialContacts, stages } from '../src/data'

test('seed data uses unique IDs and valid stages', () => {
  expect(initialContacts).toHaveLength(10)
  expect(new Set(initialContacts.map((contact) => contact.id)).size).toBe(10)
  expect(
    initialContacts.every((contact) => stages.includes(contact.stage)),
  ).toBe(true)
  expect(
    initialContacts.some(
      (contact) =>
        !contact.email ||
        !contact.role ||
        !contact.labels.length ||
        !contact.notes,
    ),
  ).toBe(true)
  expect(initialContacts.some((contact) => contact.stage === 'Customer')).toBe(
    false,
  )
})

test('table and board show the same contacts, including an empty group', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.contacts-table tbody tr')).toHaveCount(10)
  await page.getByRole('button', { name: 'Board' }).click()
  await expect(page.locator('.contact-card')).toHaveCount(10)
  await expect(page.getByRole('heading', { name: 'Customer' })).toBeVisible()
  await expect(page.getByText('No contacts yet')).toBeVisible()
  await page.getByRole('button', { name: 'Table' }).click()
  await expect(page.locator('.contacts-table tbody tr')).toHaveCount(10)
})

test('stage and notes save across views; cancel and Escape discard drafts', async ({
  page,
}) => {
  await page.goto('/')
  const maya = page.locator('[data-contact-id="maya-chen"]')
  await maya.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.locator('#contact-stage')).toBeFocused()
  await page.locator('#contact-stage').selectOption('Customer')
  await page.locator('#contact-notes').fill('Pilot confirmed for next month.')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(maya).toBeFocused()
  await expect(
    page.locator('.contacts-table tr').filter({ hasText: 'Maya Chen' }),
  ).toContainText('Customer')

  await page.getByRole('button', { name: 'Board' }).click()
  await expect(page.locator('.contact-card')).toHaveCount(10)
  const customer = page
    .getByRole('region', { name: 'Contacts board' })
    .getByRole('button', { name: /Maya Chen/ })
  await expect(customer).toBeVisible()
  await customer.click()
  await expect(page.locator('#contact-notes')).toHaveValue(
    'Pilot confirmed for next month.',
  )
  await page.locator('#contact-stage').selectOption('Lead')
  await page.locator('#contact-notes').fill('This should be discarded.')
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByRole('button', { name: 'Board' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await customer.click()
  await expect(page.locator('#contact-stage')).toHaveValue('Customer')
  await expect(page.locator('#contact-notes')).toHaveValue(
    'Pilot confirmed for next month.',
  )
  await page.keyboard.press('Escape')
  await expect(customer).toBeFocused()
  await customer.click()
  await page.locator('#contact-notes').fill('Second saved update.')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await page.getByRole('button', { name: 'Table' }).click()
  await maya.click()
  await expect(page.locator('#contact-notes')).toHaveValue(
    'Second saved update.',
  )
})

test('board stays reachable at a narrower desktop width', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 780 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Board' }).click()
  const board = page.getByRole('region', { name: 'Contacts board' })
  await expect(board).toBeVisible()
  const dimensions = await board.evaluate((element) => ({
    client: element.clientWidth,
    scroll: element.scrollWidth,
  }))
  expect(dimensions.scroll).toBeGreaterThan(dimensions.client)
  await board.evaluate((element) => {
    element.scrollLeft = element.scrollWidth
  })
  await expect(page.getByRole('heading', { name: 'Customer' })).toBeInViewport()
})

test('moving a card restores focus to its new board position', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Board' }).click()
  const card = page.locator('[data-contact-id="jordan-lee"]')
  await card.click()
  await page.locator('#contact-stage').selectOption('Customer')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(card).toBeFocused()
  await expect(
    page
      .getByRole('heading', { name: 'Customer' })
      .locator('..')
      .locator('.column-count'),
  ).toHaveText('1')
  await expect(page.locator('.contact-card')).toHaveCount(10)
})

test('search, combined filters, and Insights share one visible set', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('searchbox', { name: 'Search contacts' })
    .fill('northstar')
  await expect(page.locator('.contacts-table tbody tr')).toHaveCount(1)
  await expect(page.locator('.contacts-table tbody')).toContainText('Maya Chen')
  await page.getByRole('button', { name: 'Board' }).click()
  await expect(page.locator('.contact-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Insights' }).click()
  await expect(
    page.getByRole('region', { name: 'Contact insights' }),
  ).toContainText('Maya Chen')
  await page
    .getByRole('region', { name: 'Contact insights' })
    .getByRole('button', { name: /Maya Chen/ })
    .click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close details' }).click()
  await expect(page.getByRole('button', { name: 'Insights' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  await page.getByRole('button', { name: 'Clear' }).click()
  await page
    .getByRole('combobox', { name: 'Filter by stage' })
    .selectOption('Lead')
  await page
    .getByRole('combobox', { name: 'Filter by owner' })
    .selectOption('Alex Carter')
  await page
    .getByRole('combobox', { name: 'Filter by label' })
    .selectOption('Warm intro')
  await expect(
    page
      .getByRole('region', { name: 'Contact insights' })
      .locator('.insights-contact-list button'),
  ).toHaveCount(1)
  await expect(
    page.getByRole('region', { name: 'Contact insights' }),
  ).toContainText('Sofia Ramirez')
  await page.getByRole('button', { name: 'Table' }).click()
  await expect(page.locator('.contacts-table tbody tr')).toHaveCount(1)
  await page.getByRole('button', { name: 'Board' }).click()
  await expect(page.locator('.contact-card')).toHaveCount(1)
})

test('empty search results offer a clear recovery action', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('searchbox', { name: 'Search contacts' })
    .fill('nothing-matches-this')
  await expect(page.getByRole('status')).toContainText('No contacts found')
  await page.getByRole('button', { name: 'Board' }).click()
  await expect(page.getByRole('status')).toContainText('No contacts found')
  await page.getByRole('button', { name: 'Clear search and filters' }).click()
  await expect(page.locator('.contact-card')).toHaveCount(10)
})
