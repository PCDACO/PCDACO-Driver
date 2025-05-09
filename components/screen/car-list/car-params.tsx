'use client';

import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { type FunctionComponent, useState, useEffect } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useLocation } from '~/hooks/plugins/use-location';
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
  const { location } = useLocation();

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
  const [radius, setRadius] = useState<string>(params?.radius?.toString() || '10');
  const [isEditingRadius, setIsEditingRadius] = useState(false);

  // Reset edit state when bottom sheet opens
  useEffect(() => {
    setIsEditingRadius(false);
  }, []);

  // Xác nhận & lưu filter
  const handleConfirm = () => {
    const baseParams = {
      fuel: selectedFuel,
      transmission: selectedTransmission,
    };

    // Only include location and radius if we're editing radius
    const params = isEditingRadius
      ? {
          ...baseParams,
          latitude: location?.coords.latitude,
          longtitude: location?.coords.longitude,
          radius: Number(radius),
        }
      : baseParams;

    setParams(params);
    close();
  };

  const handleClear = () => {
    resetParams();
    close();
    setSelectedFuel(undefined);
    setSelectedTransmission(undefined);
    setRadius('10');
    setIsEditingRadius(false);
  };

  // Handle slider change
  const handleSliderChange = (value: number) => {
    setRadius(Math.round(value).toString());
  };

  return (
    <>
      <View className="px-4">
        {/* Chọn nhiên liệu */}
        <FieldLayout label="Nhiên liệu" className="mt-4">
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

        <FieldLayout label="Bán kính tìm kiếm (km)" className="mt-4">
          <View className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="place" size={20} color={COLORS.light.primary} />
                <Text className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {radius} km
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditingRadius(!isEditingRadius)}
                className={`rounded-full ${isEditingRadius ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-600'} p-2`}>
                <MaterialIcons
                  name={isEditingRadius ? 'check' : 'edit'}
                  size={18}
                  color={isEditingRadius ? '#FFFFFF' : COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            {isEditingRadius && (
              <View className="mt-4">
                <Slider
                  minimumValue={1}
                  maximumValue={100}
                  step={1}
                  value={Number(radius)}
                  onValueChange={handleSliderChange}
                  minimumTrackTintColor={COLORS.light.primary}
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor={COLORS.light.primary}
                  style={{ height: 40 }}
                />
                <View className="flex-row justify-between px-2">
                  <Text className="text-xs text-gray-500">1 km</Text>
                  <Text className="text-xs text-gray-500">100 km</Text>
                </View>
                <View className="mt-3 flex-row items-center rounded-lg border border-gray-200 bg-gray-50 px-3 dark:border-gray-600 dark:bg-gray-700">
                  <TextInput
                    value={radius}
                    onChangeText={setRadius}
                    keyboardType="numeric"
                    className="h-10 flex-1 text-base text-gray-800 dark:text-gray-200"
                    placeholder="Nhập bán kính"
                  />
                  <Text className="text-gray-500">km</Text>
                </View>
              </View>
            )}
          </View>
        </FieldLayout>
      </View>

      {/* Button xác nhận */}
      <View className="absolute bottom-4 left-0 right-0 flex-row gap-2 px-4">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-lg bg-primary p-3"
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
