import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  hope,
  HStack,
  IconButton,
  Tag,
  Text,
  useColorMode,
  useColorModeValue
} from '@hope-ui/solid'
import { Link } from 'solid-app-router'
import { createEffect, createSignal } from 'solid-js'

import { IconGithub } from '../icons/IconGithub'
import { IconMenu } from '../icons/IconMenu'
import { IconMoon } from '../icons/IconMoon'
import { IconSun } from '../icons/IconSun'

import MainNavContent from './MainNavContent'

export default function Header() {
  const [isMainNavOverlayVisible, setIsMainNavOverlayVisible] = createSignal(false)

  const { toggleColorMode, colorMode } = useColorMode()
  const headerShadow = useColorModeValue('$sm', '$none')

  const toggleMainNavOverlay = () => {
    setIsMainNavOverlayVisible(prev => !prev)
  }

  const onNavKeyup = (event: KeyboardEvent) => {
    if (isMainNavOverlayVisible() && event.key === 'Enter') {
      setIsMainNavOverlayVisible(false)
    }
  }

  createEffect(() => {
    document.documentElement.className = colorMode()
  })

  return (
    <Box
      as="header"
      position="sticky"
      left="0"
      right="0"
      top={0}
      zIndex="$sticky"
      height="72px"
      flexShrink={0}
      shadow={headerShadow()}
    >
      <Container h="$full">
        <HStack h="$full" px="$4" justifyContent="space-between">
          <HStack spacing="$2">
            <IconButton
              display={{ '@lg': 'none' }}
              aria-label="Open main navigation"
              variant="ghost"
              colorScheme="neutral"
              size="sm"
              rounded="$md"
              fontSize="$lg"
              icon={<IconMenu />}
              onClick={toggleMainNavOverlay}
            />
            <Text as={Link} href="/" textDecoration="none" letterSpacing="$wide" fontSize="$2xl">
              <hope.span color="$primary9" fontWeight="$bold">
                SolidJS-USE
              </hope.span>
            </Text>
            <Tag size="sm" rounded="$sm" fontWeight="$semibold">
              beta
            </Tag>
          </HStack>
          <HStack spacing="$2">
            <Text
              as={Link}
              target="_blank"
              href="https://solidjs-use.github.io/solidjs-use-playground/"
              textDecoration="none"
              letterSpacing="$wide"
            >
              Playground
            </Text>
            <IconButton
              as="a"
              href="https://github.com/solidjs-use/solidjs-use"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to the github repository"
              variant="ghost"
              colorScheme="neutral"
              size="sm"
              rounded="$md"
              fontSize="$lg"
              icon={<IconGithub />}
            />
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              colorScheme="neutral"
              size="sm"
              rounded="$md"
              fontSize="$lg"
              icon={
                <>
                  <IconSun class="white-icon" />
                  <IconMoon class="black-icon" />
                </>
              }
              onClick={toggleColorMode}
            />
          </HStack>
        </HStack>
      </Container>
      <Drawer placement="left" opened={isMainNavOverlayVisible()} onClose={() => setIsMainNavOverlayVisible(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontWeight="$bold" fontSize="$2xl">
            SolidJS-USE
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <hope.nav d="flex" flexDirection="column" onKeyUp={onNavKeyup}>
              <MainNavContent />
            </hope.nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
