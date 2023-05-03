import { Anchor, Alert, AlertIcon, Text, Table, Thead, Tbody, Tr, Th, Td } from '@hope-ui/solid'
import { Link } from '@solidjs/router'
import { Show } from 'solid-js'
import { paramCase } from 'change-case'
import PageTitle from './PageTitle'
import SectionTitle from './SectionTitle'
import CodeSnippet from './CodeSnippet'
import Code from './Code'
import FunctionInfo from './FunctionInfo'
import { DemoContainer } from './DemoContainer'
import SectionSubtitle from './SectionSubtitle'
import DetailTitle from './DetailTitle'
import ContextualNav from './ContextualNav'
import { RequiresProxy } from './RequiresProxy'

function getTitleId(title: any) {
  if (typeof title === 'string') return title
  if (typeof title === 'function') return title()().innerText
  return title
    .map((item: any) => {
      if (typeof item === 'string') return item
      if (typeof item === 'function') {
        const node = item()
        if (node instanceof HTMLElement) {
          return node.innerText
        }
        if (typeof node === 'function') {
          return node().innerText
        }
      }
      console.log(title)
      throw new Error('parse title error')
    })
    .join('')
    .replace('(', '')
    .replace(')', '')
}

const markdownComponents: any = {
  a: (props: any) => {
    return (
      <Anchor
        as={Link}
        target={
          props.href?.startsWith('http') || props.href.includes('/solidjs-use-playground/') ? '_blank' : undefined
        }
        href={props.href}
        color="$primary11"
      >
        {props.children}
      </Anchor>
    )
  },
  h1: (props: any) => {
    return <PageTitle>{props.children}</PageTitle>
  },
  h2: (props: any) => {
    return <SectionTitle id={paramCase(getTitleId(props.children))}>{props.children}</SectionTitle>
  },
  h3: (props: any) => {
    return <SectionSubtitle id={paramCase(getTitleId(props.children))}>{props.children}</SectionSubtitle>
  },
  h4: (props: any) => {
    return <DetailTitle id={paramCase(getTitleId(props.children))}>{props.children}</DetailTitle>
  },
  p: (props: any) => {
    return (
      <Text mb="$4" mt="$4" lineHeight="lg">
        {props.children}
      </Text>
    )
  },
  code: (props: any) => {
    return (
      <Show when={props['data-language']} fallback={<Code>{props.children}</Code>}>
        <CodeSnippet lang={props['data-language']} mb="$4" mt="$4" lineHeight={28}>
          {props.children}
        </CodeSnippet>
      </Show>
    )
  },
  table: Table,
  thead: Thead,
  tr: Tr,
  td: Td,
  th: Th,
  tbody: Tbody,

  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Alert,
  AlertIcon,
  RequiresProxy,
  FunctionInfo,
  DemoContainer,
  ContextualNav
}

export default markdownComponents
