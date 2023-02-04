import { tryOnCleanup } from 'solidjs-use'
import type { Unsubscribable } from 'rxjs'

export function useSubscription(subscription: Unsubscribable) {
  tryOnCleanup(() => {
    subscription.unsubscribe()
  })
}
