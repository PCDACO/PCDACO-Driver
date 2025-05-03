import Icon from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

interface RegisterInfoFormProps {
  form: ReturnType<typeof useAuthForm>['form'];
}

const RegisterInfoForm: React.FC<RegisterInfoFormProps> = ({ form }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  return (
    <View className="w-full px-4">
      <TextUI variant="largeTitle" color="secondary">
        Thông tin cá nhân
      </TextUI>

      <View className="mt-4  gap-2">
        <FieldLayout label="Họ và tên">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập họ và tên"
                leftIcon={<Icon name="user" size={20} color="gray" />}
                onChangeText={field.onChange}
              />
            )}
          />
          {form.formState.errors.name && (
            <Text className="text-red-600">{form.formState.errors.name.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Số điện thoại">
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập số điện thoại"
                onChangeText={field.onChange}
                leftIcon={<Icon name="phone" size={20} color="gray" />}
              />
            )}
          />
          {form.formState.errors.phone && (
            <Text className="text-red-600">{form.formState.errors.phone.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Địa chỉ">
          <Controller
            control={form.control}
            name="address"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập địa chỉ"
                onChangeText={field.onChange}
                leftIcon={<Icon name="map-pin" size={20} color="gray" />}
              />
            )}
          />
          {form.formState.errors.address && (
            <Text className="text-red-600">{form.formState.errors.address.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Ngày sinh">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View className="mt-1 flex-row items-center rounded-lg border border-muted px-2 py-3">
              <Icon name="calendar" size={20} color="gray" />
              <Controller
                control={form.control}
                name="dateOfBirth"
                render={({ field: { value } }) => (
                  <Text className="ml-2 flex-1 text-foreground">
                    {value ? new Date(value).toLocaleDateString() : 'Chọn ngày sinh'}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={form.getValues('dateOfBirth') || new Date()}
              mode="date"
              maximumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) form.setValue('dateOfBirth', date);
              }}
            />
          )}
          {form.formState.errors.dateOfBirth && (
            <Text className="text-red-600">{form.formState.errors.dateOfBirth.message}</Text>
          )}
        </FieldLayout>
      </View>
    </View>
  );
};

export default RegisterInfoForm;
