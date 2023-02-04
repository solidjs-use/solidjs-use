import { Box } from '@hope-ui/solid'
import { mergeProps, splitProps, onMount } from 'solid-js'
import Prism from 'prismjs'
import type { ParentProps } from 'solid-js'
import type { HTMLHopeProps } from '@hope-ui/solid'

export interface CodeSnippetProps extends HTMLHopeProps<'div'> {
  snippet?: string
  lang?: 'bash' | 'js' | 'tsx' | 'html' | 'css'
}

export default function CodeSnippet(props: ParentProps<CodeSnippetProps>) {
  const propsWithDefault = mergeProps({ lang: 'tsx' }, props)
  const [local, others] = splitProps(propsWithDefault, ['snippet', 'lang'])
  onMount(() => {
    Prism.highlightAll()
  })

  return (
    <Box borderRadius="$2xl" overflow="hidden" position="relative" fontSize="$sm" w="$full" {...others}>
      <pre class="line-numbers">
        <code class={`language-${local.lang}`}>{local.snippet ?? props.children}</code>
      </pre>
    </Box>
  )
}
