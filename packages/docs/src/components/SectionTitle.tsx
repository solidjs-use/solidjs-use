import { Heading } from '@hope-ui/solid'
import type { HTMLHopeProps } from '@hope-ui/solid'

export default function SectionTitle(props: HTMLHopeProps<'h2'>) {
  return <Heading as="h2" size="2xl" mb="$4" mt="$8" {...props} />
}
