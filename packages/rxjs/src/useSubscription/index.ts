import { tryOnCleanup } from 'solidjs-use'
import type { Unsubscribable } from 'rxjs'

/**
 * Use an RxJS Subscription without worrying about unsubscribing from it or creating memory leaks.
 *
 * @see https://solidjs-use.github.io/solidjs-use/rxjs/useSubscription
 * @see https://rxjs.dev/guide/subscription
 */
export function useSubscription(subscription: Unsubscribable) {
  tryOnCleanup(() => {
    subscription.unsubscribe()
  })
}
