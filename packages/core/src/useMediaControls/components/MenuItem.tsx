import type { ParentComponent } from 'solid-js'

export const MenuItem: ParentComponent<{ onClick: () => void }> = props => (
    <>
      <div
        onClick={props.onClick}
        class="px-4 py-2 p-r-7 whitespace-nowrap flex flex-row gap-2 items-center hover:bg-primary hover:c-white cursor-pointer "
        tabindex="0"
      >
        {props.children}
      </div>
    </>
)
