import jwtDecode from 'jwt-decode'
import { createMemo } from 'solid-js'
import { unAccessor } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type { JwtDecodeOptions, JwtHeader, JwtPayload } from 'jwt-decode'

export interface UseJwtOptions<Fallback> {
  /**
   * Value returned when encounter error on decoding
   *
   * @default null
   */
  fallbackValue?: Fallback

  /**
   * Error callback for decoding
   */
  onError?: (error: unknown) => void
}

export interface UseJwtReturn<Payload, Header, Fallback> {
  header: Accessor<Header | Fallback>
  payload: Accessor<Payload | Fallback>
}

/**
 * Reactive decoded jwt token.
 */
export function useJwt<Payload extends object = JwtPayload, Header extends object = JwtHeader, Fallback = null>(
  encodedJwt: MaybeAccessor<string>,
  options: UseJwtOptions<Fallback> = {}
): UseJwtReturn<Payload, Header, Fallback> {
  const { onError, fallbackValue = null } = options

  const decodeWithFallback = <T extends object>(encodedJwt: string, options?: JwtDecodeOptions): T | Fallback => {
    try {
      return jwtDecode<T>(encodedJwt, options)
    } catch (err) {
      onError?.(err)
      return fallbackValue as Fallback
    }
  }

  const header = createMemo(() => decodeWithFallback<Header>(unAccessor(encodedJwt), { header: true }))
  const payload = createMemo(() => decodeWithFallback<Payload>(unAccessor(encodedJwt)))

  return {
    header,
    payload
  }
}
