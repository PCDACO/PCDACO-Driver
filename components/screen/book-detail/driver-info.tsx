import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/ui/subtitle';
import { BookResponseDetail } from '~/constants/models/book.model';
import { formatPhoneNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface DriverInfoProps {
  owner: BookResponseDetail['owner'];
}

const DriverInfo: FunctionComponent<DriverInfoProps> = ({ owner }) => {
  return (
    <CardBasic className="gap-4">
      <View className="flex-row items-center gap-2">
        <Feather name="user" size={24} color={COLORS.gray} />
        <Subtitle title="Thông tin người đặt" />
      </View>
      <View className="gap-2">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-sm text-gray-500">Họ tên:</Text>
          <Text className="text-sm">{owner.name}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-sm text-gray-500">Số điện thoại:</Text>
          <Text className="text-sm">{formatPhoneNumber(owner.phone || '')}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-sm text-gray-500">Email:</Text>
          <Text className="text-sm">{owner.email}</Text>
        </View>
      </View>
    </CardBasic>
  );
};

export default DriverInfo;
