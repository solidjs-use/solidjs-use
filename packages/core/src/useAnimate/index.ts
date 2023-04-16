import { isObject, nextTick, objectOmit, toValue, tryOnCleanup, tryOnMount } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { toAccessor } from '@solidjs-use/shared/toAccessor'
import { defaultWindow } from '../_configurable'
import { useSupported } from '../useSupported'
import { useEventListener } from '../useEventListener'
import { useRafFn } from '../useRafFn'
import type { WritableComputedReturn } from '@solidjs-use/shared/solid-to-vue'
import type { Accessor, Setter } from 'solid-js'
import type { MaybeAccessor, MaybeElementAccessor, Mutable } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseAnimateOptions extends KeyframeAnimationOptions, ConfigurableWindow {
  /**
   * Will automatically run play when `useAnimate` is used
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Whether to commits the end styling state of an animation to the element being animated
   *
   * @default false
   */
  commitStyles?: boolean
  /**
   * Whether to persists the animation
   *
   * @default false
   */
  persist?: boolean
  /**
   * Executed after animation initialization
   */
  onReady?: (animate: Animation) => void
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
}

export type UseAnimateKeyframes = MaybeAccessor<Keyframe[] | PropertyIndexedKeyframes | null>

export interface UseAnimateReturn {
  isSupported: Accessor<boolean>
  animate: Accessor<Animation | undefined>
  setAnimate: Setter<Animation>
  play: () => void
  pause: () => void
  reverse: () => void
  finish: () => void
  cancel: () => void

  pending: Accessor<boolean>
  playState: Accessor<AnimationPlayState>
  replaceState: Accessor<AnimationReplaceState>
  startTime: WritableComputedReturn<number | null>
  currentTime: WritableComputedReturn<CSSNumberish | null>
  timeline: WritableComputedReturn<AnimationTimeline | null>
  playbackRate: WritableComputedReturn<number>
}

type AnimateStoreKeys = Extract<
  keyof Animation,
  'startTime' | 'currentTime' | 'timeline' | 'playbackRate' | 'pending' | 'playState' | 'replaceState'
>

type AnimateStore = Mutable<Pick<Animation, AnimateStoreKeys>>

/**
 * Reactive Web Animations API
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useAnimate
 */
export function useAnimate(
  target: MaybeElementAccessor,
  keyframes: UseAnimateKeyframes,
  options?: number | UseAnimateOptions
): UseAnimateReturn {
  let config: UseAnimateOptions
  let animateOptions: undefined | number | KeyframeAnimationOptions

  if (isObject(options)) {
    config = options
    animateOptions = objectOmit(options, ['window', 'immediate', 'commitStyles', 'persist', 'onReady', 'onError'])
  } else {
    config = { duration: options }
    animateOptions = options
  }

  const {
    window = defaultWindow,
    immediate = true,
    commitStyles,
    persist,
    playbackRate: _playbackRate = 1,
    onReady,
    onError = (e: unknown) => {
      console.error(e)
    }
  } = config

  const isSupported = useSupported(() => window && HTMLElement && 'animate' in HTMLElement.prototype)

  const [animate, setAnimate] = createSignal<Animation | undefined>(undefined)
  const store = createMutable<AnimateStore>({
    startTime: null,
    currentTime: null,
    timeline: null,
    playbackRate: _playbackRate,
    pending: false,
    playState: immediate ? 'idle' : 'paused',
    replaceState: 'active'
  })

  const pending = createMemo(() => store.pending)
  const playState = createMemo(() => store.playState)
  const replaceState = createMemo(() => store.replaceState)

  const startTime = writableComputed({
    get() {
      return store.startTime
    },
    set(value) {
      store.startTime = value
      const animateVal = animate()
      if (animateVal) setAnimate(Object.assign(animateVal, { startTime: value }))
    }
  })

  const currentTime = writableComputed({
    get() {
      return store.currentTime
    },
    set(value) {
      const animateVal = animate()
      if (animateVal) {
        setAnimate(Object.assign(animateVal, { currentTime: value }))
        syncResume()
      }
    }
  })

  const timeline = writableComputed({
    get() {
      return store.timeline
    },
    set(value) {
      store.timeline = value
      const animateVal = animate()
      if (animateVal) setAnimate(Object.assign(animateVal, { timeline: value }))
    }
  })

  const playbackRate = writableComputed({
    get() {
      return store.playbackRate
    },
    set(value) {
      store.playbackRate = value
      const animateVal = animate()
      if (animateVal) setAnimate(Object.assign(animateVal, { playbackRate: value }))
    }
  })

  const play = () => {
    const animateVal = animate()
    if (animateVal) {
      try {
        animateVal.play()
        syncResume()
      } catch (e) {
        syncPause()
        onError(e)
      }
    } else {
      update()
    }
  }

  const pause = () => {
    try {
      animate()?.pause()
      syncPause()
    } catch (e) {
      onError(e)
    }
  }

  const reverse = () => {
    !animate() && update()
    try {
      animate()?.reverse()
      syncResume()
    } catch (e) {
      syncPause()
      onError(e)
    }
  }

  const finish = () => {
    try {
      animate()?.finish()
      syncPause()
    } catch (e) {
      onError(e)
    }
  }

  const cancel = () => {
    try {
      animate()?.cancel()
      syncPause()
    } catch (e) {
      onError(e)
    }
  }

  createEffect(
    on(toAccessor(target), el => {
      el && update()
    })
  )

  createEffect(
    on(toAccessor(keyframes), value => {
      const animateVal = animate()
      !animateVal && update()

      if (!toValue(target) && animateVal) {
        setAnimate(
          Object.assign(animateVal, {
            effect: new KeyframeEffect(toValue(target)!, toValue(value), animateOptions)
          })
        )
      }
    })
  )

  tryOnMount(() => {
    nextTick(() => update(true))
  })

  tryOnCleanup(cancel)

  function update(init?: boolean) {
    const el = toValue(target)
    if (!isSupported() || !el) return

    const animateValue = el.animate(toValue(keyframes), animateOptions)
    setAnimate(animateValue)

    if (commitStyles) animateValue.commitStyles()
    if (persist) animateValue.persist()
    if (_playbackRate !== 1) animateValue.playbackRate = _playbackRate

    if (init && !immediate) animateValue.pause()
    else syncResume()

    onReady?.(animateValue)
  }

  useEventListener(animate, 'cancel', syncPause)
  useEventListener(animate, 'finish', syncPause)
  useEventListener(animate, 'remove', syncPause)

  const { resume: resumeRef, pause: pauseRef } = useRafFn(
    () => {
      const animateValue = animate()
      if (!animateValue) return
      store.pending = animateValue.pending
      store.playState = animateValue.playState
      store.replaceState = animateValue.replaceState
      store.startTime = animateValue.startTime
      store.currentTime = animateValue.currentTime
      store.timeline = animateValue.timeline
      store.playbackRate = animateValue.playbackRate
    },
    { immediate: false }
  )

  function syncResume() {
    if (isSupported()) resumeRef()
  }

  function syncPause() {
    if (isSupported() && window) window.requestAnimationFrame(pauseRef)
  }

  return {
    isSupported,
    animate,
    setAnimate,

    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,

    // state
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate
  }
}
