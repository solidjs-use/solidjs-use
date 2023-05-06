import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useJwt } from '.'
import type { JwtHeader, JwtPayload } from 'jwt-decode'

interface CustomJwtHeader extends JwtHeader {
  foo: string
}

interface CustomJwtPayload extends JwtPayload {
  foo: string
}

describe('useJwt', () => {
  it('decoded jwt', () => {
    runHook(() => {
      const [encodedJwt] = createSignal(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc'
      )
      const { header, payload } = useJwt(encodedJwt)
      expect(header()?.alg).to.be.eq('HS256')
      // NOTE: ts-ignore can be removed as soon as jwt-decode > v3.1.2 was released
      // see: https://github.com/auth0/jwt-decode/pull/115
      // @ts-expect-error cast
      expect(header()?.typ).to.be.eq('JWT')
      expect(payload()?.sub).to.be.eq('1234567890')
      expect(payload()?.iat).to.be.eq(1516239022)
    })
  })

  it('decode jwt error', () => {
    runHook(() => {
      const onErrorSpy = cy.spy()
      const [token] = createSignal('bad-token')
      const { header, payload } = useJwt(token, { onError: onErrorSpy })
      expect(header()).to.be.eq(null)
      expect(payload()).to.be.eq(null)
      expect(onErrorSpy).to.be.called
    })
  })

  it('decoded jwt with custom fields', () => {
    runHook(() => {
      const [encodedCustomJwt] = createSignal(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJmb28iOiJiYXIifQ.S5QwvREUfgEdpB1ljG_xN6NI3HubQ79xx6J1J4dsJmg'
      )
      const { header, payload } = useJwt<CustomJwtPayload, CustomJwtHeader>(encodedCustomJwt)
      expect(header()?.foo).to.be.eq('bar')
      expect(payload()?.foo).to.be.eq('bar')
    })
  })

  it('reactivity', () => {
    runHook(() => {
      const [encodedCustomJwt] = createSignal(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJmb28iOiJiYXIifQ.S5QwvREUfgEdpB1ljG_xN6NI3HubQ79xx6J1J4dsJmg'
      )
      const [encodedJwt] = createSignal(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc'
      )
      const [jwt, setJwt] = createSignal(encodedJwt())
      const { header, payload } = useJwt<CustomJwtPayload, CustomJwtHeader>(jwt)
      expect(header()?.foo).to.be.undefined
      expect(payload()?.foo).to.be.undefined
      setJwt(encodedCustomJwt())
      expect(header()?.foo).to.be.eq('bar')
      expect(payload()?.foo).to.be.eq('bar')
    })
  })
})
