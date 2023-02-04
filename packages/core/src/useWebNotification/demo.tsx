import { BooleanDisplay } from '@solidjs-use/docs-components'
import { useWebNotification } from 'solidjs-use'
import type { UseWebNotificationOptions } from 'solidjs-use'

const Demo = () => {
  const options: UseWebNotificationOptions = {
    title: 'Hello, world from VueUse!',
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test'
  }

  const { isSupported, show } = useWebNotification(options)

  return (
    <>
      <div>
        <p>
          Supported: <BooleanDisplay value={isSupported()} />
        </p>
      </div>
      {isSupported() ? (
        <div>
          <button onClick={() => show()}>Show Notification</button>
        </div>
      ) : (
        <div>The Notification Web API is not supported in your browser.</div>
      )}
    </>
  )
}

export default Demo
