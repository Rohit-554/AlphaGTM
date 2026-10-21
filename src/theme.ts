export type Theme = 'light' | 'dark'

const themeKey = 'kinship.theme.v1'

export function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#111b17' : '#f5f7f4')
  try {
    localStorage.setItem(themeKey, theme)
  } catch {
    // The switch still works for this page when storage is unavailable.
  }
}
