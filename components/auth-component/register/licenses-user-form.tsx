import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { cn } from '~/lib/cn';
import { DateFormat, formatDateToString } from '~/lib/format';
import { useApiStore } from '~/store/check-endpoint';

interface LicensesUserFormProps {
  form: ReturnType<typeof useLicenseForm>['form'];
  licenseNumber?: string;
  expirationDate?: Date;
  id?: string;
}

const LicensesUserForm: React.FC<LicensesUserFormProps> = ({
  form,
  licenseNumber,
  expirationDate,
  id,
}) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { addEndpoint, removeEndpoint } = useApiStore();
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    if (licenseNumber) {
      form.setValue('licenseNumber', licenseNumber);
    }
    if (expirationDate) {
      form.setValue('expirationDate', new Date(expirationDate));
    }
  }, [licenseNumber, expirationDate]);

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl font-bold">Thông tin giấy phép lái xe</Text>
        {id && (
          <TouchableOpacity
            onPress={() => {
              setIsEdit(!isEdit);
              if (!isEdit) {
                addEndpoint('edit-info');
              } else {
                removeEndpoint('edit-info');
              }
            }}>
            <Feather name="edit" size={24} color={isEdit ? 'blue' : 'gray'} />
          </TouchableOpacity>
        )}
      </View>
      <View className="gap-4">
        <FieldLayout label="Số seri giấy phép">
          {isEdit || !id ? (
            <Controller
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder="Nhập số giấy phép"
                  keyboardType="number-pad"
                  leftIcon={<Icon name="credit-card" size={20} color={isEdit ? 'black' : 'gray'} />}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          ) : (
            <View className="flex-row items-center gap-2 rounded-lg border border-muted px-2 py-3">
              <Icon name="credit-card" size={20} color={isEdit ? 'black' : 'gray'} />
              <Text className={cn(isEdit ? 'text-foreground' : 'text-muted')}>{licenseNumber}</Text>
            </View>
          )}
          {form.formState.errors.licenseNumber && (
            <Text className="text-sm text-destructive">
              {form.formState.errors.licenseNumber.message}
            </Text>
          )}
        </FieldLayout>

        <FieldLayout label="Ngày hết hạn">
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            disabled={!isEdit && id !== undefined}>
            <View className="flex-row items-center gap-2 rounded-lg border border-muted px-2 py-3">
              <Icon name="calendar" size={20} color={isEdit ? 'black' : 'gray'} />
              {isEdit || !id ? (
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
                        ? formatDateToString(field.value || new Date(), DateFormat.Day)
                        : 'Chọn ngày hết hạn'}
                    </Text>
                  )}
                />
              ) : (
                <Text className={cn(isEdit ? 'text-foreground' : 'text-muted')}>
                  {formatDateToString(
                    form.getValues('expirationDate') || new Date(),
                    DateFormat.Day
                  )}
                </Text>
              )}
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
