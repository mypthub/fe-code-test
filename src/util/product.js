/**
 * Format pence into currency
 * @param {number} value pence
 * @returns {string} £x,xx.xx
 */
export function formatCurrency(value) {
  if (value == null || value === undefined) return "";
  if (value !== 0) {
    // Convert pence to pounds
    let number = value / 100;
    number.toFixed(2);
    // Add approprate punctuation to price string
    return "£" + number.toLocaleString();
  }
  return "£" + value.toLocaleString();
}
