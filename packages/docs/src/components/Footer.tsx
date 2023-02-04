import { Center, Text } from '@hope-ui/solid'

export default function Footer() {
  return (
    <Center as="footer" flexDirection="column" h="$40">
      <Text mb="$3">Released under the MIT License.</Text>
      <Text mb="$3">Copyright © 2022-PRESENT dream2023 and solidjs-use contributors</Text>
    </Center>
  )
}
