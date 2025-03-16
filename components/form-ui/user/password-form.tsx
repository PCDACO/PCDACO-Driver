import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { usePasswordForm } from '~/hooks/user/use-password-form';

interface PasswordFormProps {
  form: ReturnType<typeof usePasswordForm>['form'];
}

const PasswordForm: React.FC<PasswordFormProps> = ({ form }) => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <View className="gap-4">
      <FieldLayout label="Mật khẩu cũ">
        <Controller
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Mật khẩu cũ"
              secureTextEntry={!showOldPassword}
              autoCapitalize="none"
              leftIcon={<Feather name="lock" size={20} color="gray" />}
              rightIcon={
                <Feather
                  name={showOldPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                  onPress={() => setShowOldPassword(!showOldPassword)}
                />
              }
            />
          )}
        />
        {form.formState.errors.oldPassword && (
          <Text className="text-red-500">{form.formState.errors.oldPassword.message}</Text>
        )}
      </FieldLayout>

      <FieldLayout label="Mật khẩu mới">
        <Controller
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Mật khẩu mới"
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
              leftIcon={<Feather name="lock" size={20} color="gray" />}
              rightIcon={
                <Feather
                  name={showNewPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
          )}
        />
        {form.formState.errors.newPassword && (
          <Text className="text-red-500">{form.formState.errors.newPassword.message}</Text>
        )}
      </FieldLayout>

      <FieldLayout label="Xác nhận mật khẩu">
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              leftIcon={<Feather name="lock" size={20} color="gray" />}
              rightIcon={
                <Feather
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          )}
        />
        {form.formState.errors.confirmPassword && (
          <Text className="text-red-500">{form.formState.errors.confirmPassword.message}</Text>
        )}
      </FieldLayout>
    </View>
  );
};

export default PasswordForm;
