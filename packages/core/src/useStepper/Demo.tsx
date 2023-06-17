import { stringify } from '@solidjs-use/docs-utils'
import { For, Show } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useStepper } from 'solidjs-use'

const Demo = () => {
  const form = createMutable({
    firstName: 'Jon',
    lastName: '',
    billingAddress: '',
    contractAccepted: false,
    carbonOffsetting: false,
    payment: 'credit-card' as 'paypal' | 'credit-card'
  })

  const stepper = useStepper({
    'user-information': {
      title: 'User information',
      isValid: () => form.firstName && form.lastName
    },
    'billing-address': {
      title: 'Billing address',
      isValid: () => form.billingAddress?.trim() !== ''
    },
    terms: {
      title: 'Terms',
      isValid: () => form.contractAccepted
    },
    payment: {
      title: 'Payment',
      isValid: () => ['credit-card', 'paypal'].includes(form.payment)
    }
  })

  function submit () {
    if (stepper.current().isValid()) stepper.goToNext()
  }

  function allStepsBeforeAreValid (index: number): boolean {
    return !Array(index)
      .fill(null)
      .some((_, i) => !stepper.at(i)?.isValid())
  }
  return (
    <>
      <div>
        <div class="flex gap-2 justify-center">
          <For each={Object.entries(stepper.steps())}>
            {([id, step], i) => (
              <button
                disabled={!allStepsBeforeAreValid(i()) && stepper.isBefore(id as any)}
                onClick={() => stepper.goTo(id as any)}
              >
                {step.title}
              </button>
            )}
          </For>
        </div>

        <form
          class="mt-10"
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
        >
          <span class="text-lg font-bold">{stepper.current().title}</span>
          <div class="flex flex-col justify-center gap-2 mt-2">
            <div>
              <Show when={stepper.isCurrent('user-information')}>
                <div>
                  <span>First name:</span>
                  <input
                    value={form.firstName}
                    onInput={e => (form.firstName = e.currentTarget.value)}
                    class="!mt-0.5"
                    type="text"
                  />
                  <span>Last name:</span>
                  <input
                    value={form.lastName}
                    onInput={e => (form.lastName = e.currentTarget.value)}
                    class="!mt-0.5"
                    type="text"
                  />
                </div>
              </Show>

              <Show when={stepper.isCurrent('billing-address')}>
                <div>
                  <input
                    value={form.billingAddress}
                    onInput={e => (form.billingAddress = e.currentTarget.value)}
                    type="text"
                  />
                </div>
              </Show>

              <Show when={stepper.isCurrent('terms')}>
                <div>
                  <div>
                    <input
                      id="carbon-offsetting"
                      value={form.carbonOffsetting ? 'true' : undefined}
                      onChange={e => (form.carbonOffsetting = e.currentTarget.checked)}
                      type="checkbox"
                      class="mr-2"
                    />
                    <label for="carbon-offsetting">I accept to deposit a carbon offsetting fee</label>
                  </div>
                  <div>
                    <input
                      id="contract"
                      value={form.contractAccepted ? 'true' : undefined}
                      onChange={e => (form.contractAccepted = e.currentTarget.checked)}
                      type="checkbox"
                      class="mr-2"
                    />
                    <label for="contract">I accept the terms of the contract</label>
                  </div>
                </div>
              </Show>

              <Show when={stepper.isCurrent('payment')}>
                <div>
                  <div>
                    <input
                      id="credit-card"
                      checked={form.payment === 'credit-card'}
                      onChange={() => (form.payment = 'credit-card' as const)}
                      type="radio"
                      class="mr-2"
                    />
                    <label for="credit-card">Credit card</label>
                  </div>
                  <div>
                    <input
                      id="paypal"
                      checked={form.payment === 'paypal'}
                      onChange={() => (form.payment = 'paypal' as const)}
                      type="radio"
                      class="mr-2"
                    />
                    <label for="paypal">PayPal</label>
                  </div>
                </div>
              </Show>
            </div>
            <div>
              <Show when={!stepper.isLast()}>
                <button disabled={!stepper.current().isValid()}>Next</button>
              </Show>
              <Show when={stepper.isLast()}>
                <button disabled={!stepper.current().isValid()}>Submit</button>
              </Show>
            </div>
          </div>
        </form>

        <div class="flex flex-col gap-4 mt-12">
          <div class="w-full px-4 py-2 rounded border border-main space-y-2 overflow-auto h-full">
            <span class="font-bold">Form</span>
            <pre>{stringify(form)}</pre>
          </div>

          <div class="w-full px-4 py-2 rounded border border-main space-y-2 overflow-auto h-full">
            <span class="font-bold">Wizard</span>
            <pre>
              {stringify({
                steps: stepper.steps,
                stepNames: stepper.stepNames,
                index: stepper.index,
                current: stepper.current,
                next: stepper.next,
                isFirst: stepper.isFirst,
                isLast: stepper.isLast
              })}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
