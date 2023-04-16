import {
  createEventHook,
  isObject,
  toAccessor,
  tryOnCleanup,
  toValue,
  watch,
  watchIgnorable
} from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultDocument } from '../_configurable'
import type { Fn, MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

/**
 * Many of the jsdoc definitions here are modified version of the
 * documentation from MDN(https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
 */
export interface UseMediaSource {
  /**
   * The source url for the media
   */
  src: string

  /**
   * The media codec type
   */
  type?: string
}

export interface UseMediaTextTrackSource {
  /**
   * Indicates that the track should be enabled unless the user's preferences indicate
   * that another track is more appropriate
   */
  default?: boolean

  /**
   * How the text track is meant to be used. If omitted the default kind is subtitles.
   */
  kind: TextTrackKind

  /**
   * A user-readable title of the text track which is used by the browser
   * when listing available text tracks.
   */
  label: string

  /**
   * Address of the track (.vtt file). Must be a valid URL. This attribute
   * must be specified and its URL value must have the same origin as the document
   */
  src: string

  /**
   * Language of the track text data. It must be a valid BCP 47 language tag.
   * If the kind attribute is set to subtitles, then srclang must be defined.
   */
  srcLang: string
}

interface UseMediaControlsOptions extends ConfigurableDocument {
  /**
   * The source for the media, may either be a string, a `UseMediaSource` object, or a list
   * of `UseMediaSource` objects.
   */
  src?: MaybeAccessor<string | UseMediaSource | UseMediaSource[]>

  /**
   * A list of text tracks for the media
   */
  tracks?: MaybeAccessor<UseMediaTextTrackSource[]>
}

export interface UseMediaTextTrack {
  /**
   * The index of the text track
   */
  id: number

  /**
   * The text track label
   */
  label: string

  /**
   * Language of the track text data. It must be a valid BCP 47 language tag.
   * If the kind attribute is set to subtitles, then srclang must be defined.
   */
  language: string

  /**
   * Specifies the display mode of the text track, either `disabled`,
   * `hidden`, or `showing`
   */
  mode: TextTrackMode

  /**
   * How the text track is meant to be used. If omitted the default kind is subtitles.
   */
  kind: TextTrackKind

  /**
   * Indicates the track's in-band metadata track dispatch type.
   */
  inBandMetadataTrackDispatchType: string

  /**
   * A list of text track cues
   */
  cues: TextTrackCueList | null

  /**
   * A list of active text track cues
   */
  activeCues: TextTrackCueList | null
}

/**
 * Automatically check if the Accessor exists and if it does run the cb fn
 */
function usingElRef<T = any>(source: MaybeAccessor<any>, cb: (el: T) => void) {
  if (toValue(source)) cb(toValue(source))
}

/**
 * Converts a TimeRange object to an array
 */
function timeRangeToArray(timeRanges: TimeRanges) {
  let ranges: Array<[number, number]> = []

  for (let i = 0; i < timeRanges.length; ++i) ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]]

  return ranges
}

/**
 * Converts a TextTrackList object to an array of `UseMediaTextTrack`
 */
