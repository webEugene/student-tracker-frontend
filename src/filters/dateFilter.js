/**
 * The filter converts timestamp to date
 *
 * @param {number|string} timestamp
 * @returns {Date|string}
 */

export default function dateFilter(timestamp) {
  let t = +timestamp;
  if (isNaN(t)) return 'Тип не валидный';

  return new Date(t * 1000);
}
