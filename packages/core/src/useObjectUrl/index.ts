import { resolveAccessor } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export type UseObjectUrlReturn = Accessor<string | undefined>

type ObjectType = Blob | MediaSource | undefined
export interface UseObjectUrlOptions {
  object: MaybeAccessor<ObjectType>
}

/**
 * Reactive URL representing an object.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useObjectUrl
 */
export function useObjectUrl(object: UseObjectUrlOptions['object']): UseObjectUrlReturn {
  const [url, setUrl] = createSignal<string | undefined>('')

  const release = () => {
    const urlVal = url()
    if (urlVal) {
      URL.revokeObjectURL(urlVal)
    }
    setUrl(undefined)
  }
  createEffect(
    on(resolveAccessor(object), newObject => {
      release()

      if (newObject) {
        setUrl(URL.createObjectURL(newObject))
      }
    })
  )

  return url
}
