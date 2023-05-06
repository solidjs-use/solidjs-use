import './styles/vitepress/vars.css'
import './styles/vitepress/base.css'
import './styles/vitepress/utils.css'
import './styles/custom-vitepress/vars.css'
import './styles/custom-vitepress/demo.less'
import './styles/vitepress/vp-doc.css'
import './styles/index.css'

import 'prism-themes/themes/prism-night-owl.min.css'

import 'uno.css'

import { HopeProvider, NotificationsProvider } from '@hope-ui/solid'
import Prism from 'prismjs'
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import App from './App'
import type { HopeThemeConfig } from '@hope-ui/solid'

const config: HopeThemeConfig = {
  initialColorMode: 'system',
  components: {
    Menu: {
      baseStyle: {
        content: {
          zIndex: 10
        }
      }
    },
    Popover: {
      baseStyle: {
        content: {
          zIndex: 10
        }
      }
    },
    Tooltip: {
      baseStyle: {
        zIndex: 10
      }
    }
  }
}

render(
  () => (
    <Router>
      <NotificationsProvider>
        <HopeProvider config={config}>
          <App />
        </HopeProvider>
      </NotificationsProvider>
    </Router>
  ),
  document.getElementById('root')!
)

setTimeout(() => {
  Prism.highlightAll()
}, 0)
