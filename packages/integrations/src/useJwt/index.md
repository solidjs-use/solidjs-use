---
category: '@Integrations'
---

# useJwt

Wrapper for [`jwt-decode`](https://github.com/auth0/jwt-decode).

## Install

```bash
npm install solidjs-use @solidjs-use/integrations jwt-decode
```

## Usage

```tsx
import { useJwt } from '@solidjs-use/integrations/useJwt'

const [encodedJwt, setEncodedJwt] = createSignal(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc'
)
const { header, payload } = useJwt(encodedJwt)

console.log(header(), payload())
```
