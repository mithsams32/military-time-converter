# military-time-converter

Lightweight, zero-dependency JavaScript library to convert between 12-hour time and 24-hour / military time.

```js
import { toMilitary, fromMilitary, convert } from 'military-time-converter';

toMilitary(2, 30, 'PM'); // "14:30"
fromMilitary(14, 30);    // { hours: 2, minutes: 30, period: 'PM', formatted: '2:30 PM' }
convert("2:30 PM");      // "14:30"
convert("14:30");        // "2:30 PM"
```

## Demo & full converter

For a full online converter with chart and examples, see:
[militarytimeconverters.com](https://militarytimeconverters.com)

## Install

```bash
npm install military-time-converter
```

## API

### `toMilitary(hours, minutes, period)`
- `hours`: 1-12
- `minutes`: 0-59
- `period`: `'AM'` | `'PM'`
- Returns: `"HH:MM"` string in 24-hour format

### `fromMilitary(hours, minutes)`
- `hours`: 0-23
- `minutes`: 0-59
- Returns: `{ hours, minutes, period, formatted }`

### `convert(input)`
Parses `"2:30 PM"` → `"14:30"` or `"14:30"` → `"2:30 PM"`.

## License

MIT
