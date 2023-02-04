import { Box, Flex, HStack, Stack, Text, VStack } from '@hope-ui/solid'
import { Link } from 'solid-app-router'
import { Show, splitProps } from 'solid-js'

import { IconArrowLeft } from '../icons/IconArrowLeft'
import { IconArrowRight } from '../icons/IconArrowRight'

import Footer from './Footer'
import type { ContextualNavLink } from './ContextualNav'
import type { HTMLHopeProps } from '@hope-ui/solid'

type PageLayoutProps = HTMLHopeProps<
  'div',
  {
    previousLink?: ContextualNavLink
    nextLink?: ContextualNavLink
    contextualNavLinks?: ContextualNavLink[]
  }
>

export default function PageLayout(props: PageLayoutProps) {
  const [local, others] = splitProps(props, ['children', 'previousLink', 'nextLink', 'contextualNavLinks'])

  return (
    <Flex h="$full" {...others}>
      <Flex mt="$4" mx="auto" w="$full" maxW="90ch" direction="column">
        <Box w="$full" py="$6" px="$4" flexGrow="1" class="vp-doc">
          {local.children}
        </Box>
        <Stack
          direction={{
            '@initial': 'column',
            '@sm': 'row'
          }}
          rowGap={{
            '@initial': '$4',
            '@sm': 0
          }}
          columnGap={{
            '@initial': 0,
            '@sm': '$4'
          }}
          justifyContent="center"
          alignItems="stretch"
          m="$6"
        >
          <Show when={local.previousLink}>
            <HStack
              as={Link}
              href={local.previousLink?.href ?? ''}
              justifyContent="space-between"
              w="$full"
              textDecoration="none"
              border="1px solid $neutral4"
              rounded="$md"
              p="$4"
              transition="background-color 250ms"
              _hover={{
                borderColor: '$neutral5',
                bg: '$neutral2'
              }}
            >
              <IconArrowLeft boxSize="$6" />
              <VStack alignItems="flex-end" fontWeight="$normal">
                <Text size="sm" color="$neutral11">
                  Previous
                </Text>
                <Text size="lg">{local.previousLink?.label}</Text>
              </VStack>
            </HStack>
          </Show>
          <Show when={local.nextLink}>
            <HStack
              as={Link}
              href={local.nextLink?.href ?? ''}
              justifyContent="space-between"
              w="$full"
              border="1px solid $neutral4"
              rounded="$md"
              p="$4"
              textDecoration="none"
              transition="background-color 250ms"
              _hover={{
                borderColor: '$neutral5',
                bg: '$neutral2'
              }}
            >
              <VStack alignItems="flex-start" fontWeight="$normal">
                <Text size="sm" color="$neutral11">
                  Next
                </Text>
                <Text size="lg">{local.nextLink?.label}</Text>
              </VStack>
              <IconArrowRight boxSize="$6" />
            </HStack>
          </Show>
        </Stack>
        <Footer />
      </Flex>
      <div id="aside-container" />
    </Flex>
  )
}
