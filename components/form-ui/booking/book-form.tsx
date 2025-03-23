import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FieldLayout from '~/components/layout/form/field-layout';
import { useBookingForm } from '~/hooks/book/use-book-form';

interface BookFormProps {
  form: ReturnType<typeof useBookingForm>['form'];
}

const BookForm: FunctionComponent<BookFormProps> = ({ form }) => {
  const [showStartDatePicker, setShowStartDatePicker] = React.useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState<boolean>(false);

  return (
    <View className="gap-4">
      {/* detail */}
      <View className="gap-1">
        <Text className="text-xl font-bold">Chi tiết đặt xe</Text>
        <Text className="text-sm text-muted-foreground">
          Hãy chọn ngày bắt đầu và ngày kết thúc để đặt xe
        </Text>
      </View>

      <FieldLayout label="Ngày bắt đầu">
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <View className="flex-row items-center rounded-lg border border-muted px-2 py-3">
            <Feather name="calendar" size={20} color="gray" />
            <Controller
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <Text className="ml-2 flex-1 text-foreground">
                  {field.value ? new Date(field.value).toLocaleDateString() : 'Chọn ngày bắt đầu'}
                </Text>
              )}
            />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showStartDatePicker}
          mode="date"
          minimumDate={new Date()}
          onConfirm={(date) => {
            setShowStartDatePicker(false);
            form.setValue('startTime', date);
          }}
          onCancel={() => setShowStartDatePicker(false)}
        />
        {form.formState.errors.startTime && (
          <Text className="text-red-600">{form.formState.errors.startTime.message}</Text>
        )}
      </FieldLayout>

      <FieldLayout label="Ngày kết thúc">
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <View className="flex-row items-center rounded-lg border border-muted px-2 py-3">
            <Feather name="calendar" size={20} color="gray" />
            <Controller
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <Text className="ml-2 flex-1 text-foreground">
                  {field.value ? new Date(field.value).toLocaleDateString() : 'Chọn ngày kết thúc'}
                </Text>
              )}
            />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showEndDatePicker}
          mode="date"
          minimumDate={new Date() || form.getValues('startTime')}
          onConfirm={(date: Date) => {
            setShowEndDatePicker(false);
            form.setValue('endTime', date);
          }}
          onCancel={() => setShowEndDatePicker(false)}
        />
        {form.formState.errors.endTime && (
          <Text className="text-red-600">{form.formState.errors.endTime.message}</Text>
        )}
      </FieldLayout>
    </View>
  );
};

export default BookForm;
