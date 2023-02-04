import {
  Box,
  Button,
  Center,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Anchor
} from '@hope-ui/solid'
import { Link } from 'solid-app-router'
import { Portal } from 'solid-js/web'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { IconGithub } from '../icons/IconGithub'
import type { HTMLHopeProps, VStackProps } from '@hope-ui/solid'

function HeroSection(props: VStackProps) {
  return (
    <VStack
      minH="calc(100vh - 72px)"
      maxW="$containerLg"
      mx={{ '@initial': '$4', '@lg': 'auto' }}
      textAlign="center"
      justifyContent="center"
      {...props}
    >
      <Heading
        level="1"
        size={{ '@initial': '4xl', '@sm': '5xl', '@md': '6xl' }}
        fontWeight="$black"
        lineHeight={1.25}
        mb={{ '@initial': '$6', '@sm': '$8', '@md': '$10' }}
      >
        <Text as="span" color="$primary10">
          SolidJS USE
        </Text>
        <p>Collection of SolidJS utilities</p>
      </Heading>
      <Text size={{ '@initial': 'base', '@sm': 'xl' }} color="$neutral11" maxW="$prose" mb="$8">
        solidjs-use is a collection of SolidJS utilities inspired completely by{' '}
        <Anchor color={'$primary10'} href="https://vueuse.org/" external>
          VueUse
        </Anchor>
      </Text>
      <Stack
        direction={{ '@initial': 'column', '@sm': 'row' }}
        spacing="$4"
        justifyContent="center"
        alignItems="center"
        w="$full"
        mb={{ '@initial': '$4', '@sm': 0 }}
      >
        <Button as={Link} href="getting-started" size="xl" rounded="$lg" fullWidth={{ '@initial': true, '@sm': false }}>
          Get Started
        </Button>
        <Button
          as="a"
          target="_blank"
          rel="noopenner noreferrer"
          href="https://github.com/solidjs-use/solidjs-use"
          variant="subtle"
          colorScheme="neutral"
          size="xl"
          rounded="$lg"
          leftIcon={<IconGithub />}
          fullWidth={{ '@initial': true, '@sm': false }}
        >
          Github
        </Button>
      </Stack>
    </VStack>
  )
}

function FeatureSection(props: HTMLHopeProps<'div'>) {
  return (
    <Box minH="calc(100vh - 232px)" bg="$neutral2" {...props}>
      <Container>
        <VStack mx={{ '@initial': '$4', '@xl': 'auto' }} py={{ '@initial': '$10', '@sm': '$20' }}>
          <Heading
            level={2}
            color="$primary9"
            fontSize="$sm"
            fontWeight="$semibold"
            textTransform="uppercase"
            letterSpacing="$wide"
            mb={{ '@initial': '$1', '@sm': '$2' }}
          >
            Iterate fast
          </Heading>
          <Text
            size={{ '@initial': '2xl', '@sm': '3xl', '@md': '4xl' }}
            fontWeight="$black"
            textAlign="center"
            mb={{ '@initial': '$14', '@sm': '$20' }}
          >
            Do it yourself, but not alone.
          </Text>
          <SimpleGrid
            columns={{ '@initial': 1, '@sm': 2, '@lg': 3 }}
            columnGap="$12"
            rowGap={{ '@initial': '$14', '@sm': '$20' }}
            mx="auto"
          >
            <GridItem as={VStack} bg="$neutral3" rounded="$sm" px="$6" pb="$6" maxW="$sm" textAlign="center">
              <Center
                bg="$primary9"
                boxSize="$12"
                rounded="$sm"
                shadow="$md"
                fontSize={'$xl'}
                css={{
                  transform: 'translateY(-50%)'
                }}
              >
                🎛
              </Center>
              <Text fontSize="$lg" fontWeight="$semibold" mt="-8px" mb="$3">
                Feature Rich
              </Text>
              <Text color="$neutral11">300+ functions for you to choose from.</Text>
            </GridItem>
            <GridItem as={VStack} bg="$neutral3" rounded="$sm" px="$6" pb="$6" maxW="$sm" textAlign="center">
              <Center
                bg="$primary9"
                boxSize="$12"
                rounded="$sm"
                shadow="$md"
                fontSize={'$xl'}
                css={{
                  transform: 'translateY(-50%)'
                }}
              >
                ⚡
              </Center>
              <Text fontSize="$lg" fontWeight="$semibold" mt="-8px" mb="$3">
                Fully tree shakeable
              </Text>
              <Text color="$neutral11">Written in TypeScript, with full TS docs.</Text>
            </GridItem>
            <GridItem as={VStack} bg="$neutral3" rounded="$sm" px="$6" pb="$6" maxW="$sm" textAlign="center">
              <Center
                bg="$primary9"
                boxSize="$12"
                rounded="$sm"
                shadow="$md"
                fontSize={'$xl'}
                css={{
                  transform: 'translateY(-50%)'
                }}
              >
                🦾
              </Center>
              <Text fontSize="$lg" fontWeight="$semibold" mt="-8px" mb="$3">
                Type Strong
              </Text>
              <Text color="$neutral11">Written in TypeScript, with full TS docs.</Text>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default function LandingPage() {
  return (
    <VStack alignItems="stretch">
      <Portal>
        <Box position="fixed" top="0" left="0" right="0" zIndex="$banner" />
      </Portal>
      <Header />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </VStack>
  )
}
