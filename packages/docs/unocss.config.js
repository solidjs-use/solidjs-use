import { defineConfig, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

const config = defineConfig({
  shortcuts: {
    'border-main': 'border-gray-400 border-opacity-30',
    'bg-main': 'bg-gray-400'
  },
  presets: [presetUno(), presetAttributify()],
  theme: {
    colors: {
      primary: 'var(--hope-colors-primary11)'
    },
    fontFamily: {
      mono: 'var(--vt-font-family-mono)'
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})

export default config
