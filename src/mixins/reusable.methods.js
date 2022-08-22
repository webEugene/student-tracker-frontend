export function getBySomebody(value, action) {
  if (Array.isArray(value) && value.length > 0) {
    return value[0][action];
  }

  if ((value || value[action]) !== undefined || value[action] !== null) {
    return value[action];
  }
}
