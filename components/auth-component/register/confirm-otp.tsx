import React, { FunctionComponent } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';

const ConfirmOtp: FunctionComponent = () => {
  return (
    <View className="w-full flex-col items-center gap-4">
      <Text className="w-80 text-center text-foreground">
        Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn
      </Text>
      <TextInput
        placeholder="Nhập mã OTP"
        keyboardType="number-pad"
        className="w-80 rounded-lg border border-primary p-2"
      />
      <Button className="w-80">
        <Text>Xác nhận</Text>
      </Button>
    </View>
  );
};

export default ConfirmOtp;
