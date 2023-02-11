import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { promiseTimeout, timestamp } from '@solidjs-use/shared'
import { createMemo, createSignal, getOwner } from 'solid-js'
import { useTimeAgo } from '.'
import type { Accessor, Owner, Setter } from 'solid-js'

type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

const UNITS = [
  { max: 60000, value: 1000, name: 'second' },
  { max: 2760000, value: 60000, name: 'minute' },
  { max: 72000000, value: 3600000, name: 'hour' },
  { max: 518400000, value: 86400000, name: 'day' },
  { max: 2419200000, value: 604800000, name: 'week' },
  { max: 28512000000, value: 2592000000, name: 'month' },
  { max: Infinity, value: 31536000000, name: 'year' }
]

const fullDateFormatter = (value: any) => new Date(value).toISOString().slice(0, 10)

function getNeededTimeChange(type: TimeUnit, count: number, adjustSecond?: number) {
  const unit = UNITS.find(i => i.name === type)
  return (unit?.value ?? 0) * count + (adjustSecond ?? 0) * 1000
}

describe('useTimeAgo', () => {
  let baseTime: number
  let changeValue: Accessor<number>
  let setChangeValue: Setter<number>
  let changeTime: Accessor<number>
  let owner: Owner | null

  function reset() {
    ;[changeValue, setChangeValue] = createSignal(0)
    owner = getOwner()
    baseTime = timestamp()
    changeTime = createMemo(() => baseTime + changeValue())
  }
  beforeEach(() => {
    runHook(() => {
      reset()
    })
  })

  it('control now', () => {
    return runAsyncHook(async () => {
      const { resume, pause, timeAgo } = useTimeAgo(baseTime, { controls: true, showSecond: true, updateInterval: 50 })
      expect(timeAgo()).to.be.eq('0 second ago')

      pause()
      await promiseTimeout(100)
      expect(timeAgo()).to.be.eq('0 second ago')

      resume()
      await promiseTimeout(1000)
      expect(timeAgo()).to.be.eq('1 second ago')
    }, owner)
  })

  it('get undefined when time is invalid', () => {
    runHook(() => {
      expect(useTimeAgo('invalid date')()).to.be.eq('')
    }, owner)
  })

  describe('just now', () => {
    it('just now', () => {
      runHook(() => {
        expect(useTimeAgo(baseTime)()).to.equal('just now')
      }, owner)
    })

    it('just now using custom formatter', () => {
      runHook(() => {
        expect(
          // @ts-expect-error mock messages
          useTimeAgo(baseTime, { messages: { second: '{0}', future: '{0}', past: '{0}' }, showSecond: true })()
        ).to.be.eq('0')
      }, owner)
    })
  })

  describe('second', () => {
    function testSecond(isFuture: boolean) {
      const text = isFuture ? 'future' : 'past'
      const nextTime = getNeededTimeChange('minute', 1, -1) * (isFuture ? 1 : -1)
      it(`${text}: less than 1 minute`, () => {
        runHook(() => {
          setChangeValue(nextTime)
          expect(useTimeAgo(changeTime)()).to.be.eq('just now')
        }, owner)
      })

      it(`${text}: less than 1 second`, () => {
        runHook(() => {
          setChangeValue(getNeededTimeChange('minute', 1, -59.6) * (isFuture ? 1 : -1))
          expect(useTimeAgo(changeTime, { showSecond: true })()).to.be.eq(isFuture ? 'in 0 second' : '0 second ago')
        }, owner)
      })

      it(`${text}: less than 1 minute/ with showSecond`, () => {
        runHook(() => {
          setChangeValue(nextTime)
          expect(useTimeAgo(changeTime, { showSecond: true })()).to.be.eq(isFuture ? 'in 59 seconds' : '59 seconds ago')
        }, owner)
      })

      it(`${text}: less than 1 minute but more than 10 seconds with showSecond`, () => {
        runHook(() => {
          setChangeValue(nextTime)
          expect(useTimeAgo(changeTime, { showSecond: true, max: 10000 })()).to.be.eq(fullDateFormatter(changeTime()))
        }, owner)
      })

      it(`${text}: more than 1 minute`, () => {
        runHook(() => {
          setChangeValue(getNeededTimeChange('minute', 1, 1) * (isFuture ? 1 : -1))
          expect(useTimeAgo(changeTime, { showSecond: true, max: 'second' })()).to.be.eq(
            fullDateFormatter(changeTime())
          )
        }, owner)
      })
    }

    testSecond(true)
    testSecond(false)
  })
  describe('minute', () => {
    it('future: 1 minute', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('minute', 1.1))
        expect(useTimeAgo(changeTime)()).to.equal('in 1 minute')
      }, owner)
    })

    it('past:  1 minute', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('minute', 1))
        expect(useTimeAgo(changeTime)()).to.equal('1 minute ago')
      }, owner)
    })

    it('future: 10 minutes', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('minute', 10))
        expect(useTimeAgo(changeTime)()).to.equal('in 10 minutes')
      }, owner)
    })

    it('past:  10 minutes', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('minute', 10))
        expect(useTimeAgo(changeTime)()).to.equal('10 minutes ago')
      }, owner)
    })
  })

  describe('hour', () => {
    it('future: 1 hour', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('hour', 1))
        expect(useTimeAgo(changeTime)()).to.equal('in 1 hour')
      }, owner)
    })

    it('past:  1 hour', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('hour', 1))
        expect(useTimeAgo(changeTime)()).to.equal('1 hour ago')
      }, owner)
    })

    it('future: 10 hours', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('hour', 10))
        expect(useTimeAgo(changeTime)()).to.equal('in 10 hours')
      }, owner)
    })

    it('past:  10 hours', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('hour', 10))
        expect(useTimeAgo(changeTime)()).to.equal('10 hours ago')
      }, owner)
    })
  })

  describe('day', () => {
    it('future: 1 day', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('day', 1))
        expect(useTimeAgo(changeTime)()).to.equal('tomorrow')
      }, owner)
    })

    it('past:  1 day', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('day', 1))
        expect(useTimeAgo(changeTime)()).to.equal('yesterday')
      }, owner)
    })

    it('future: 3 days', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('day', 3))
        expect(useTimeAgo(changeTime)()).to.equal('in 3 days')
      }, owner)
    })

    it('past:  3 days', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('day', 3))
        expect(useTimeAgo(changeTime)()).to.equal('3 days ago')
      }, owner)
    })
  })

  describe('week', () => {
    it('future: 1 week', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('week', 1))
        expect(useTimeAgo(changeTime)()).to.equal('next week')
      }, owner)
    })

    it('past:  1 week', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('week', 1))
        expect(useTimeAgo(changeTime)()).to.equal('last week')
      }, owner)
    })

    it('future: 3 weeks', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('week', 3))
        expect(useTimeAgo(changeTime)()).to.equal('in 3 weeks')
      }, owner)
    })

    it('past:  3 weeks', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('week', 3))
        expect(useTimeAgo(changeTime)()).to.equal('3 weeks ago')
      }, owner)
    })
  })

  describe('month', () => {
    it('future: 1 month', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('month', 1))
        expect(useTimeAgo(changeTime)()).to.equal('next month')
      }, owner)
    })

    it('past:  1 month', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('month', 1))
        expect(useTimeAgo(changeTime)()).to.equal('last month')
      }, owner)
    })

    it('future: 3 months', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('month', 3))
        expect(useTimeAgo(changeTime)()).to.equal('in 3 months')
      }, owner)
    })

    it('past:  3 months', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('month', 3))
        expect(useTimeAgo(changeTime)()).to.equal('3 months ago')
      }, owner)
    })
  })

  describe('year', () => {
    it('future: 1 year', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('year', 1))
        expect(useTimeAgo(changeTime)()).to.equal('next year')
      }, owner)
    })

    it('past:  1 year', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('year', 1))
        expect(useTimeAgo(changeTime)()).to.equal('last year')
      }, owner)
    })

    it('future: 3 years', () => {
      runHook(() => {
        setChangeValue(getNeededTimeChange('year', 3))
        expect(useTimeAgo(changeTime)()).to.equal('in 3 years')
      }, owner)
    })

    it('past:  3 years', () => {
      runHook(() => {
        setChangeValue(-getNeededTimeChange('year', 3))
        expect(useTimeAgo(changeTime)()).to.equal('3 years ago')
      }, owner)
    })
  })

  it('rounding', () => {
    runHook(() => {
      setChangeValue(getNeededTimeChange('day', 5.49))
      expect(useTimeAgo(changeTime)()).to.be.eq('in 5 days')
      expect(useTimeAgo(changeTime, { rounding: 'ceil' })()).to.be.eq('in 6 days')
      expect(useTimeAgo(changeTime, { rounding: 'floor' })()).to.be.eq('in 5 days')
      expect(useTimeAgo(changeTime, { rounding: 1 })()).to.be.eq('in 5.5 days')
      expect(useTimeAgo(changeTime, { rounding: 3 })()).to.be.eq('in 5.49 days')
    }, owner)
  })

  it('rounding unit fallback', () => {
    runHook(() => {
      setChangeValue(getNeededTimeChange('month', 11.5))
      expect(useTimeAgo(changeTime)()).to.be.eq('next year')
      expect(useTimeAgo(changeTime, { rounding: 'ceil' })()).to.be.eq('next year')
      expect(useTimeAgo(changeTime, { rounding: 'floor' })()).to.be.eq('in 11 months')
      expect(useTimeAgo(changeTime, { rounding: 1 })()).to.be.eq('in 0.9 year')
      expect(useTimeAgo(changeTime, { rounding: 3 })()).to.be.eq('in 0.945 year')
    }, owner)
  })

  it('custom units', () => {
    runHook(() => {
      setChangeValue(getNeededTimeChange('day', 14))
      expect(useTimeAgo(changeTime)()).to.be.eq('in 2 weeks')
      expect(
        useTimeAgo(changeTime, {
          units: [
            { max: 60000, value: 1000, name: 'second' },
            { max: 2760000, value: 60000, name: 'minute' },
            { max: 72000000, value: 3600000, name: 'hour' },
            { max: 518400000 * 30, value: 86400000, name: 'day' },
            { max: 28512000000, value: 2592000000, name: 'month' },
            { max: Infinity, value: 31536000000, name: 'year' }
          ]
        })()
      ).to.be.eq('in 14 days')
    }, owner)
  })
})
