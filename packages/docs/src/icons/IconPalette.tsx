import { createIcon } from '@hope-ui/solid'

export const IconPalette = createIcon({
  viewBox: '0 0 24 24',
  path: () => (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M12 21a9 9 0 1 1 0-18a9 8 0 0 1 9 8a4.5 4 0 0 1-4.5 4H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" />
      <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
    </g>
  )
})
