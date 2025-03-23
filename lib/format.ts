export function formatPriceToVND(price: number): string {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
export enum DateFormat {
  Day = 'Day',
  Time = 'Time',
  DayTime = 'DayTime',
}

export function formatDateToString(date: Date, format: DateFormat): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const day = date.getDate();
  const month = date.getMonth() + 1;

  switch (format) {
    case DateFormat.Day:
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${date.getFullYear()}`;
    case DateFormat.Time:
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    case DateFormat.DayTime:
      return `${formattedHours}:${formattedMinutes} ${ampm} ${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
    default:
      return '';
  }
}

export function countDaysBetweenDates(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffInTime = endDate.getTime() - startDate.getTime();
  return Math.round(diffInTime / oneDay);
}

export const formatNumber = (value: string | number): string => {
  const numericValue = value.toString().replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
