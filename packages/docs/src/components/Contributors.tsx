import { createMemo, For } from 'solid-js'
// @ts-expect-error
import _contributors from '../../../../../../virtual-contributors'
import type { Component } from 'solid-js'

export interface ContributorInfo {
  name: string
  count: number
  hash: string
}

export const Contributors: Component<{ fn: string }> = props => {
  const contributors = createMemo<ContributorInfo[]>(() => _contributors[props.fn] ?? [])

  return (
    <div class="flex flex-wrap gap-4 pt-2">
      {
        <For each={contributors()}>
          {c => (
            <div class="flex gap-2 items-center">
              <img src={`https://gravatar.com/avatar/${c.hash}?d=retro`} class="w-8 h-8 rounded-full" />
              {c.name}
            </div>
          )}
        </For>
      }
    </div>
  )
}
