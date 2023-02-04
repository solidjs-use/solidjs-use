import { Heading } from '@hope-ui/solid'
import type { HTMLHopeProps } from '@hope-ui/solid'

export default function SectionSubtitle(props: HTMLHopeProps<'h3'>) {
  return <Heading as="h3" size="xl" mb="$2" mt="$8" {...props} />
}
