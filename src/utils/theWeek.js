export function theWeek(str) {
  let totalDays = 0;
  const now = str ? new Date(str) : new Date();
  let years = now.getYear();
  if (years < 1000) years += 1900;

  const days = new Array(12);
  days[0] = 31;
  days[2] = 31;
  days[3] = 30;
  days[4] = 31;
  days[5] = 30;
  days[6] = 31;
  days[7] = 31;
  days[8] = 30;
  days[9] = 31;
  days[10] = 30;
  days[11] = 31;

  // 判断是否为闰年，针对2月的天数进行计算
  if (Math.round(now.getYear() / 4) === now.getYear() / 4) {
    days[1] = 29;
  } else {
    days[1] = 28;
  }
  if (now.getMonth() === 0) {
    totalDays += now.getDate();
  } else {
    const curMonth = now.getMonth();
    for (let count = 1; count <= curMonth; count += 1) {
      totalDays += days[count - 1];
    }
    totalDays += now.getDate();
  }
  // 得到第几周
  const week = Math.round(totalDays / 7);
  return week;
}
