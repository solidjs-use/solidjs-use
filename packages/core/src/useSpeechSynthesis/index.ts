import { toAccessor, tryOnCleanup, toValue } from "@solidjs-use/shared"
import { createEffect, createMemo, createSignal, on } from "solid-js"
import { useSupported } from "../useSupported"
import { defaultWindow } from "../_configurable"
import type { MaybeAccessor } from "@solidjs-use/shared"
import type { ConfigurableWindow } from "../_configurable"

export type UseSpeechSynthesisStatus = "init" | "play" | "pause" | "end"

export interface UseSpeechSynthesisOptions extends ConfigurableWindow {
  /**
   * Language for SpeechSynthesis
   *
   * @default 'en-US'
   */
  lang?: MaybeAccessor<string>
  /**
   * Gets and sets the pitch at which the utterance will be spoken at.
   *
   * @default 1
   */
  pitch?: MaybeAccessor<SpeechSynthesisUtterance["pitch"]>
  /**
   * Gets and sets the speed at which the utterance will be spoken at.
   *
   * @default 1
   */
  rate?: MaybeAccessor<SpeechSynthesisUtterance["rate"]>
  /**
   * Gets and sets the voice that will be used to speak the utterance.
   */
  voice?: MaybeAccessor<SpeechSynthesisVoice>
  /**
   * Gets and sets the volume that the utterance will be spoken at.
   *
   * @default 1
   */
  volume?: SpeechSynthesisUtterance["volume"]
}

/**
 * Reactive SpeechSynthesis.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useSpeechSynthesis
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis SpeechSynthesis
 */
export function useSpeechSynthesis(
  text: MaybeAccessor<string>,
  options: UseSpeechSynthesisOptions = {}
) {
  const { pitch = 1, rate = 1, volume = 1, window = defaultWindow } = options

  const synth = window && ((window as any).speechSynthesis as SpeechSynthesis)
  const isSupported = useSupported(() => synth)

  const [isPlaying, setIsPlaying] = createSignal(false)
  const [status, setStatus] = createSignal<UseSpeechSynthesisStatus>("init")

  const spokenText = toAccessor(text || "")
  const lang = toAccessor(options.lang ?? "en-US")
  const [error, setError] = createSignal<SpeechSynthesisErrorEvent | undefined>(undefined)

  const toggle = (value = !isPlaying()) => {
    setIsPlaying(value)
  }

  const bindEventsForUtterance = (utterance: SpeechSynthesisUtterance) => {
    utterance.lang = toValue(lang)
    utterance.voice = toValue(options.voice) ?? null
    utterance.pitch = toValue(pitch)
    utterance.rate = toValue(rate)
    utterance.volume = volume

    utterance.onstart = () => {
      setIsPlaying(true)
      setStatus("play")
    }

    utterance.onpause = () => {
      setIsPlaying(false)
      setStatus("pause")
    }

    utterance.onresume = () => {
      setIsPlaying(true)
      setStatus("play")
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setStatus("end")
    }

    utterance.onerror = event => {
      setError(event)
    }
  }

  const utterance = createMemo(() => {
    setIsPlaying(false)
    setStatus("init")
    const newUtterance = new SpeechSynthesisUtterance(spokenText())
    bindEventsForUtterance(newUtterance)
    return newUtterance
  })

  const speak = () => {
    synth!.cancel()
    utterance && synth!.speak(utterance())
  }

  const stop = () => {
    synth!.cancel()
    setIsPlaying(false)
  }

  if (isSupported()) {
    bindEventsForUtterance(utterance())

    createEffect(
      on(
        lang,
        lang => {
          if (utterance() && !isPlaying()) utterance().lang = lang
        },
        { defer: true }
      )
    )

    if (options.voice) {
      createEffect(
        on(
          toAccessor(options.voice),
          () => {
            synth!.cancel()
          },
          { defer: true }
        )
      )
    }

    createEffect(
      on(
        toAccessor(isPlaying),
        () => {
          if (isPlaying()) synth!.resume()
          else synth!.pause()
        },
        { defer: true }
      )
    )
  }

  tryOnCleanup(() => {
    setIsPlaying(false)
  })

  return {
    isSupported,
    isPlaying,
    status,
    utterance,
    error,

    stop,
    toggle,
    speak
  }
}

export type UseSpeechSynthesisReturn = ReturnType<typeof useSpeechSynthesis>
