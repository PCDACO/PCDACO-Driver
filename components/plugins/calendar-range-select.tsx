import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { LocaleConfig as CalendarLocaleConfig } from '~/configs/calendar.config';

LocaleConfig.locales['vi'] = CalendarLocaleConfig.locales['vi'];
LocaleConfig.defaultLocale = CalendarLocaleConfig.defaultLocale;

interface RangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  themeColor?: string;
  onRangeSelected?: (range: { start?: Date; end?: Date }) => void;
}

const RangePickerCalendar: React.FC<RangePickerProps> = ({
  initialStartDate,
  initialEndDate,
  themeColor = '#3498db',
  onRangeSelected,
}) => {
  const [selectedRange, setSelectedRange] = useState<{ start?: Date; end?: Date }>({
    start: initialStartDate,
    end: initialEndDate,
  });

  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      setMarkedDates(getDateRange(initialStartDate, initialEndDate, themeColor));
    }
  }, [initialStartDate, initialEndDate]);

  // Xử lý khi chọn ngày
  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString); // Chuyển đổi thành Date

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Chọn ngày bắt đầu mới
      setSelectedRange({ start: selectedDate, end: undefined });
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: themeColor, textColor: 'white' },
      });
    } else {
      // Chọn ngày kết thúc
      const range = getDateRange(selectedRange.start, selectedDate, themeColor);
      setSelectedRange({ start: selectedRange.start, end: selectedDate });
      setMarkedDates(range);
      onRangeSelected?.({ start: selectedRange.start, end: selectedDate });
    }
  };

  // Hàm tạo danh sách ngày từ start đến end
  const getDateRange = (startDate: Date, endDate: Date, color: string) => {
    const range: { [key: string]: any } = {};
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      range[dateString] = { color, textColor: 'white' };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    range[startDate.toISOString().split('T')[0]] = { startingDay: true, color, textColor: 'white' };
    range[endDate.toISOString().split('T')[0]] = { endingDay: true, color, textColor: 'white' };
    return range;
  };

  return (
    <View className="rounded-lg border border-muted bg-white p-1 dark:bg-slate-800">
      <Calendar markingType="period" markedDates={markedDates} onDayPress={onDayPress} />
    </View>
  );
};

export default RangePickerCalendar;
