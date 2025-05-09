/**
 * Định dạng giá tiền sang đơn vị Việt Nam Đồng (VND).
 * @param price - Số tiền cần định dạng.
 * @returns Chuỗi biểu diễn giá tiền theo định dạng VND.
 */
export function formatPriceToVND(price: number): string {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

/**
 * Định dạng số rating với 2 chữ số thập phân.
 * @param rating - Số rating cần định dạng.
 * @returns Chuỗi biểu diễn rating với 2 chữ số thập phân.
 */
export function formatRating(rating: number): string {
  return rating.toFixed(2);
}

/**
 * Định nghĩa kiểu định dạng ngày.
 */
export enum DateFormat {
  Day = 'Day',
  Time = 'Time',
  DayTime = 'DayTime',
}

/**
 * Chuyển đổi đối tượng ngày thành chuỗi theo định dạng mong muốn.
 * @param date - Đối tượng Date cần định dạng.
 * @param format - Kiểu định dạng theo enum DateFormat.
 * @returns Chuỗi biểu diễn ngày theo định dạng được chọn.
 */
export function formatDateToString(date: Date, format: DateFormat): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  switch (format) {
    case DateFormat.Day:
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${date.getFullYear()}`;
    case DateFormat.Time:
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    case DateFormat.DayTime:
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${date.getFullYear()}, ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    default:
      return '';
  }
}

/**
 * Đếm số ngày giữa hai mốc thời gian.
 * @param startDate - Ngày bắt đầu.
 * @param endDate - Ngày kết thúc.
 * @returns Số ngày giữa hai ngày đã cho.
 */
export function countDaysBetweenDates(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Số mili-giây trong một ngày
  const diffInTime = endDate.getTime() - startDate.getTime();
  return Math.round(diffInTime / oneDay);
}

/**
 * Định dạng số với dấu chấm phân tách hàng nghìn.
 * @param value - Số hoặc chuỗi cần định dạng.
 * @returns Chuỗi số đã được định dạng với dấu chấm.
 */
export const formatNumber = (value: string | number): string => {
  const numericValue = value.toString().replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Định dạng số điện thoại thành dạng xxx.xxx.xxx.
 * @param phone - Chuỗi số điện thoại cần định dạng.
 * @returns Chuỗi số điện thoại đã được chia nhóm.
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) {
    return phone; // Giữ nguyên nếu không phải 10 số
  }

  const part1 = digits.slice(0, 4);
  const part2 = digits.slice(4, 7);
  const part3 = digits.slice(7, 10);

  return `${part1}.${part2}.${part3}`;
}

/**
 * Tính khoảng thời gian giữa hai ngày theo đơn vị ngày hoặc tháng.
 * @param startDate - Ngày bắt đầu.
 * @param endDate - Ngày kết thúc.
 * @returns Chuỗi thể hiện khoảng thời gian theo ngày hoặc tháng.
 */
export function getDuration(startDate: Date, endDate: Date): string {
  const msInDay = 1000 * 60 * 60 * 24;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / msInDay);

  if (diffDays < 30) {
    return `${diffDays} ngày`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} tháng`;
  }
}

/**
 * Định dạng số thẻ ngân hàng thành dạng XXXX XXXX XXXX XXXX.
 * @param number - Chuỗi hoặc số cần định dạng.
 * @returns Chuỗi số thẻ đã được định dạng.
 */
export const formatCardNumber = (number: string | number): string => {
  return number.toString().replace(/\d{4}(?=\d)/g, '$& ');
};

/**
 * Chuyển đổi ngày về dạng UTC (00:00:00).
 * @param date - Ngày cần chuyển đổi.
 * @returns Chuỗi ngày theo định dạng ISO với múi giờ UTC.
 */
export const formatUTCDate = (date: Date): string => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString();
};

/**
 * Kết hợp ngày và giờ thành một đối tượng Date duy nhất.
 * @param date - Đối tượng Date chứa ngày.
 * @param time - Đối tượng Date chứa giờ.
 * @returns Đối tượng Date mới kết hợp cả ngày và giờ.
 */
export const mergeDateTime = (date: Date, time: Date): Date => {
  const merged = new Date(date);
  merged.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
  return merged;
};
/**
 * Tính thời gian đã trôi qua từ một ngày cụ thể đến hiện tại
 * @param date - Ngày cần tính
 * @returns Chuỗi biểu diễn thời gian đã trôi qua (ví dụ: "2 giờ trước")
 */
export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInSeconds < minute) {
    return 'Vừa xong';
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} giờ trước`;
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} ngày trước`;
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week);
    return `${weeks} tuần trước`;
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInSeconds / year);
    return `${years} năm trước`;
  }
};
