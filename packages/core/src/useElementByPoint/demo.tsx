import { createMemo } from 'solid-js'
import { useElementBounding, useElementByPoint, useEventListener, useMouse } from 'solidjs-use'

const Demo = () => {
  const { x, y, setX, setY } = useMouse({ type: 'client' })
  const { element } = useElementByPoint({ x, y })
  const bounding = useElementBounding(element)

  useEventListener('scroll', bounding.update, true)

  const boxStyles = createMemo(() => {
    if (element()) {
      return {
        display: 'block',
        width: `${bounding.width()}px`,
        height: `${bounding.height()}px`,
        left: `${bounding.left()}px`,
        top: `${bounding.top()}px`,
        'background-color': '#05a2c244',
        border: '1px solid var(--hope-colors-primary9)',
        transition: 'all 0.05s linear'
      } as Record<string, string | number>
    }
    return {
      display: 'none'
    }
  })

  const pointStyles = createMemo<Record<string, string | number>>(() => ({
    transform: `translate(calc(${x()}px - 50%), calc(${y()}px - 50%))`
  }))
  return (
    <>
      <div style={boxStyles()} fixed pointer-events-none z-9999 />
      <div
        style={pointStyles()}
        fixed
        top-0
        left-0
        pointer-events-none
        w-2
        h-2
        rounded-full
        bg-green-400
        shadow
        z-999
      />
      <div class="flex items-center">
        <span class="mr-4">X</span>
        <input value={x()} onInput={e => setX(Number(e.currentTarget.value))} type="number" />
      </div>
      <div class="flex items-center">
        <span class="mr-4">Y</span>
        <input value={y()} onInput={e => setY(Number(e.currentTarget.value))} type="number" />
      </div>
    </>
  )
}

export default Demo
