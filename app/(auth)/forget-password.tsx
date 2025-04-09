import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import { useForgetPasswordForm } from '~/hooks/auth/use-forget-password-form';
import { cn } from '~/lib/cn';
import { useStepStore } from '~/store/use-step';

const ForgetPassword: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { form, checkConditionOfEachStep } = useForgetPasswordForm();
  const { step } = useStepStore();

  return (
    <SafeAreaView className="h-full flex-1 items-center justify-center px-2">
      <CardBasic className="gap-4 py-10">
        <View className="items-center justify-center gap-4">
          <View
            className={cn(
              'items-center justify-center rounded-full bg-gray-100 p-4',
              step === 4 && 'bg-green-100'
            )}>
            <MaterialCommunityIcons
              name={step < 4 ? 'lock-outline' : 'check'}
              size={40}
              color={step < 4 ? 'black' : 'green'}
            />
          </View>
          <View>
            <Text className="text-center ">
              {step === 1 && 'Thay đổi mật khẩu'}
              {step === 2 && 'Nhập OTP'}
              {step === 3 && 'Nhập mật khẩu mới'}
              {step === 4 && 'Đổi mật khẩu thành công'}
            </Text>
            <Text className="text-center text-sm text-gray-400">
              {step === 1 && 'Vui lòng nhập email để xác thực tài khoản của bạn'}
              {step === 2 && 'Vui lòng nhập OTP để xác thực tài khoản của bạn'}
              {step === 3 && 'Vui lòng nhập mật khẩu mới'}
            </Text>
          </View>
        </View>
        {step === 1 && (
          <FieldLayout label="Email">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập email"
                  onChangeText={(text) => {
                    field.onChange(text);
                  }}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  leftIcon={<MaterialCommunityIcons name="email-outline" size={20} color="gray" />}
                />
              )}
            />
          </FieldLayout>
        )}

        {step === 2 && (
          <FieldLayout label="OTP">
            <Controller
              control={form.control}
              name="otp"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập OTP"
                  onChangeText={(text) => field.onChange(text)}
                  leftIcon={<MaterialCommunityIcons name="email-outline" size={20} color="gray" />}
                  keyboardType="numeric"
                  maxLength={6}
                />
              )}
            />
          </FieldLayout>
        )}

        {step === 3 && (
          <FieldLayout label="Mật khẩu mới">
            <Controller
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập mật khẩu mới"
                  onChangeText={(text) => field.onChange(text)}
                  leftIcon={<MaterialCommunityIcons name="lock-outline" size={20} color="gray" />}
                  rightIcon={
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="gray"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  secureTextEntry={!showPassword}
                />
              )}
            />
          </FieldLayout>
        )}
        <View className="gap-2">
          {step < 4 && (
            <Button size="lg" onPress={() => checkConditionOfEachStep(step)}>
              <Text>Xác nhận</Text>
            </Button>
          )}
          <Button size="lg" onPress={() => router.back()} variant="secondary">
            <Text className="text-foreground">Trở về trang đăng nhập</Text>
          </Button>
        </View>
      </CardBasic>
    </SafeAreaView>
  );
};

export default ForgetPassword;
