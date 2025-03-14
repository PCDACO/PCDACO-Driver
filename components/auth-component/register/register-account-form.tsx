import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

interface RegisterAccountFormProps {
  form: ReturnType<typeof useAuthForm>['form'];
}

const RegisterAccountForm: React.FC<RegisterAccountFormProps> = ({ form }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View>
      <TextUI variant="largeTitle" color="secondary">
        Thông tin tài khoản
      </TextUI>

      <View className="mt-4 gap-2">
        <FieldLayout label="Email">
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập email"
                leftIcon={<Icon name="mail" size={20} color="gray" />}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={field.onChange}
              />
            )}
          />
          {form.formState.errors.email && (
            <Text className="text-red-600">{form.formState.errors.email.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Mật khẩu">
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập mật khẩu"
                leftIcon={<Icon name="lock" size={20} color="gray" />}
                rightIcon={
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="gray"
                    onPress={() => setShowPassword((prev) => !prev)}
                  />
                }
                secureTextEntry={!showPassword}
                onChangeText={field.onChange}
              />
            )}
          />
          {form.formState.errors.password && (
            <Text className="text-red-600">{form.formState.errors.password.message}</Text>
          )}
        </FieldLayout>
      </View>
    </View>
  );
};

export default RegisterAccountForm;