function tracksToArray(tracks: TextTrackList): UseMediaTextTrack[] {
  return Array.from(tracks).map(
    ({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({
      id,
      label,
      kind,
      language,
      mode,
      activeCues,
      cues,
      inBandMetadataTrackDispatchType
    })
  )
}

const defaultOptions: UseMediaControlsOptions = {
  src: '',
  tracks: []
}

/**
 * Reactive media controls for both `audio` and `video` elements.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMediaControls
 */
export function useMediaControls(
  target: MaybeAccessor<HTMLMediaElement | null | undefined>,
  options: UseMediaControlsOptions = {}
) {
  options = {
    ...defaultOptions,
    ...options
  }

  const { document = defaultDocument } = options

  const [currentTime, setCurrentTime] = createSignal(0)
  const [duration, setDuration] = createSignal(0)
  const [seeking, setSeeking] = createSignal(false)
  const [volume, setVolume] = createSignal(1)
  const [waiting, setWaiting] = createSignal(false)
  const [ended, setEnded] = createSignal(false)
  const [playing, setPlaying] = createSignal(false)
  const [rate, setRate] = createSignal(1)
  const [stalled, setStalled] = createSignal(false)
  const [buffered, setBuffered] = createSignal<Array<[number, number]>>([])
  const [tracks, setTracks] = createSignal<UseMediaTextTrack[]>([])
  const [selectedTrack, setSelectedTrack] = createSignal<number>(-1)
  const [isPictureInPicture, setIsPictureInPicture] = createSignal(false)
  const [muted, setMuted] = createSignal(false)

  const supportsPictureInPicture = document && 'pictureInPictureEnabled' in document

  // Events
  const sourceErrorEvent = createEventHook<Event>()

  /**
   * Disables the specified track. If no track is specified then
   * all tracks will be disabled
   *
   * @param track The id of the track to disable
   */
  const disableTrack = (track?: number | UseMediaTextTrack) => {
    usingElRef<HTMLMediaElement>(target, el => {
      if (track) {
        const id = typeof track === 'number' ? track : track.id
        el.textTracks[id].mode = 'disabled'
      } else {
        for (let i = 0; i < el.textTracks.length; ++i) el.textTracks[i].mode = 'disabled'
      }
      setSelectedTrack(-1)
    })
  }

  /**
   * Enables the specified track and disables the
   * other tracks unless otherwise specified
   *
   * @param track The track of the id of the track to enable
   * @param disableTracks Disable all other tracks
   */
  const enableTrack = (track: number | UseMediaTextTrack, disableTracks = true) => {
    usingElRef<HTMLMediaElement>(target, el => {
      const id = typeof track === 'number' ? track : track.id

      if (disableTracks) disableTrack()

      el.textTracks[id].mode = 'showing'
      setSelectedTrack(id)
    })
  }
  /**
   * Toggle picture in picture mode for the player.
   */
  const togglePictureInPicture = () => {
    return new Promise((resolve, reject) => {
      usingElRef<HTMLVideoElement>(target, async el => {
        if (supportsPictureInPicture) {
          if (!isPictureInPicture()) {
            el.requestPictureInPicture().then(resolve).catch(reject)
          } else {
            ;(document as any).exitPictureInPicture().then(resolve).catch(reject)
          }
        }
      })
    })
  }

  /**
   * This will automatically inject sources to the media element. The sources will be
   * appended as children to the media element as `<source>` elements.
   */
  createEffect(() => {
    if (!document) return

    const el = toValue(target)
    if (!el) return

    const src = toValue(options.src)
    let sources: UseMediaSource[] = []

    if (!src) return

    // Merge sources into an array
    if (typeof src === 'string') sources = [{ src }]
    else if (Array.isArray(src)) sources = src
    else if (isObject(src)) sources = [src]

    // Clear the sources
    el.querySelectorAll('source').forEach(e => {
      e.removeEventListener('error', sourceErrorEvent.trigger)
      e.remove()
    })

    // Add new sources
    sources.forEach(({ src, type }) => {
      const source = document.createElement('source')

      source.setAttribute('src', src)
      source.setAttribute('type', type ?? '')

      source.addEventListener('error', sourceErrorEvent.trigger)

      el.appendChild(source)
    })

    // Finally, load the new sources.
    el.load()
  })

  // Remove source error listeners
  tryOnCleanup(() => {
    const el = toValue(target)
    if (!el) return

    el.querySelectorAll('source').forEach(e => e.removeEventListener('error', sourceErrorEvent.trigger))
  })

  /**
   * Watch volume and change player volume when volume prop changes
   */
  createEffect(
    on(
      volume,
      vol => {
        const el = toValue(target)
        if (!el) return

        el.volume = vol
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      muted,
      mute => {
        const el = toValue(target)
        if (!el) return

        el.muted = mute
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      rate,
      rate => {
        const el = toValue(target)
        if (!el) return

        el.playbackRate = rate
      },
      { defer: true }
    )
  )

  /**
   * Load Tracks
   */
  createEffect(() => {
    if (!document) return

    const textTracks = toValue(options.tracks)
    const el = toValue(target)

    if (!textTracks?.length || !el) return

    /**
     * The MediaAPI provides an API for adding text tracks, but they don't currently
     * have an API for removing text tracks, so instead we will just create and remove
     * the tracks manually using the HTML api.
     */
    el.querySelectorAll('track').forEach(e => e.remove())

    textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
      const track = document.createElement('track')

      track.default = isDefault ?? false
      track.kind = kind
      track.label = label
      track.src = src
      track.srclang = srcLang

      if (track.default) setSelectedTrack(i)

      el.appendChild(track)
    })
  })

  /**
   * This will allow us to update the current time from the timeupdate event
   * without setting the medias current position, but if the user changes the
   * current time via the Accessor, then the media will seek.
   *
   * If we did not use an ignorable watch, then the current time update from
   * the timeupdate event would cause the media to stutter.
   */
  const { ignoreUpdates: ignoreCurrentTimeUpdates } = watchIgnorable(currentTime, time => {
    const el = toValue(target)
    if (!el) return

    el.currentTime = time
  })

  /**
   * Using an ignorable watch so we can control the play state using a Accessor and not
   * a function
   */
  const { ignoreUpdates: ignorePlayingUpdates } = watchIgnorable(playing, isPlaying => {
    const el = toValue(target)
    if (!el) return

    isPlaying ? el.play() : el.pause()
  })

  useEventListener(target, 'timeupdate', () =>
    ignoreCurrentTimeUpdates(() => setCurrentTime(() => toValue(target)!.currentTime))
  )
  useEventListener(target, 'durationchange', () => setDuration(() => toValue(target)!.duration))
  useEventListener(target, 'progress', () => setBuffered(() => timeRangeToArray(toValue(target)!.buffered)))
  useEventListener(target, 'seeking', () => setSeeking(true))
  useEventListener(target, 'seeked', () => setSeeking(false))
  useEventListener(target, 'waiting', () => setWaiting(true))
  useEventListener(target, 'playing', () => {
    setWaiting(false)
    setEnded(false)
  })
  useEventListener(target, 'ratechange', () => setRate(() => toValue(target)!.playbackRate))
  useEventListener(target, 'stalled', () => setStalled(true))
  useEventListener(target, 'ended', () => setEnded(ended))
  useEventListener(target, 'pause', () => ignorePlayingUpdates(() => setPlaying(false)))
  useEventListener(target, 'play', () => ignorePlayingUpdates(() => setPlaying(true)))
  useEventListener(target, 'enterpictureinpicture', () => setIsPictureInPicture(true))
  useEventListener(target, 'leavepictureinpicture', () => setIsPictureInPicture(false))
  useEventListener(target, 'volumechange', () => {
    const el = toValue(target)
    if (!el) return

    setVolume(el.volume)
    setMuted(el.muted)
  })

  /**
   * The following listeners need to listen to a nested
   * object on the target, so we will have to use a nested
   * watch and manually remove the listeners
   */
  const listeners: Fn[] = []

  const stop = watch(
    toAccessor(target),
    () => {
      const el = toValue(target)
      if (!el) return

      stop()

      listeners[0] = useEventListener(el.textTracks, 'addtrack', () => setTracks(tracksToArray(el.textTracks)))
      listeners[1] = useEventListener(el.textTracks, 'removetrack', () => setTracks(tracksToArray(el.textTracks)))
      listeners[2] = useEventListener(el.textTracks, 'change', () => setTracks(tracksToArray(el.textTracks)))
    },
    { defer: false }
  )

  // Remove text track listeners
  tryOnCleanup(() => listeners.forEach(listener => listener()))

  return {
    currentTime,
    setCurrentTime,
    duration,
    waiting,
    setWaiting,
    seeking,
    setSeeking,
    ended,
    setEnded,
    stalled,
    setStalled,
    buffered,
    setBuffered,
    playing,
    setPlaying,
    rate,
    setRate,

    // Volume
    volume,
    setVolume,
    muted,
    setMuted,

    // Tracks
    tracks,
    setTracks,
    selectedTrack,
    setSelectedTrack,
    enableTrack,
    disableTrack,

    // Picture in Picture
    supportsPictureInPicture,
    togglePictureInPicture,
    isPictureInPicture,

    // Events
    onSourceError: sourceErrorEvent.on
  }
}

export type UseMediaControlsReturn = ReturnType<typeof useMediaControls>
