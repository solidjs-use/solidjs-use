import { useStyleTag } from 'solidjs-use'

const Demo = () => {
  const customCSS = `.demo { background: #ad4c2e50; }
.demo textarea { background: lightyellow; }
  `.trim()
  const { id, css, setCss, load, unload, isLoaded } = useStyleTag(customCSS)

  return (
    <>
      <div>
        Edit CSS:
        <textarea value={css()} onChange={e => setCss(e.currentTarget.value)} rows="2" class="w-full" />
      </div>
      <button disabled={isLoaded()} onClick={load}>
        Load
      </button>
      <button class="orange" disabled={!isLoaded()} onClick={unload}>
        Unload
      </button>
      <div class="usestyle-demo">
        <p>
          ID: <code>{id}</code>
        </p>
        <p>
          Loaded: <code>{isLoaded().toString()}</code>
        </p>
      </div>
    </>
  )
}

export default Demo
