import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FieldLayout from '~/components/layout/form/field-layout';
import RangePickerCalendar from '~/components/plugins/calendar-range-select';
import Subtitle from '~/components/ui/subtitle';
import { BookingStatusEnum } from '~/constants/enums';
import { CarUnavailableResponse } from '~/constants/models/car.model';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { countDaysBetweenDates, DateFormat, formatDateToString, mergeDateTime } from '~/lib/format';

interface BookFormProps {
  form: ReturnType<typeof useBookingForm>['form'];
  unavailableDates: CarUnavailableResponse[];
  isExtend?: boolean;
  status?: string;
}

const BookForm: FunctionComponent<BookFormProps> = ({
  form,
  unavailableDates,
  isExtend = false,
  status,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = React.useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState<boolean>(false);
  const [originalDuration, setOriginalDuration] = React.useState<number>(0);

  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  const isOnGoing = status === BookingStatusEnum.Ongoing;
  const isReadyForPickup = status === BookingStatusEnum.ReadyForPickup;
  const isApproved = status === BookingStatusEnum.Approved;

  console.log('status', isOnGoing, isReadyForPickup, isApproved);

  // Watch all relevant form fields
  const startDay = form.watch('startDay');
  const endDay = form.watch('endDay');
  const startTimeValue = form.watch('startTime');
  const endTimeValue = form.watch('endTime');

  React.useEffect(() => {
    if (startDay && endDay) {
      const duration = countDaysBetweenDates(startDay, endDay);
      setOriginalDuration(duration);
    }
  }, [startDay, endDay]);

  React.useEffect(() => {
    if (startDay && startTimeValue) {
      const mergedStartTime = mergeDateTime(startDay, startTimeValue);
      if (mergedStartTime) {
        setStartTime(new Date(mergedStartTime));
      }
    }
  }, [startDay, startTimeValue]);

  React.useEffect(() => {
    if (endDay && endTimeValue) {
      const mergedEndTime = mergeDateTime(endDay, endTimeValue);
      if (mergedEndTime) {
        setEndTime(new Date(mergedEndTime));
      }
    }
  }, [endDay, endTimeValue]);

  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text className="text-xl font-bold">Chi tiết đặt xe</Text>
        <Text className="text-sm text-muted-foreground">
          {isExtend ? 'Hãy chọn ngày bắt đầu và ngày kết thúc để đặt xe' : 'Hãy chọn ngày bắt đầu'}
        </Text>
      </View>
      <View>
        <RangePickerCalendar
          key={`${form.getValues('startDay')?.toISOString()}-${form.getValues('endDay')?.toISOString()}`}
          initialStartDate={form.getValues('startDay')}
          initialEndDate={form.getValues('endDay')}
          themeColor="#3498db"
          minimumDate={new Date(new Date().setDate(new Date().getDate()))}
          onRangeSelected={(range) => {
            if (!range.start) return;
            form.setValue('startDay', range.start);
            if (range.end) {
              form.setValue('endDay', range.end);
            }
          }}
          unavailableDates={unavailableDates}
          isOnGoing={isOnGoing}
          isReadyForPickup={isReadyForPickup}
          isApproved={isApproved}
          originalDuration={originalDuration}
        />

        <View className="gap-2">
          {form.formState.errors.startDay && (
            <Text className="text-sm text-red-600">{form.formState.errors.startDay.message}</Text>
          )}
          {form.formState.errors.endDay && (
            <Text className="text-sm text-red-600">{form.formState.errors.endDay.message}</Text>
          )}
        </View>
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <FieldLayout label="Ngày nhận xe">
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              disabled={isExtend}
              style={{ opacity: isExtend ? 0.5 : 1 }}>
              <View className="flex-row items-center rounded-lg border border-muted px-2 py-3">
                <Feather name="calendar" size={20} color="gray" />
                <Controller
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <Text className="ml-2 flex-1 text-foreground">
                      {field.value
                        ? formatDateToString(form.getValues('startTime'), DateFormat.Time)
                        : 'Chọn ngày nhận xe'}
                    </Text>
                  )}
                />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showStartDatePicker}
              date={form.getValues('startTime')}
              mode="time"
              minimumDate={new Date()}
              onConfirm={(date) => {
                setShowStartDatePicker(false);
                form.setValue('startTime', date);
              }}
              onCancel={() => setShowStartDatePicker(false)}
            />
            {form.formState.errors.startTime && (
              <Text className="text-sm text-red-600">
                {form.formState.errors.startTime.message}
              </Text>
            )}
          </FieldLayout>
        </View>

        <View className="flex-1">
          <FieldLayout label="Thời gian giao xe">
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              disabled={isExtend}
              style={{ opacity: isExtend ? 0.5 : 1 }}>
              <View className="flex-row items-center rounded-lg border border-muted px-2 py-3">
                <Feather name="calendar" size={20} color="gray" />
                <Controller
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <Text className="ml-2 flex-1 text-foreground">
                      {field.value
                        ? formatDateToString(form.getValues('endTime'), DateFormat.Time)
                        : 'Chọn giờ giao xe'}
                    </Text>
                  )}
                />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              date={form.getValues('endTime')}
              isVisible={showEndDatePicker}
              mode="time"
              onConfirm={(date: Date) => {
                setShowEndDatePicker(false);
                form.setValue('endTime', date);
              }}
              onCancel={() => setShowEndDatePicker(false)}
            />
            {form.formState.errors.endTime && (
              <Text className="text-sm text-red-600">{form.formState.errors.endTime.message}</Text>
            )}
          </FieldLayout>
        </View>
      </View>

      <View className="gap-1 rounded-lg bg-slate-100 p-2 dark:bg-slate-700">
        <View className="flex-row items-center justify-between">
          <Subtitle className="text-base" title="Thời gian nhận xe" />
          <Text className="text-sm text-muted-foreground">
            {startTime && formatDateToString(startTime, DateFormat.DayTime)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Subtitle className="text-base" title="Thời gian trả xe" />
          <Text className="text-sm text-muted-foreground">
            {endTime && formatDateToString(endTime, DateFormat.DayTime)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookForm;
