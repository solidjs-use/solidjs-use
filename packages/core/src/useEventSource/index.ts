import { tryOnCleanup } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'

export type UseEventSourceOptions = EventSourceInit

/**
 * Reactive wrapper for EventSource.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useEventSource
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource EventSource
 */
export function useEventSource(url: string | URL, events: string[] = [], options: UseEventSourceOptions = {}) {
  const [event, setEvent] = createSignal<string | null>(null)
  const [data, setData] = createSignal<string | null>(null)
  const [status, setState] = createSignal<'OPEN' | 'CONNECTING' | 'CLOSED'>('CONNECTING')
  const [eventSource, setEventSource] = createSignal<EventSource | null>(null)
  const [error, setError] = createSignal<Event | null>(null)

  const { withCredentials = false } = options

  const close = () => {
    const eventSourceValue = eventSource()
    if (eventSourceValue) {
      eventSourceValue.close()
      setEventSource(null)
      setState('CLOSED')
    }
  }

  const es = new EventSource(url, { withCredentials })

  setEventSource(es)

  es.onopen = () => {
    setState('OPEN')
    setError(null)
  }

  es.onerror = e => {
    setState('CLOSED')
    setError(e)
  }

  es.onmessage = (e: MessageEvent) => {
    setEvent(null)
    setData(e.data)
  }

  for (const eventName of events) {
    useEventListener(es, eventName, (e: Event & { data?: string }) => {
      setEvent(eventName)
      setData(e.data ?? null)
    })
  }

  tryOnCleanup(() => {
    close()
  })

  return {
    eventSource,
    event,
    data,
    status,
    error,
    close
  }
}

export type UseEventSourceReturn = ReturnType<typeof useEventSource>
