import { Heading } from '@hope-ui/solid'
import type { HTMLHopeProps } from '@hope-ui/solid'

export default function DetailTitle(props: HTMLHopeProps<'h4'>) {
  return <Heading as="h4" size="lg" mb="$2" mt="$6" {...props} />
}
