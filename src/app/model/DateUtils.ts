export function setTime(date: Date, time: string) {
  date = new Date(date);
  switch (time) {
    case 'min':
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      break;
    case 'max':
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
      date.setMilliseconds(999);
      break;
  }
  return date;
}
