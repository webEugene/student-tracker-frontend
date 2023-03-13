/**
 * The filter get first letter and make it uppercase
 *
 * @param {string} str
 * @returns {string}
 */

export default function firstLetterUppercase(str) {
    return typeof str === 'string' ? str.charAt(0).toUpperCase() : '';
};
