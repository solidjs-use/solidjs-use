import { createMemo, createSignal } from 'solid-js'
import { useStepper } from '.'

describe('useStepper', () => {
  it('should be defined', () => {
    expect(useStepper).to.exist
  })

  describe('common', () => {
    it('steps are reactive', () => {
      const [flag, setFlag] = createSignal(true)
      const steps = createMemo(() => ({
        first: {
          title: 'First',
          enabled: flag()
        },
        second: {
          title: 'Second',
          enabled: flag()
        }
      }))

      const stepper = useStepper(steps)

      expect(stepper.current().enabled).to.eq(true)
      setFlag(false)
      expect(stepper.current().enabled).to.eq(false)
    })

    it('does not navigate to steps that do not exist', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      stepper.goTo('unExisting step')
      expect(stepper.current()).to.eq('First')
    })

    it('supports navigating through steps', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      expect(stepper.current()).to.eq('First')

      // Checks that when this is the first step, we can't go back
      stepper.goToPrevious()
      expect(stepper.current()).to.eq('First')

      // Checks that we can simply go next
      stepper.goToNext()
      expect(stepper.current()).to.eq('Second')
      stepper.goToNext()
      expect(stepper.current()).to.eq('Last')

      // Checks that when this is the last step, we can't go next
      stepper.goToNext()
      expect(stepper.current()).to.eq('Last')

      // Checks that when this is not the first step, we can go back
      stepper.goToPrevious()
      expect(stepper.current()).to.eq('Second')

      // Checks that we can go back to a previous step
      stepper.goBackTo('first')
      expect(stepper.current()).to.eq('First')

      // Checks that we CANNOT go back to a future step
      stepper.goBackTo('last')
      expect(stepper.current()).to.eq('First')

      // Checks that we can go to a any step
      stepper.goTo('last')
      expect(stepper.current()).to.eq('Last')
    })

    it('can tell the step position', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      // First step
      expect(stepper.isFirst()).to.eq(true)
      expect(stepper.isLast()).to.eq(false)

      expect(stepper.isAfter('first')).to.eq(false)
      expect(stepper.isAfter('second')).to.eq(false)
      expect(stepper.isAfter('last')).to.eq(false)

      expect(stepper.isBefore('first')).to.eq(false)
      expect(stepper.isBefore('second')).to.eq(true)
      expect(stepper.isBefore('last')).to.eq(true)

      expect(stepper.isCurrent('first')).to.eq(true)
      expect(stepper.isCurrent('second')).to.eq(false)
      expect(stepper.isCurrent('last')).to.eq(false)

      expect(stepper.isPrevious('first')).to.eq(false)
      expect(stepper.isPrevious('second')).to.eq(false)
      expect(stepper.isPrevious('last')).to.eq(false)

      expect(stepper.isNext('first')).to.eq(false)
      expect(stepper.isNext('second')).to.eq(true)
      expect(stepper.isNext('last')).to.eq(false)

      // Second step
      stepper.goToNext()

      expect(stepper.isFirst()).to.eq(false)
      expect(stepper.isLast()).to.eq(false)

      expect(stepper.isAfter('first')).to.eq(true)
      expect(stepper.isAfter('second')).to.eq(false)
      expect(stepper.isAfter('last')).to.eq(false)

      expect(stepper.isBefore('first')).to.eq(false)
      expect(stepper.isBefore('second')).to.eq(false)
      expect(stepper.isBefore('last')).to.eq(true)

      expect(stepper.isCurrent('first')).to.eq(false)
      expect(stepper.isCurrent('second')).to.eq(true)
      expect(stepper.isCurrent('last')).to.eq(false)

      expect(stepper.isPrevious('first')).to.eq(true)
      expect(stepper.isPrevious('second')).to.eq(false)
      expect(stepper.isPrevious('last')).to.eq(false)

      expect(stepper.isNext('first')).to.eq(false)
      expect(stepper.isNext('second')).to.eq(false)
      expect(stepper.isNext('last')).to.eq(true)

      // Last step
      stepper.goToNext()

      expect(stepper.isFirst()).to.eq(false)
      expect(stepper.isLast()).to.eq(true)

      expect(stepper.isAfter('first')).to.eq(true)
      expect(stepper.isAfter('second')).to.eq(true)
      expect(stepper.isAfter('last')).to.eq(false)

      expect(stepper.isBefore('first')).to.eq(false)
      expect(stepper.isBefore('second')).to.eq(false)
      expect(stepper.isBefore('last')).to.eq(false)

      expect(stepper.isCurrent('first')).to.eq(false)
      expect(stepper.isCurrent('second')).to.eq(false)
      expect(stepper.isCurrent('last')).to.eq(true)

      expect(stepper.isPrevious('first')).to.eq(false)
      expect(stepper.isPrevious('second')).to.eq(true)
      expect(stepper.isPrevious('last')).to.eq(false)

      expect(stepper.isNext('first')).to.eq(false)
      expect(stepper.isNext('second')).to.eq(false)
      expect(stepper.isNext('last')).to.eq(false)
    })
  })

  describe('as array', () => {
    it('supports being initialized with a specific step', () => {
      const stepper = useStepper(['First step', 'Second step', 'Last step'], 'Last step')

      expect(stepper.current()).to.eq('Last step')
      expect(stepper.isCurrent('Last step')).to.exist
    })

    it('support type-specific features', () => {
      const stepper = useStepper(['First step', 'Second step', 'Last step'])

      expect(stepper.stepNames()).to.deep.equal(['First step', 'Second step', 'Last step'])
      expect(stepper.steps()).to.deep.equal(['First step', 'Second step', 'Last step'])
    })

    it('can get a step at a specific index', () => {
      const stepper = useStepper(['First step', 'Second step', 'Last step'])

      expect(stepper.at(0)).to.eq('First step')
      expect(stepper.at(1)).to.eq('Second step')
      expect(stepper.at(2)).to.eq('Last step')
    })

    it('can get a step by its name', () => {
      const stepper = useStepper(['First step', 'Second step', 'Last step'])

      expect(stepper.get('First step')).to.eq('First step')
      expect(stepper.get('Second step')).to.eq('Second step')
      expect(stepper.get('Last step')).to.eq('Last step')
      expect(stepper.get('unknown' as any)).to.be.undefined
    })
  })

  describe('as object', () => {
    it('supports being initialized with a specific step', () => {
      const stepper = useStepper(
        {
          first: 'First',
          second: 'Second',
          last: 'Last'
        },
        'second'
      )

      expect(stepper.current()).to.eq('Second')
      expect(stepper.isCurrent('second')).to.exist
    })

    it('support type-specific features', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      expect(stepper.stepNames()).to.deep.equal(['first', 'second', 'last'])
      expect(stepper.steps()).to.deep.equal({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })
    })

    it('can get a step at a specific index', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      expect(stepper.at(0)).to.eq('First')
      expect(stepper.at(1)).to.eq('Second')
      expect(stepper.at(2)).to.eq('Last')
    })

    it('can get a step by its name', () => {
      const stepper = useStepper({
        first: 'First',
        second: 'Second',
        last: 'Last'
      })

      expect(stepper.get('first')).to.eq('First')
      expect(stepper.get('second')).to.eq('Second')
      expect(stepper.get('last')).to.eq('Last')
    })
  })
})
