import { tryOnCleanup, tryOnMount } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

export interface UseBroadcastChannelOptions extends ConfigurableWindow {
  /**
   * The name of the channel.
   */
  name: string
}

/**
 * Reactive BroadcastChannel.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useBroadcastChannel
 */
export const useBroadcastChannel = <D, P>(options: UseBroadcastChannelOptions): UseBroadcastChannelReturn<D, P> => {
  const { name, window = defaultWindow } = options

  const isSupported = useSupported(() => window && 'BroadcastChannel' in window)
  const [isClosed, setClosed] = createSignal(false)
  const [channel, setChannel] = createSignal<BroadcastChannel | undefined>()
  const [data, setData] = createSignal()
  const [error, setError] = createSignal<Event | null>()

  const post = (data: unknown) => {
    const channelVal = channel()
    if (channelVal) channelVal.postMessage(data)
  }

  const close = () => {
    const channelVal = channel()
    if (channelVal) channelVal.close()
    setClosed(true)
  }

  if (isSupported()) {
    tryOnMount(() => {
      setError(null)
      const channelVal = new BroadcastChannel(name)
      setChannel(() => channelVal)

      channelVal.addEventListener(
        'message',
        (e: MessageEvent) => {
          setData(e.data)
        },
        { passive: true }
      )

      channelVal.addEventListener(
        'messageerror',
        (e: MessageEvent) => {
          setError(e)
        },
        { passive: true }
      )

      channelVal.addEventListener('close', () => {
        setClosed(true)
      })
    })
  }

  tryOnCleanup(() => {
    close()
  })

  return {
    isSupported,
    channel,
    data: data as Accessor<D>,
    post,
    close,
    error,
    isClosed
  }
}

export interface UseBroadcastChannelReturn<D, P> {
  isSupported: Accessor<boolean>
  channel: Accessor<BroadcastChannel | undefined>
  data: Accessor<D>
  post: (data: P) => void
  close: () => void
  error: Accessor<Event | null | undefined>
  isClosed: Accessor<boolean>
}
