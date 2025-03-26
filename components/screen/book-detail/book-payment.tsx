import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/ui/subtitle';
import { BookResponseDetail } from '~/constants/models/book.model';
import { cn } from '~/lib/cn';
import { formatNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface BookPaymentProps {
  payment: BookResponseDetail['payment'];
}

const BookPayment: FunctionComponent<BookPaymentProps> = ({ payment }) => {
  return (
    <CardBasic className="gap-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="wallet-outline" size={24} color={COLORS.gray} />
        <View className="flex-row items-center gap-2">
          <Subtitle title="Đơn giá thanh toán" />
          <Text>-</Text>
          <View
            className={cn(
              'rounded-full px-2 py-1',
              payment.isPaid ? 'bg-green-500' : 'bg-red-500'
            )}>
            <Text className="text-background">
              {payment.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Text>
          </View>
        </View>
      </View>

      <View className="gap-2">
        <View className="gap-1">
          <View className="flex-row justify-between gap-2">
            <Text className="text-base ">Tiền thuê:</Text>
            <Text className="text-base font-bold">{formatNumber(payment.basePrice)} VND</Text>
          </View>
          <View className="flex-row justify-between gap-2">
            <Text className="text-base ">Tiền đặt cọc:</Text>
            <Text className="text-base font-bold">{formatNumber(payment.platformFee)} VND</Text>
          </View>
        </View>

        <View className="h-0.5 bg-slate-200" />
        <View className="flex-row justify-between gap-2">
          <Text className="text-base ">Tổng số tiền:</Text>
          <Text className="text-base font-bold">{formatNumber(payment.totalAmount)} VND</Text>
        </View>
      </View>
    </CardBasic>
  );
};

export default BookPayment;
