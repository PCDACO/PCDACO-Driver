import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { TextWithIcon } from '~/components/layout/text-with-icon/text-icon';
import { UserPayload } from '~/constants/models/user.model';
import { useUserForm } from '~/hooks/user/use-user-form';
import { DateFormat, formatDateToString } from '~/lib/format';

interface UserFormProps {
  form: ReturnType<typeof useUserForm>['form'];
  value: UserPayload;
  isEditing: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, value, isEditing }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      form.setValue('name', value.name);
      form.setValue('email', value.email);
      form.setValue('address', value.address);
      form.setValue('dateOfBirth', new Date(value.dateOfBirth));
      form.setValue('phone', value.phone);
    }
  }, [value]);

  return (
    <View className="gap-4">
      <FieldLayout label="Họ và tên">
        {!isEditing ? (
          <TextWithIcon icon={<Feather name="user" size={20} color="gray" />} text={value.name} />
        ) : (
          <>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  placeholder="Nhập họ và tên"
                  leftIcon={<Feather name="user" size={20} color="gray" />}
                />
              )}
            />
            {form.formState.errors.name && (
              <Text className="text-red-600">{form.formState.errors.name.message}</Text>
            )}
          </>
        )}
      </FieldLayout>

      <FieldLayout label="Email">
        {!isEditing ? (
          <TextWithIcon icon={<Feather name="mail" size={20} color="gray" />} text={value.email} />
        ) : (
          <>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  placeholder="Nhập email"
                  leftIcon={<Feather name="mail" size={20} color="gray" />}
                />
              )}
            />
            {form.formState.errors.email && (
              <Text className="text-red-600">{form.formState.errors.email.message}</Text>
            )}
          </>
        )}
      </FieldLayout>
      <FieldLayout label="Số điện thoại">
        {!isEditing ? (
          <TextWithIcon icon={<Feather name="phone" size={20} color="gray" />} text={value.phone} />
        ) : (
          <>
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  placeholder="Nhập số điện thoại"
                  leftIcon={<Feather name="phone" size={20} color="gray" />}
                />
              )}
            />
            {form.formState.errors.phone && (
              <Text className="text-red-600">{form.formState.errors.phone.message}</Text>
            )}
          </>
        )}
      </FieldLayout>

      <FieldLayout label="Địa chỉ">
        {!isEditing ? (
          <TextWithIcon
            icon={<Feather name="map-pin" size={20} color="gray" />}
            text={value.address}
          />
        ) : (
          <>
            <Controller
              control={form.control}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  placeholder="Nhập địa chỉ"
                  leftIcon={<Feather name="map-pin" size={20} color="gray" />}
                />
              )}
            />
            {form.formState.errors.address && (
              <Text className="text-red-600">{form.formState.errors.address.message}</Text>
            )}
          </>
        )}
      </FieldLayout>

      <FieldLayout label="Ngày sinh">
        <TouchableOpacity onPress={() => setShowDatePicker(true)} disabled={!isEditing}>
          <View className="mt-1 flex-row items-center rounded-lg border border-muted px-2 py-3">
            <Feather name="calendar" size={20} color="gray" />
            <Controller
              control={form.control}
              name="dateOfBirth"
              render={({ field: { value } }) => (
                <Text className="ml-2 flex-1 text-foreground">
                  {value ? formatDateToString(value, DateFormat.Day) : 'Chọn ngày sinh'}
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
  );
};

export default UserForm;
