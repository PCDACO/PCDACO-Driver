import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

const BankEmpty: FunctionComponent = () => {
  return (
    <View className="h-40 flex-1 items-center justify-center">
      <Text>Hiện chưa có tài khoản ngân hàng</Text>
    </View>
  );
};

export default BankEmpty;
