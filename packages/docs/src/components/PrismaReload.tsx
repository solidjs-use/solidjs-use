import Prism from 'prismjs'
import { onMount } from 'solid-js'

export default function PrismaReload () {
  onMount(() => {
    Prism.highlightAll()
  })

  return null
}
