export function theWeek() {
  const today = new Date();
  let firstDay = new Date(today.getFullYear(), 0, 1);
  const dayOfWeek = firstDay.getDay();
  let spendDay = 1;
  if (dayOfWeek !== 0) {
    spendDay = 7 - dayOfWeek + 1;
  }
  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
  const d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
  const result = Math.ceil(d / 7);
  return result + 1;
}
