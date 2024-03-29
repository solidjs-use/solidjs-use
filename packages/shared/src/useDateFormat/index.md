---
category: Time
---

# useDateFormat

Get the formatted date according to the string of tokens passed in, inspired by [dayjs](https://github.com/iamkun/dayjs).

**List of all available formats (HH:mm:ss by default):**

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `YY`   | 18               | Two-digit year                        |
| `YYYY` | 2018             | Four-digit year                       |
| `M`    | 1-12             | The month, beginning at 1             |
| `MM`   | 01-12            | The month, 2-digits                   |
| `MMM`  | Jan-Dec          | The abbreviated month name            |
| `MMMM` | January-December | The full month name                   |
| `D`    | 1-31             | The day of the month                  |
| `DD`   | 01-31            | The day of the month, 2-digits        |
| `H`    | 0-23             | The hour                              |
| `HH`   | 00-23            | The hour, 2-digits                    |
| `h`    | 1-12             | The hour, 12-hour clock               |
| `hh`   | 01-12            | The hour, 12-hour clock, 2-digits     |
| `m`    | 0-59             | The minute                            |
| `mm`   | 00-59            | The minute, 2-digits                  |
| `s`    | 0-59             | The second                            |
| `ss`   | 00-59            | The second, 2-digits                  |
| `SSS`  | 000-999          | The millisecond, 3-digits             |
| `A`    | AM PM            | The meridiem                          |
| `AA`   | A.M. P.M.        | The meridiem, periods                 |
| `a`    | am pm            | The meridiem, lowercase               |
| `aa`   | a.m. p.m.        | The meridiem, lowercase and periods   |
| `d`    | 0-6              | The day of the week, with Sunday as 0 |
| `dd`   | S-S              | The min name of the day of the week   |
| `ddd`  | Sun-Sat          | The short name of the day of the week |
| `dddd` | Sunday-Saturday  | The name of the day of the week       |

- Meridiem is customizable by defining `customMeridiem` in `options`.

## Usage

### Basic

```jsx
import { useNow, useDateFormat } from 'solidjs-use'

const Demo = () => {
  const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
  return <div>{formatted()}</div>
}
```

### Use with locales

```jsx
import { useNow, useDateFormat } from 'solidjs-use'

const Demo = () => {
  const formatted = useDateFormat(useNow(), 'YYYY-MM-DD (ddd)', { locales: 'en-US' })

  return <div>{formatted()}</div>
}
```

### Use with custom meridiem

```jsx
import { useNow, useDateFormat } from 'solidjs-use'

const Demo = () => {
  const customMeridiem = (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => {
    const m = hours > 11 ? (isLowercase ? 'μμ' : 'ΜΜ') : isLowercase ? 'πμ' : 'ΠΜ'
    return hasPeriod ? m.split('').reduce((acc, current) => (acc += `${current}.`), '') : m
  }

  const am = useDateFormat('2022-01-01 05:05:05', 'hh:mm:ss A', { customMeridiem })
  // am() === '05:05:05 ΠΜ'
  const pm = useDateFormat('2022-01-01 17:05:05', 'hh:mm:ss AA', { customMeridiem })
  // pm() === '05:05:05 Μ.Μ.'
  return (
    <div>
      <div>am: {am()}</div>
      <div>pm: {pm()}</div>
    </div>
  )
}
```
