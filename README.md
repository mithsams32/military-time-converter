# Military Time Converter — JavaScript Library

A lightweight, zero-dependency JavaScript library for converting between 12-hour (AM/PM) time and 24-hour military time. Whether you need to convert military time to standard time, turn AM/PM hours into 24-hour format, or parse user-entered time strings, this library does it in three simple functions: `toMilitary`, `fromMilitary`, and `convert`.

## What is military time?

Military time is the 24-hour clock format used by armed forces, aviation, healthcare, emergency services, and public transport around the world. Instead of repeating 1–12 twice with AM/PM, it runs 00:00 (midnight) to 23:59:

- 12:00 AM (midnight) → 00:00
- 1:00 AM → 01:00
- 12:00 PM (noon) → 12:00
- 1:00 PM → 13:00
- 11:59 PM → 23:59

Because there is no AM/PM ambiguity, military time prevents costly scheduling mistakes — which is why developers building booking systems, shift planners, flight trackers, and medical apps often need reliable 12-hour to 24-hour conversion in JavaScript.

## Why this library?

- **Zero dependencies** — a single small module, no installs beyond itself.
- **Bidirectional** — convert military time to regular time and back.
- **Smart parsing** — `convert()` accepts strings like `"2:30 PM"`, `"14:30"`, or even `"1430"`.
- **Safe** — invalid input throws clear errors instead of silently returning wrong times.
- **Modern** — ships as an ES module (`import`/`export`).

## Demo & full converter

For a full online converter with chart and examples, see:
[militarytimeconverters.com](https://militarytimeconverters.com)

You can also try the interactive demo in this repo: open `demo/index.html` in a browser.

## Installation

```bash
npm install military-time-converter
```

Or copy `src/index.js` straight into your project — it has no dependencies.

## Quick start

```js
import { toMilitary, fromMilitary, convert } from 'military-time-converter';

// 12-hour → military time
toMilitary(2, 30, 'PM');   // "14:30"
toMilitary(12, 0, 'AM');   // "00:00"  (midnight)
toMilitary(12, 0, 'PM');   // "12:00"  (noon)

// Military time → 12-hour
fromMilitary(14, 30);
// { hours: 2, minutes: 30, period: 'PM', formatted: '2:30 PM' }

// Auto-detect and convert either way
convert("2:30 PM");  // "14:30"
convert("14:30");    // "2:30 PM"
convert("1430");     // "2:30 PM"
```

## API reference

### `toMilitary(hours, minutes, period)`

Converts 12-hour AM/PM time to 24-hour military time.

- `hours`: number, 1–12
- `minutes`: number, 0–59
- `period`: `'AM'` or `'PM'` (case-insensitive)
- Returns: `"HH:MM"` string in 24-hour format (e.g. `"09:05"`, `"23:59"`)
- Throws on out-of-range input.

```js
toMilitary(9, 5, 'am');  // "09:05"
toMilitary(11, 59, 'PM'); // "23:59"
```

### `fromMilitary(hours, minutes)`

Converts 24-hour military time to 12-hour format.

- `hours`: number, 0–23
- `minutes`: number, 0–59
- Returns: `{ hours, minutes, period, formatted }` — e.g. `{ hours: 2, minutes: 30, period: 'PM', formatted: '2:30 PM' }`
- Throws on out-of-range input.

```js
fromMilitary(0, 0);   // { hours: 12, minutes: 0, period: 'AM', formatted: '12:00 AM' }
fromMilitary(23, 59); // { hours: 11, minutes: 59, period: 'PM', formatted: '11:59 PM' }
```

### `convert(input)`

Parses a time string and converts it to the other format automatically.

- `"2:30 PM"` (12-hour with AM/PM) → `"14:30"`
- `"14:30"` or `"1430"` (24-hour) → `"2:30 PM"`
- Throws `Error('Unrecognized format. Use "2:30 PM" or "14:30".')` for anything else.

```js
convert("12:00 AM"); // "00:00"
convert("00:00");    // "12:00 AM"
```

## Common conversions cheat sheet

| Standard (12-hour) | Military (24-hour) |
|---|---|
| 12:00 AM (midnight) | 00:00 |
| 1:00 AM | 01:00 |
| 6:30 AM | 06:30 |
| 11:59 AM | 11:59 |
| 12:00 PM (noon) | 12:00 |
| 1:00 PM | 13:00 |
| 6:30 PM | 18:30 |
| 11:59 PM | 23:59 |

## Use cases

- **Booking & scheduling apps** — store times in unambiguous 24-hour format while displaying friendly AM/PM to users.
- **Shift planners** — convert nurse, factory, or support shifts that span midnight without AM/PM bugs.
- **Travel & logistics** — flight, train, and delivery times are published in 24-hour time worldwide.
- **Forms & validation** — normalize whatever time format a user types into one canonical format.

## FAQ

**Does this library handle seconds?**
No — it works at minute precision (`HH:MM`), which covers virtually all scheduling and display needs.

**Does it handle time zones or DST?**
No. It converts time formats only; pair it with a date library if you need zone math.

**Can I use it in the browser without a bundler?**
Yes — `src/index.js` is a plain ES module. Import it directly or open `demo/index.html` for a working example.

**Is it really dependency-free?**
Yes. No runtime dependencies, no build step required.

## License

MIT
