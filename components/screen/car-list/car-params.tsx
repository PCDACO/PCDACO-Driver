import { MaterialIcons } from '@expo/vector-icons';
import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';
import { useCarParamsStore } from '~/store/use-params';
import { COLORS } from '~/theme/colors';

interface CarParamsProps {
  close: () => void;
}

interface FilterItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterItem: FunctionComponent<FilterItemProps> = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    className={`flex-1 items-center justify-center rounded-lg border py-2
      ${isActive ? 'border-primary bg-primary' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300'}
    `}
    onPress={onPress}>
    <Text className={`${isActive ? 'font-bold text-white dark:text-black' : 'text-black'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CarParams: FunctionComponent<CarParamsProps> = ({ close }) => {
  const { params, setParams, resetParams } = useCarParamsStore();

  // Fetch data từ API
  const { data: fuelData } = useFuelQuery({ params: { index: 1, size: 100 } });
  const { data: transmissionData } = useTransmissionQuery({ params: { index: 1, size: 100 } });

  // Danh sách lựa chọn
  const fuelList = fuelData?.value.items || [];
  const transmissionList = transmissionData?.value.items || [];

  // State filter
  const [selectedFuel, setSelectedFuel] = useState<string | undefined>(params?.fuel);
  const [selectedTransmission, setSelectedTransmission] = useState<string | undefined>(
    params?.transmission
  );

  // Xác nhận & lưu filter
  const handleConfirm = () => {
    setParams({ fuel: selectedFuel, transmission: selectedTransmission });
    close();
  };

  const handleClear = () => {
    resetParams();
    close();
    setSelectedFuel(undefined);
    setSelectedTransmission(undefined);
  };

  return (
    <>
      <View className="px-4">
        {/* Chọn nhiên liệu */}
        <FieldLayout label="Nhiên liệu">
          <FlatList
            data={fuelList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FilterItem
                label={item.name}
                isActive={selectedFuel === item.id}
                onPress={() => setSelectedFuel(item.id)}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        </FieldLayout>

        {/* Chọn hộp số */}
        <FieldLayout label="Hộp số" className="mt-4">
          <FlatList
            data={transmissionList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FilterItem
                label={item.name}
                isActive={selectedTransmission === item.id}
                onPress={() => setSelectedTransmission(item.id)}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        </FieldLayout>
      </View>

      {/* Button xác nhận */}
      <View className="absolute bottom-4 left-0 right-0 flex-row gap-2 px-4">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-full bg-primary p-3"
          onPress={handleConfirm}>
          <Text className="font-semibold text-white dark:text-black">Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-slate-300"
          onPress={handleClear}>
          <MaterialIcons name="cleaning-services" color={COLORS.gray} size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CarParams;
