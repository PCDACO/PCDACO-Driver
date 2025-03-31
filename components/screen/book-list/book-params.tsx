import { MaterialIcons } from '@expo/vector-icons';
import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { BookingStatusEnum } from '~/constants/enums';
import { translate } from '~/lib/translate';
import { useBookingParamsStore } from '~/store/use-params';
import { COLORS } from '~/theme/colors';

interface BookListParamsProps {
  close: () => void;
}

interface StatusItemProps {
  status: BookingStatusEnum;
  isActive: boolean;
  onPress: () => void;
}

const StatusItem: FunctionComponent<StatusItemProps> = ({ status, isActive, onPress }) => {
  const statusVN = translate.booking.status[status];
  return (
    <TouchableOpacity
      className={`flex-1 items-center justify-center rounded-lg border py-2
        ${isActive ? 'border-primary bg-primary' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300'}
      `}
      onPress={onPress}>
      <Text className={`${isActive ? 'font-bold text-white dark:text-black' : 'text-black'}`}>
        {statusVN}
      </Text>
    </TouchableOpacity>
  );
};

const BookListParams: FunctionComponent<BookListParamsProps> = ({ close }) => {
  const { params, setParams, resetParams } = useBookingParamsStore();
  const [isPaid, setIsPaid] = useState<boolean | undefined>(params?.isPaid);

  // Fix lỗi kiểu dữ liệu bằng cách ép kiểu về BookingStatusEnum[]
  const [selectedStatus, setSelectedStatus] = useState<BookingStatusEnum[]>(
    params?.status
      ? Array.isArray(params.status)
        ? (params.status as BookingStatusEnum[])
        : [params.status as BookingStatusEnum]
      : []
  );

  // Ép kiểu Object.values thành BookingStatusEnum[]
  const statusList = Object.values(BookingStatusEnum) as BookingStatusEnum[];

  const toggleStatus = (status: BookingStatusEnum) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleConfirm = () => {
    setParams({ isPaid, status: selectedStatus });
    close();
  };

  const handleClear = () => {
    resetParams();
    close();
    setIsPaid(undefined);
    setSelectedStatus([]);
  };

  return (
    <>
      <View className="px-4 ">
        {/* Payment Toggle */}
        <FieldLayout label="Thanh toán">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-lg border py-2
                ${isPaid === false ? 'border-primary bg-primary' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300'}
              `}
              onPress={() => setIsPaid(false)}>
              <Text
                className={`${isPaid === false ? 'font-bold text-white dark:text-black' : 'text-black'}`}>
                Chưa thanh toán
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-lg border py-2
                ${isPaid === true ? 'border-primary bg-primary' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300'}
              `}
              onPress={() => setIsPaid(true)}>
              <Text
                className={`${isPaid === true ? 'font-bold text-white dark:text-black' : 'text-black'}`}>
                Đã thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        </FieldLayout>

        {/* Status Selector */}
        <FieldLayout label="Trạng thái" className="mt-4">
          <FlatList
            data={statusList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <StatusItem
                status={item}
                isActive={selectedStatus.includes(item)}
                onPress={() => toggleStatus(item)}
              />
            )}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        </FieldLayout>
      </View>

      {/* Confirm Button */}
      <View className="absolute bottom-4 left-0 right-0 flex-row gap-2 px-4">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-full bg-primary p-3"
          onPress={handleConfirm}>
          <Text className="font-semibold text-white dark:text-black">Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300"
          onPress={handleClear}>
          <MaterialIcons name="cleaning-services" color={COLORS.gray} size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BookListParams;
