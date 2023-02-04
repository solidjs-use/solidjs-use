import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      mb2?: true
      py2?: true
      mxa?: true
      ml5?: true
      mt2?: true
      w?: string
      i?: string
      position?: string
    }
    interface SvgSVGAttributes extends AttributifyAttributes {
      w?: string
    }
  }
}
