import { runHook } from '@dream2023/cypress-solidjs'
import { useActiveElement } from '.'

describe('useActiveElement', () => {
  describe('host is html', () => {
    let input: HTMLInputElement

    beforeEach(() => {
      input = document.createElement('input')
      input.setAttribute('data-testid', 'body-input')
      document.body.appendChild(input)
    })

    afterEach(() => {
      input.remove()
    })

    it('should be defined', () => {
      expect(useActiveElement).to.be.exist
    })

    it('should initialise correctly', () => {
      runHook(() => {
        const activeElement = useActiveElement()

        expect(activeElement()).to.equal(document.body)
      })
    })

    it('should initialise with already-active element', () => {
      runHook(() => {
        input.focus()

        const activeElement = useActiveElement()

        expect(activeElement()).to.equal(input)
      })
    })

    it('should observe focus/blur events', () => {
      runHook(() => {
        const activeElement = useActiveElement()

        cy.wrap(input)
          .focus()
          .then(() => {
            expect(activeElement()).to.equal(input)
          })

        cy.wrap(input)
          .blur()
          .then(() => {
            expect(activeElement()).to.equal(document.body)
          })
      })
    })
  })

  describe('host is shadow dom', () => {
    let shadowHost: HTMLElement
    let shadowInput: HTMLInputElement
    let shadowRoot: ShadowRoot

    afterEach(() => {
      shadowHost.remove()
    })

    it('should accept custom document', () => {
      runHook(() => {
        customElements.define(
          'test-demo',
          class HelloWorld extends HTMLElement {
            constructor() {
              super()
              shadowRoot = this.attachShadow({ mode: 'open' })
              shadowInput = document.createElement('input')
              shadowRoot.appendChild(shadowInput)
            }

            connectedCallback() {
              shadowInput.focus()

              const activeElement = useActiveElement({ document: shadowRoot })
              expect(activeElement()).to.equal(shadowInput)
            }
          }
        )
        shadowHost = document.createElement('test-demo')
        document.body.appendChild(shadowHost)
        cy.wait(100)
      })
    })
  })
})
