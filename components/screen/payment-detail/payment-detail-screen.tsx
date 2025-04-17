import { Feather } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import type QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardBasic from '~/components/plugins/card-basic';
import QrCodeWithCorners from '~/components/plugins/qr-code-with-concerns';
import { BookPaymentResponse } from '~/constants/models/book.model';
import { useQrCodeDownload } from '~/hooks/plugins/use-qr-code-download';
import { formatNumber } from '~/lib/format';

interface PaymentDetailScreenProps {
  paymentData: BookPaymentResponse;
  onSubmit: () => void;
}

export default function PaymentDetailScreen({ paymentData, onSubmit }: PaymentDetailScreenProps) {
  const qrRef = useRef<QRCode | null>(null);
  const { downloadQrCode } = useQrCodeDownload(qrRef);

  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <ScrollView>
        <View className="gap-8 px-2">
          <Text className=" text-2xl font-bold">Chi tiết thanh toán</Text>

          {paymentData.qrCode && paymentData.qrCode.length > 0 && (
            <View className="items-center gap-4">
              <Text className="text-lg font-semibold">Quét mã QR để thanh toán</Text>
              <View className="items-center justify-center rounded-lg bg-white">
                <QrCodeWithCorners value={paymentData.qrCode} qrRef={qrRef} />
              </View>
              <Text className="text-center text-sm text-gray-500">
                Quét mã QR bằng ứng dụng ngân hàng để thanh toán
              </Text>
            </View>
          )}
          <CardBasic className="gap-3 rounded-xl bg-gray-50 p-4">
            <View className="gap-0.5">
              <PaymentItem label="Giá cước cơ bản" value={paymentData.basePrice} />
              <PaymentItem
                label={`Phí vượt ngày (${paymentData.excessDays} ngày)`}
                value={paymentData.excessFee}
              />
              <PaymentItem label="Phí nền tảng" value={paymentData.platformFee} />
              <PaymentItem
                label="Tổng quãng đường"
                value={`${paymentData.totalDistance} km`}
                isAmount={false}
              />
            </View>
            <View className="h-[1px] bg-gray-200" />
            <PaymentItem label="Tổng thanh toán" value={paymentData.totalAmount} isTotal />
          </CardBasic>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-2 p-4">
        <Pressable
          onPress={onSubmit}
          className="flex-1 items-center justify-center rounded-lg bg-primary p-2">
          <Text className="text-center text-sm text-white">Kiểm tra thanh toán</Text>
        </Pressable>
        <Pressable
          onPress={downloadQrCode}
          className="items-center justify-center rounded-lg border border-gray-200 p-2">
          <Feather name="download" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function PaymentItem({
  label,
  value,
  isTotal = false,
  isAmount = true,
}: {
  label: string;
  value: number | string;
  isTotal?: boolean;
  isAmount?: boolean;
}) {
  return (
    <View className="flex-row justify-between">
      <Text className={`${isTotal ? 'font-bold' : ''} text-gray-700`}>{label}</Text>
      <Text className={`${isTotal ? 'font-bold' : ''} text-gray-900`}>
        {isAmount ? formatNumber(Number(value)) : value}
      </Text>
    </View>
  );
}
