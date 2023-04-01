// ported from https://www.reddit.com/r/vuejs/comments/jksizl/speech_recognition_as_a_vue_3_hook
// by https://github.com/wobsoriano

import { resolveAccessor, tryOnCleanup, unAccessor } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'
import type { SpeechRecognition, SpeechRecognitionErrorEvent } from './types'

export interface UseSpeechRecognitionOptions extends ConfigurableWindow {
  /**
   * Controls whether continuous results are returned for each recognition, or only a single result.
   *
   * @default true
   */
  continuous?: boolean
  /**
   * Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final
   *
   * @default true
   */
  interimResults?: boolean
  /**
   * Language for SpeechRecognition
   *
   * @default 'en-US'
   */
  lang?: MaybeAccessor<string>
}

/**
 * Reactive SpeechRecognition.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useSpeechRecognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition SpeechRecognition
 */
export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const { interimResults = true, continuous = true, window = defaultWindow } = options

  const lang = resolveAccessor(options.lang ?? 'en-US')
  const [isListening, setIsListening] = createSignal(false)
  const [isFinal, setIsFinal] = createSignal(false)
  const [result, setResult] = createSignal('')
  const [error, setError] = createSignal<SpeechRecognitionErrorEvent | undefined>(undefined)

  const toggle = (value = !isListening()) => {
    setIsListening(value)
  }

  const start = () => {
    setIsListening(true)
  }

  const stop = () => {
    setIsListening(false)
  }

  const SpeechRecognition = window && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
  const isSupported = useSupported(() => SpeechRecognition)

  let recognition: SpeechRecognition | undefined

  if (isSupported()) {
    recognition = new SpeechRecognition() as SpeechRecognition

    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = unAccessor(lang)

    recognition.onstart = () => {
      setIsFinal(false)
    }

    createEffect(
      on(
        lang,
        lang => {
          if (recognition && !isListening()) recognition.lang = lang
        },
        { defer: true }
      )
    )

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => {
          setIsFinal(result.isFinal)
          return result[0]
        })
        .map(result => result.transcript)
        .join('')

      setResult(transcript)
      setError(undefined)
    }

    recognition.onerror = event => {
      setError(event)
    }

    recognition.onend = () => {
      setIsListening(false)
      recognition!.lang = unAccessor(lang)
    }

    createEffect(
      on(
        isListening,
        () => {
          if (isListening()) recognition!.start()
          else recognition!.stop()
        },
        { defer: true }
      )
    )
  }

  tryOnCleanup(() => {
    setIsListening(false)
  })

  return {
    isSupported,
    isListening,
    isFinal,
    result,
    setResult,
    recognition,
    error,

    toggle,
    start,
    stop
  }
}

export type UseSpeechRecognitionReturn = ReturnType<typeof useSpeechRecognition>
