import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { LocaleConfig as CalendarLocaleConfig } from '~/configs/calendar.config';
import { CarUnavailableResponse } from '~/constants/models/car.model';

LocaleConfig.locales['vi'] = CalendarLocaleConfig.locales['vi'];
LocaleConfig.defaultLocale = CalendarLocaleConfig.defaultLocale;

interface RangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  themeColor?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  onRangeSelected?: (range: { start?: Date; end?: Date }) => void;
  unavailableDates?: CarUnavailableResponse[];
}

const RangePickerCalendar: React.FC<RangePickerProps> = ({
  initialStartDate,
  initialEndDate,
  themeColor = '#3498db',
  minimumDate,
  maximumDate,
  onRangeSelected,
  unavailableDates = [],
}) => {
  const [selectedRange, setSelectedRange] = useState<{ start?: Date; end?: Date }>({
    start: initialStartDate,
    end: initialEndDate,
  });

  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  // Convert Date to YYYY-MM-DD string format
  const formatDateToString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Separate effect for disabled dates
  useEffect(() => {
    const disabledDates: { [key: string]: any } = {};
    unavailableDates.forEach((unavailable) => {
      if (!unavailable?.date) return;
      try {
        const date = new Date(unavailable.date);
        if (isNaN(date.getTime())) return;
        const dateString = formatDateToString(date);
        disabledDates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
          textColor: '#9ca3af', // gray-400 color
          color: 'transparent',
        };
      } catch (error: any) {
        console.warn('Invalid date format in unavailableDates:', unavailable.date, error);
      }
    });
    setMarkedDates((prev) => ({ ...prev, ...disabledDates }));
  }, [unavailableDates]);

  // Effect for range selection
  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      const rangeDates = getDateRange(selectedRange.start, selectedRange.end, themeColor);
      setMarkedDates((prev) => {
        // Preserve disabled dates
        const disabledDates = Object.entries(prev)
          .filter(([_, value]) => value.disabled)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        // Merge with new range
        return { ...rangeDates, ...disabledDates };
      });
    }
  }, [selectedRange, themeColor]);

  // Xử lý khi chọn ngày
  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString);

    // Check if the selected date is disabled
    const isDisabled = unavailableDates.some((unavailable) => {
      if (!unavailable?.date) return false;
      try {
        const date = new Date(unavailable.date);
        if (isNaN(date.getTime())) return false;
        return formatDateToString(date) === day.dateString;
      } catch (error: any) {
        console.warn('Invalid date format in unavailableDates:', unavailable.date, error);
        return false;
      }
    });
    if (isDisabled) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Chọn ngày bắt đầu mới
      setSelectedRange({ start: selectedDate, end: undefined });
      setMarkedDates((prev) => {
        // Preserve disabled dates
        const disabledDates = Object.entries(prev)
          .filter(([_, value]) => value.disabled)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        return {
          ...disabledDates,
          [day.dateString]: { startingDay: true, color: themeColor, textColor: 'white' },
        };
      });
    } else {
      // Chọn ngày kết thúc
      // Ensure end date is after start date
      if (selectedDate < selectedRange.start) {
        // If selected date is before start date, swap them
        setSelectedRange({ start: selectedDate, end: selectedRange.start });
        const range = getDateRange(selectedDate, selectedRange.start, themeColor);
        setMarkedDates((prev) => {
          const disabledDates = Object.entries(prev)
            .filter(([_, value]) => value.disabled)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

          return { ...range, ...disabledDates };
        });
        onRangeSelected?.({ start: selectedDate, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: selectedDate });
        const range = getDateRange(selectedRange.start, selectedDate, themeColor);
        setMarkedDates((prev) => {
          const disabledDates = Object.entries(prev)
            .filter(([_, value]) => value.disabled)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

          return { ...range, ...disabledDates };
        });
        onRangeSelected?.({ start: selectedRange.start, end: selectedDate });
      }
    }
  };

  // Hàm tạo danh sách ngày từ start đến end
  const getDateRange = (startDate: Date, endDate: Date, color: string) => {
    const range: { [key: string]: any } = {};
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateString = formatDateToString(currentDate);
      range[dateString] = { color, textColor: 'white' };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Ensure start and end dates are marked correctly
    const startDateString = formatDateToString(startDate);
    const endDateString = formatDateToString(endDate);

    range[startDateString] = { startingDay: true, color, textColor: 'white' };
    range[endDateString] = { endingDay: true, color, textColor: 'white' };

    return range;
  };

  return (
    <View className="rounded-lg border border-muted bg-white p-1 dark:bg-slate-800">
      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
        disableAllTouchEventsForDisabledDays
        minDate={minimumDate ? formatDateToString(minimumDate) : undefined}
        maxDate={maximumDate ? formatDateToString(maximumDate) : undefined}
      />
    </View>
  );
};

export default RangePickerCalendar;
