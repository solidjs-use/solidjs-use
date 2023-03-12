import { stringify } from '@solidjs-use/docs-utils'
import { useBrowserLocation } from 'solidjs-use'

const Demo = () => {
  const location = useBrowserLocation()
  return (
    <>
      <div>
        Input and hash will be changed:
        <input
          value={location.hash()}
          onChange={e => location.setHash(e.currentTarget.value)}
          type="text"
          placeholder="Hash"
        />
        <pre lang="yaml">
          {stringify({
            trigger: location.trigger,
            state: location.state,
            length: location.length,
            hash: location.hash,
            host: location.host,
            hostname: location.hostname,
            href: location.href,
            origin: location.origin,
            pathname: location.pathname,
            port: location.port,
            protocol: location.protocol,
            search: location.search
          })}
        </pre>
      </div>
    </>
  )
}

export default Demo
