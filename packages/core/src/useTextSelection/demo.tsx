import { createMemo } from 'solid-js'
import { useTextSelection } from 'solidjs-use'

const Demo = () => {
  const { rects, text } = useTextSelection()
  const selectedStyle = createMemo(() => (text() ? 'text-primary' : 'text-gray-400'))
  return (
    <>
      <div>
        <p class="font-600 text-blue-600">You can select any text on the page.</p>
        <p>
          <strong>Selected Text:</strong>
          <em class={`${selectedStyle()} whitespace-pre h-44 overflow-y-auto block`}>{text() || 'No selected'}</em>
        </p>
        <div>
          <strong>Selected rects:</strong>
          <pre class="h-72" lang="json">
            {JSON.stringify(rects(), null, 2)}
          </pre>
        </div>
      </div>
    </>
  )
}

export default Demo
