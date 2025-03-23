import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Description from '~/components/ui/description';
import { formatNumber } from '~/lib/format';

interface BookFooterProps {
  totalAmount: number;
  totalDistance: number;
}

const BookFooter: FunctionComponent<BookFooterProps> = ({ totalAmount, totalDistance }) => {
  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Description title="Tổng khoảng cách" className="text-sm" />
        <Description title={`${formatNumber(totalDistance)} km`} className="text-sm" />
      </View>
      <View className="flex-row items-center justify-between">
        <Description title="Tổng tiền" className="text-sm" />
        <Description title={`${formatNumber(totalAmount)} đ`} className="text-sm" />
      </View>
    </View>
  );
};

export default BookFooter;
