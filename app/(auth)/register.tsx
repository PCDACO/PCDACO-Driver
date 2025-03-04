import { Link } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/assets/svg/logo.svg';
import ConfirmOtp from '~/components/auth-component/register/confirm-otp';
import RegisterForm from '~/components/auth-component/register/register-form';
import { Checkbox } from '~/components/layout/checkbox';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

const Register: FunctionComponent = () => {
  const [checked, setChecked] = React.useState(false);
  const { form, onSubmit, isLoading } = useAuthForm({ type: 'register' });

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-between gap-8 px-6 py-8">
            {/* Logo + Tiêu đề */}
            <View className="w-60 flex-row items-center gap-2">
              <Logo width={100} height={100} />
              <View className="gap-2">
                <Text className="w-52 text-3xl font-semibold text-foreground">
                  Chào mừng đến với FreeDriver!
                </Text>
              </View>
            </View>

            {/* Form đăng ký */}
            <View className="w-full flex-col items-center gap-4">
              {/* <RegisterForm form={form} /> */}
              <ConfirmOtp />
            </View>

            {/* Checkbox & Nút đăng ký */}
            <View className="flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Checkbox checked={checked} onCheckedChange={setChecked} />
                <Text className="w-80 text-foreground">
                  Tôi đã đọc và đồng ý với{' '}
                  <Link className="text-primary" href="/">
                    Chính sách & quy định
                  </Link>{' '}
                  và{' '}
                  <Link className="text-primary" href="/">
                    Chính sách bảo vệ dữ liệu cá nhân
                  </Link>{' '}
                  của FreeDriver
                </Text>
              </View>
              <Button onPress={onSubmit} disabled={isLoading}>
                <TextUI>Đăng ký</TextUI>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
