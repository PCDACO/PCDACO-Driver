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

export function formatPhoneNumber(phone: string): string {
  // Bỏ hết ký tự không phải số
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) {
    return phone; // Trả lại nguyên bản nếu không phải 10 số
  }

  const part1 = digits.slice(0, 4);
  const part2 = digits.slice(4, 7);
  const part3 = digits.slice(7, 10);

  return `${part1}.${part2}.${part3}`;
}

export function getDuration(startDate: Date, endDate: Date): string {
  const msInDay = 1000 * 60 * 60 * 24;

  // Tính số ngày chênh lệch
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / msInDay);

  if (diffDays < 30) {
    return `${diffDays} ngày`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} tháng`;
  }
}
export const formatCardNumber = (number: string | number) => {
  return number.toString().replace(/\d{4}(?=\d)/g, '$& ');
};
