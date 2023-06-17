import { Box } from '@hope-ui/solid'
import { Show, splitProps } from 'solid-js'

import CodeSnippet from './CodeSnippet'
import type { CodeSnippetProps } from './CodeSnippet'

export function Preview (props: CodeSnippetProps) {
  const [local, others] = splitProps(props, ['lang', 'snippet', 'children'])

  return (
    <Box {...others}>
      <Box
        border="1px solid $neutral5"
        p="$4"
        borderTopRadius="$lg"
        borderBottomRadius={local.snippet ? '$none' : '$lg'}
        overflowY="auto"
      >
        {local.children}
      </Box>
      <Show when={local.snippet}>
        <CodeSnippet lang={local.lang} snippet={local.snippet} borderTopRadius="$none" />
      </Show>
    </Box>
  )
}
