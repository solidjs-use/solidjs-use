import { nextTick } from '@solidjs-use/solid-to-vue'
import { getOwner, onMount } from 'solid-js'
import type { Fn } from '../utils'

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
export function tryOnMount(fn: Fn, sync = true) {
  if (getOwner()) onMount(fn)
  else if (sync) fn()
  else nextTick(fn)
}
