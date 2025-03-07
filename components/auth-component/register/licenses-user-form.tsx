import Icon from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Platform, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Text } from '~/components/nativewindui/Text';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { cn } from '~/lib/cn';
import { DateFormat, formatDateToString } from '~/lib/format';

interface LicensesUserFormProps {
  form: ReturnType<typeof useLicenseForm>['form'];
}

const LicensesUserForm: React.FC<LicensesUserFormProps> = ({ form }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <View className="gap-6">
      <Text variant="largeTitle" color="secondary">
        Thông tin giấy phép lái xe
      </Text>
      <View className="gap-4">
        <FieldLayout label="Số seri giấy phép">
          <Controller
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập số giấy phép"
                keyboardType="number-pad"
                leftIcon={<Icon name="credit-card" size={20} color="gray" />}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {form.formState.errors.licenseNumber && (
            <Text className="text-sm text-destructive">
              {form.formState.errors.licenseNumber.message}
            </Text>
          )}
        </FieldLayout>

        <FieldLayout label="Ngày hết hạn">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View className="flex-row items-baseline gap-2 rounded-lg border border-muted px-2 py-3">
              <Icon name="calendar" size={20} color="gray" />
              <Controller
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <Text
                    className={cn(
                      'flex-1 text-sm ',
                      field.value ? 'text-foreground' : 'text-muted'
                    )}>
                    {field.value
                      ? formatDateToString(field.value, DateFormat.Day)
                      : 'Chọn ngày hết hạn'}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={form.getValues('expirationDate') || new Date()}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setShowDatePicker(false);
                form.setValue('expirationDate', date || new Date());
              }}
            />
          )}
          {form.formState.errors.expirationDate && (
            <Text className="text-sm text-destructive">
              {form.formState.errors.expirationDate.message}
            </Text>
          )}
        </FieldLayout>
      </View>
    </View>
  );
};

export default LicensesUserForm;
