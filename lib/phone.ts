/**
 * Accepts 03001234567, 0300-1234567, +92 300 1234567, 923001234567 and 00923001234567.
 * Returns 03001234567, or null when it is not a Pakistani mobile number.
 */
export function normalisePkPhone(raw: string): string | null {
  let d = String(raw || "").replace(/\D+/g, "");
  if (d.startsWith("0092")) d = d.slice(4);
  else if (d.startsWith("92") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  return /^3\d{9}$/.test(d) ? "0" + d : null;
}
