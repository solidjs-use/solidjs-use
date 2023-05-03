import { runHook } from '@dream2023/cypress-ct-solid-js'
import { formatDate, normalizeDate, useDateFormat } from '../useDateFormat'

describe('useDateFormat', () => {
  it('should export module', () => {
    runHook(() => {
      expect(normalizeDate).to.be.not.undefined
      expect(formatDate).to.be.not.undefined
      expect(useDateFormat).to.be.not.undefined
    })
  })
  it('should normalize date', () => {
    runHook(() => {
      const date = new Date(2022, 0, 1, 0, 0, 0)
      const currentDate = new Date().toDateString()
      expect(normalizeDate(undefined).toDateString()).to.eq(currentDate)
      // @ts-expect-error test null
      expect(normalizeDate(null).toString()).to.eq('Invalid Date')
      expect(normalizeDate(new Date()).toDateString()).to.eq(currentDate)
      expect(normalizeDate(new Date().toString()).toDateString()).to.eq(currentDate)
      expect(normalizeDate(new Date().toISOString().replace('Z', '')).toDateString()).to.deep.equal(currentDate)
      expect(normalizeDate('2022-01')).to.deep.equal(date)
      expect(normalizeDate('2022-01-01')).to.deep.equal(date)
      expect(normalizeDate('2022-01-01T00:00:00.000')).to.deep.equal(date)
    })
  })
  it('should work with default', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 10:24:00'))()).to.eq('10:24:00')
    })
  })
  it('should work with time string ', () => {
    runHook(() => {
      expect(useDateFormat('2022-01-01 20:24:24', 'YYYY—MM-DD HH:mm:ss')()).to.eq('2022—01-01 20:24:24')
    })
  })
  it('should work with YYYY-MM-DD', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 10:24:00'), 'YYYY-MM-DD')()).to.eq('2022-01-01')
    })
  })
  it('should work with YY-M-D', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 10:24:00'), 'YY-M-D')()).to.eq('22-1-1')
    })
  })
  it('should work with H:m:ss', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 10:24:00'), 'H:m:s')()).to.eq('10:24:0')
    })
  })
  it('should work with h:m:s', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 00:05:00'), 'h:m:s')()).to.eq('12:5:0')
      expect(useDateFormat(new Date('2022-01-01 08:05:00'), 'h:m:s')()).to.eq('8:5:0')
    })
  })
  it('should work with hh:mm:ss', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 00:05:05'), 'hh:mm:ss')()).to.eq('12:05:05')
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'hh:mm:ss')()).to.eq('03:05:05')
    })
  })
  it('should work with HH:mm:ss', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'HH:mm:ss')()).to.eq('15:05:05')
    })
  })
  it('should work with HH:mm:ss:SSS', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05:999'), 'HH:mm:ss:SSS')()).to.eq('15:05:05:999')
    })
  })
  it('should work with HH:mm:ss d', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'HH:mm:ss d')()).to.eq('15:05:05 6')
    })
  })
  it('should work with YYYY/MM/DD dd', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'YYYY/MM/DD dd', { locales: 'en-US' })()).to.eq(
        '2022/01/01 S'
      )
    })
  })
  it('should work with YYYY/MM/DD ddd', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'YYYY/MM/DD ddd', { locales: 'en-US' })()).to.eq(
        '2022/01/01 Sat'
      )
    })
  })
  it('should work with YYYY/MM/DD dddd', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'YYYY/MM/DD dddd', { locales: 'en-US' })()).to.eq(
        '2022/01/01 Saturday'
      )
    })
  })
  it('should work with MMM DD YYYY', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'MMM DD YYYY', { locales: 'en-US' })()).to.eq('Jan 01 2022')
    })
  })
  it('should work with MMMM DD YYYY', () => {
    runHook(() => {
      expect(useDateFormat(new Date('2022-01-01 15:05:05'), 'MMMM DD YYYY', { locales: 'en-US' })()).to.eq(
        'January 01 2022'
      )
    })
  })

  describe('meridiem', () => {
    it('should work with $formatStr', () => {
      ;[
        // AM
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss A', expected: '03:05:05 AM' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss AA', expected: '03:05:05 A.M.' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss a', expected: '03:05:05 am' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss aa', expected: '03:05:05 a.m.' },
        // PM
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss A', expected: '03:05:05 PM' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss AA', expected: '03:05:05 P.M.' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss a', expected: '03:05:05 pm' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss aa', expected: '03:05:05 p.m.' }
      ].forEach(({ dateStr, formatStr, expected }) => {
        runHook(() => {
          expect(useDateFormat(new Date(dateStr), formatStr)()).to.eq(expected)
        })
      })
    })

    it('should work with custom meridiem with $formatStr', () => {
      const customMeridiem = (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => {
        const m = hours > 11 ? (isLowercase ? 'μμ' : 'ΜΜ') : isLowercase ? 'πμ' : 'ΠΜ'
        return hasPeriod ? m.split('').reduce((acc, curr) => (acc += `${curr}.`), '') : m
      }

      ;[
        // AM
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss A', expected: '03:05:05 ΠΜ' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss AA', expected: '03:05:05 Π.Μ.' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss a', expected: '03:05:05 πμ' },
        { dateStr: '2022-01-01 03:05:05', formatStr: 'hh:mm:ss aa', expected: '03:05:05 π.μ.' },
        // PM
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss A', expected: '03:05:05 ΜΜ' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss AA', expected: '03:05:05 Μ.Μ.' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss a', expected: '03:05:05 μμ' },
        { dateStr: '2022-01-01 15:05:05', formatStr: 'hh:mm:ss aa', expected: '03:05:05 μ.μ.' }
      ].forEach(({ dateStr, formatStr, expected }) => {
        runHook(() => {
          expect(useDateFormat(new Date(dateStr), formatStr, { customMeridiem })()).to.eq(expected)
        })
      })
    })
  })
})
