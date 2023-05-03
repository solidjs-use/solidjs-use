// @ts-nocheck

import { Anchor, Box, Heading, VStack } from '@hope-ui/solid'
import { useLocation } from '@solidjs/router'
import { For, onMount, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { HTMLHopeProps } from '@hope-ui/solid'

export interface ContextualNavLink {
  href: string
  label: string
  indent?: boolean
}

export type ContextualNavProps = HTMLHopeProps<'div', { links?: ContextualNavLink[] }>

export default function ContextualNav(props: ContextualNavProps) {
  const [local, others] = splitProps(props, ['links', 'children'])

  const location = useLocation()

  const isActiveLink = (href: string) => {
    return location.hash === href.replace('#', '')
  }

  const mountData = () => (
    <Portal mount={document.getElementById('aside-container')}>
      <Box
        as="nav"
        overflowY="auto"
        display={{
          '@initial': 'none',
          '@xl': 'block'
        }}
        flexShrink="0"
        maxW="$60"
        height="calc(100vh - 72px)"
        p="$6"
        {...others}
      >
        <Heading as="h3" mb="$3">
          On this page
        </Heading>
        <VStack alignItems="flex-start" spacing="$2">
          <For each={local.links}>
            {link => (
              <Anchor
                fontSize="$sm"
                href={link.href}
                fontWeight={isActiveLink(link.href) ? '$semibold' : '$normal'}
                ml={link.indent ? '$3' : 0}
              >
                {link.label}
              </Anchor>
            )}
          </For>
        </VStack>
      </Box>
    </Portal>
  )
  onMount(() => {
    if (local.links?.length) {
      mountData()
    }
  })

  return null
}
