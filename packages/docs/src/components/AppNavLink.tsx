import { Badge, hope } from '@hope-ui/solid'
import { NavLink } from '@solidjs/router'
import { Show, splitProps } from 'solid-js'
import type { ComponentProps } from 'solid-js'

const StyledNavLink = hope(NavLink, {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '$full',
    height: '$8',
    rounded: '$sm',
    bg: 'transparent',
    px: '$3',
    color: '$neutral12',
    fontSize: '$sm',
    lineHeight: '$none',
    textDecoration: 'none',
    transition: 'color 250ms, background-color 250ms',

    _hover: {
      bg: '$neutral4'
    },

    _activeLink: {
      bg: '$primary4',
      color: '$primary11',
      fontWeight: '$medium'
    }
  }
})

type AppNavLinkProps = ComponentProps<typeof StyledNavLink> & {
  isNew?: boolean
}

export default function AppNavLink(props: AppNavLinkProps) {
  const [local, others] = splitProps(props, ['children', 'href', 'isNew'])

  return (
    <StyledNavLink href={local.href} {...others}>
      {local.children}
      <Show when={local.isNew}>
        <Badge colorScheme="accent" ml="$1_5">
          new
        </Badge>
      </Show>
    </StyledNavLink>
  )
}
