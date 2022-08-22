/**
 * Validate group regex
 *
 * @param value
 * @returns {boolean}
 */
export function groupValidate(value) {
  const regex = new RegExp(/^[А-яA-z0-9\s]*$/);
  return !!value.match(regex);
}

/**
 * Validate Name, Surname regex
 *
 * @param value
 * @returns {boolean}
 */
export function nameSurnameValidate(value) {
  const regex = new RegExp(/^[А-яA-z]*$/);
  return !!value.match(regex);
}

/**
 * Validate all Ukraine mobiles regex
 *
 * @param value
 * @returns {boolean}
 */
export function allMobilesValidate(value) {
  const regex = new RegExp(/^(?:\+38)?(0\d{9})$/);
  return !!value.match(regex);
}

/**
 * Validate password regex
 *
 * Success validate should have 7 to 15 characters
 * which contain at least one numeric digit and a special character
 *
 * @param value
 * @returns {boolean}
 */
export function passwordValidate(value) {
  const regex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
  return !!value.match(regex);
}
