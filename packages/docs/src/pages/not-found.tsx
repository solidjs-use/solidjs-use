import { Button, Center, Divider, Flex, Stack, Text, VStack } from '@hope-ui/solid'
import { Link } from '@solidjs/router'

import Header from '../components/Header'

export default function NotFound () {
  return (
    <VStack alignItems="stretch">
      <Header />
      <Center minH="calc(100vh - 72px)">
        <Stack direction={{ '@initial': 'column', '@md': 'row' }} alignItems="flex-start" mx="auto">
          <Text size={{ '@initial': '3xl', '@sm': '4xl', '@md': '7xl' }} fontWeight="$extrabold" color="$primary9">
            404
          </Text>
          <Divider d={{ '@initial': 'none', '@md': 'inline-block' }} orientation="vertical" h="115px" mx="$8" />
          <Flex direction="column" alignItems="flex-start">
            <Text
              size={{ '@initial': '4xl', '@sm': '6xl', '@md': '7xl' }}
              fontSize={{ '@md': '$7xl' }}
              fontWeight="$extrabold"
              mb="$2"
            >
              Page not found
            </Text>
            <Text size={{ '@initial': 'sm', '@sm': 'base', '@md': 'lg' }} color="$neutral11" ml="$0_5" mb="$4">
              Please check the URL in the address bar an try again.
            </Text>
            <Button as={Link} href="/">
              Back to home
            </Button>
          </Flex>
        </Stack>
      </Center>
    </VStack>
  )
}
