export type NavItem = {
  href: string
  label: string
}

export const navItems: readonly NavItem[] = [
  { href: '/', label: 'Booster' },
  { href: '/uslugi', label: 'Usługi' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/kontakt', label: 'Kontakt' },
] as const
