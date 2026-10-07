/**
 * military-time-converter
 * Convert between 12-hour time and 24-hour / military time.
 */

/**
 * Convert 12-hour time to military (24-hour) time.
 * @param {number} hours 1-12
 * @param {number} minutes 0-59
 * @param {'AM'|'PM'} period
 * @returns {string} "HH:MM" in 24h format
 */
export function toMilitary(hours, minutes, period) {
  if (hours < 1 || hours > 12) throw new Error('hours must be 1-12');
  if (minutes < 0 || minutes > 59) throw new Error('minutes must be 0-59');
  const p = period.toUpperCase();
  if (p !== 'AM' && p !== 'PM') throw new Error("period must be 'AM' or 'PM'");

  let h = hours % 12;
  if (p === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Convert military (24-hour) time to 12-hour time.
 * @param {number} hours 0-23
 * @param {number} minutes 0-59
 * @returns {{hours:number, minutes:number, period:'AM'|'PM', formatted:string}}
 */
export function fromMilitary(hours, minutes) {
  if (hours < 0 || hours > 23) throw new Error('hours must be 0-23');
  if (minutes < 0 || minutes > 59) throw new Error('minutes must be 0-59');

  const period = hours < 12 ? 'AM' : 'PM';
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return {
    hours: h12,
    minutes,
    period,
    formatted: `${h12}:${String(minutes).padStart(2, '0')} ${period}`
  };
}

/**
 * Parse a string like "2:30 PM" or "14:30" and convert to the other format.
 * @param {string} input
 * @returns {string}
 */
export function convert(input) {
  const s = input.trim().toUpperCase();

  // 12h -> 24h : "2:30 PM"
  let m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (m) return toMilitary(parseInt(m[1], 10), parseInt(m[2], 10), m[3]);

  // 24h -> 12h : "14:30" or "1430"
  m = s.match(/^(\d{1,2}):?(\d{2})$/);
  if (m) {
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    return fromMilitary(h, min).formatted;
  }

  throw new Error('Unrecognized format. Use "2:30 PM" or "14:30".');
}
