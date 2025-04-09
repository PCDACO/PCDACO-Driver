import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import { OTPInput } from '~/components/nativewindui/OTPInput';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

interface ValidateOtpInputProps {
  form: ReturnType<typeof useAuthForm>['form'];
}

const ValidateOtpInput: FunctionComponent<ValidateOtpInputProps> = ({ form }) => {
  return (
    <View className="h-96 flex-row items-center justify-center gap-2 px-4">
      <View className="rounded-lg bg-primary px-4 py-2">
        <MaterialCommunityIcons name="email-send-outline" size={32} color="white" />
      </View>
      <View>
        <Controller
          control={form.control}
          name="otp"
          render={({ field }) => (
            <OTPInput
              value={field.value}
              onOTPChange={field.onChange}
              length={6}
              className="w-10 text-foreground"
              style={{ height: 50, paddingLeft: 15 }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ValidateOtpInput;
