/* eslint-disable solid/components-return-once */
import { createMemo, For, Show } from 'solid-js'
import 'unocss'

import { Anchor } from '@hope-ui/solid'
import { Link } from '@solidjs/router'
import { functions } from '../../../../meta'
import { useTimeAgo } from '../../../core/src/useTimeAgo'
import exportSizes from '../data/export-size.json'
import Code from './Code'
import type { Component } from 'solid-js'

export interface FunctionInfoProps {
  fn: string
}

const FunctionInfo: Component<FunctionInfoProps> = props => {
  if (!props.fn) return <div />
  const info = functions.find(i => i.name === props.fn)!
  const lastUpdated = useTimeAgo(new Date(info?.lastUpdated ?? 0))
  const link = createMemo(() => `/solidjs-use/functions#category=${encodeURIComponent(String(info.category))}`)
  const exportSize = (exportSizes as Record<string, string>)[info.name]
  const getFunctionLink = (fn: string) => {
    const info = functions.find(i => i.name === fn)
    return info?.docs?.replace(/https?:\/\/solidjs-use\.github\.io\/solidjs-use\//g, '/solidjs-use/')
  }

  return (
    <>
      <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
        <div opacity="50">Category</div>
        <div>
          <Anchor as={Link} fontWeight="$semibold" href={link()} color="$primary11">
            {info.category}
          </Anchor>
        </div>
        <div opacity="50">Export Size</div>
        <div> {exportSize}</div>
        <Show when={info.package !== 'core' && info.package !== 'shared'}>
          <>
            {' '}
            <div opacity="50">Package</div>
            <div>
              <code>@solidjs-use/{info.package}</code>
            </div>
          </>
        </Show>
        <Show when={!!info.lastUpdated}>
          <>
            {' '}
            <div opacity="50">Last Changed</div>
            <div>{lastUpdated()}</div>
          </>
        </Show>
        <Show when={!!info.alias?.length}>
          <>
            {' '}
            <div opacity="50">Alias</div>
            <div flex="~ gap-1 wrap">
              <For each={info.alias}>{a => <code class="!py-0">{a}</code>}</For>
            </div>
          </>
        </Show>
        <Show when={!!info.related?.length}>
          <>
            {' '}
            <div opacity="50">Related</div>
            <div flex="~ gap-1 wrap">
              <For each={info.related}>
                {name => (
                  <Anchor as={Link} href={getFunctionLink(name)!} color="$primary11">
                    <Code>{name}</Code>
                  </Anchor>
                )}
              </For>
            </div>
          </>
        </Show>
      </div>
    </>
  )
}

export default FunctionInfo
