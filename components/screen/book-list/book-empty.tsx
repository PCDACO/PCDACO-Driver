import { FontAwesome } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '~/theme/colors';

const BookEmpty: FunctionComponent = () => {
  return (
    <View className=" items-center justify-center gap-2">
      <FontAwesome name="clipboard" size={42} color={COLORS.gray} />
      <Text className="text-center text-base font-bold text-gray-200 dark:text-gray-500">
        Hiện chưa có yêu cầu đặt xe
      </Text>
    </View>
  );
};

export default BookEmpty;
