import { Heading } from '@hope-ui/solid'
import type { HTMLHopeProps } from '@hope-ui/solid'

export default function PageTitle(props: HTMLHopeProps<'h1'>) {
  return <Heading as="h1" size="3xl" fontWeight="$bold" mb="$6" {...props} />
}
