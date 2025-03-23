import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { BookingStatusEnum } from '~/constants/enums';
import { translate } from '~/lib/translate';
import { useBookingParamsStore } from '~/store/use-params';

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
  const { params, setParams } = useBookingParamsStore();
  const [isPaid, setIsPaid] = useState<boolean | undefined>(params?.isPaid);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatusEnum | undefined>(
    params?.status as BookingStatusEnum | undefined
  );

  const statusList = Object.values(BookingStatusEnum);

  const handleConfirm = () => {
    setParams({ isPaid, status: selectedStatus });
    close();
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
                isActive={selectedStatus === item}
                onPress={() => setSelectedStatus(item)}
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
      <View className="absolute bottom-4 left-0 right-0 px-4">
        <TouchableOpacity
          className="items-center justify-center rounded-full bg-primary p-4"
          onPress={handleConfirm}>
          <Text className="font-semibold text-white dark:text-black">Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BookListParams;
