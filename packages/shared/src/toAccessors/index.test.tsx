import { mount } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { toAccessors } from './index'
import type { Component } from 'solid-js'

describe('toAccessors', () => {
  it('should work on props change', () => {
    const Child: Component<{ num: number }> = props => {
      const { num } = toAccessors(props)
      return <div id="num">{num()}</div>
    }
    const Demo = () => {
      const [count, setCount] = createSignal(0)
      return (
        <div>
          <Child num={count()} />
          <button id="btn-inc" onClick={() => setCount(1)}>
            inc
          </button>
        </div>
      )
    }
    mount(() => <Demo />)

    cy.get('#num').should('have.text', '0')
    cy.get('#btn-inc')
      .click()
      .then(() => {
        cy.get('#num').should('have.text', '1')
      })
  })

  it('should merge with defaultProps', () => {
    const Child: Component<{ num?: number }> = props => {
      const { num } = toAccessors(props, { num: 0 })
      return <div id="num">{num()}</div>
    }
    const Demo = () => {
      const [count, setCount] = createSignal<number>()
      return (
        <div>
          <Child num={count()} />
          <button id="btn-inc" onClick={() => setCount(1)}>
            inc
          </button>
        </div>
      )
    }
    mount(() => <Demo />)

    cy.get('#num').should('have.text', '0')
    cy.get('#btn-inc')
      .click()
      .then(() => {
        cy.get('#num').should('have.text', '1')
      })
  })
})
