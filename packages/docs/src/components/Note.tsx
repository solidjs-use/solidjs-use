import type { ParentComponent } from 'solid-js'

export const Note: ParentComponent<{ class?: string }> = props => {
  return <div class={`note ${props.class ?? ''}`}>{props.children}</div>
}
