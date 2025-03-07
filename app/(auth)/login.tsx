import Icon from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/assets/svg/logo.svg';
import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

const Login: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { form, onSubmit, isLoading } = useAuthForm({ type: 'login' });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between gap-8 px-6 py-10">
        {/* Header */}
        <View className="w-60 flex-row items-center gap-2">
          <Logo width={100} height={100} />
          <Text className="text-3xl font-semibold text-foreground">Chào mừng đã quay trở lại!</Text>
        </View>

        {/* Form */}
        <View className="flex-col gap-4">
          <FieldLayout label="Số điện thoại">
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập số điện thoại"
                  leftIcon={<Icon name="phone" size={20} color="gray" />}
                  textContentType="telephoneNumber"
                  keyboardType="numeric"
                  onChangeText={field.onChange}
                />
              )}
            />
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
              <TextUI variant="caption1" color="quarternary">
                {form.formState.errors.password.message}
              </TextUI>
            )}
          </FieldLayout>

          <Text className="text-foreground/60 text-right font-semibold">Quên mật khẩu?</Text>

          <View className="mt-4 gap-4">
            <Button onPress={onSubmit} disabled={isLoading}>
              <TextUI>{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</TextUI>
            </Button>
            <Button variant="plain">
              <Link href="/register">
                <TextUI>Đăng kí tài khoản</TextUI>
              </Link>
            </Button>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-center">
          <View className="w-80">
            <Text className="text-center text-muted">
              Để đảm bảo quyền lợi của bạn, xin vui lòng xem kỹ{' '}
              <Link className="text-primary" href="/">
                chính sách của chúng tôi
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
