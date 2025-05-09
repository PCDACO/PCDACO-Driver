import { MaterialIcons } from '@expo/vector-icons';
import React, { FunctionComponent, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import {
  BookingReportType,
  BookingReportStatus,
  BookingReportTypeNumber,
  BookingReportStatusNumber,
} from '~/constants/enums';
import { translate } from '~/lib/translate';
import { useReportParamsStore } from '~/store/use-params';
import { COLORS } from '~/theme/colors';

interface ReportParamsProps {
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

const ReportParams: FunctionComponent<ReportParamsProps> = ({ close }) => {
  const { params, setParams, resetParams } = useReportParamsStore();

  // Convert enums to array for FlatList with translations
  const reportTypes = Object.entries(BookingReportType).map(([key, value]) => ({
    id: BookingReportTypeNumber[key as keyof typeof BookingReportTypeNumber],
    name: translate.report.type[key as keyof typeof translate.report.type],
  }));

  const reportStatuses = Object.entries(BookingReportStatus).map(([key, value]) => ({
    id: BookingReportStatusNumber[key as keyof typeof BookingReportStatusNumber],
    name: translate.report.status[key as keyof typeof translate.report.status],
  }));

  // State filter
  const [selectedType, setSelectedType] = useState<number | undefined>(params?.type);
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(params?.status);

  // Xác nhận & lưu filter
  const handleConfirm = () => {
    setParams({ type: selectedType, status: selectedStatus });
    close();
  };

  const handleClear = () => {
    resetParams();
    close();
    setSelectedType(undefined);
    setSelectedStatus(undefined);
  };

  return (
    <>
      <View className="px-4">
        {/* Chọn loại báo cáo */}
        <FieldLayout label="Loại báo cáo">
          <FlatList
            data={reportTypes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FilterItem
                label={item.name}
                isActive={selectedType === item.id}
                onPress={() => setSelectedType(item.id)}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        </FieldLayout>

        {/* Chọn trạng thái */}
        <FieldLayout label="Trạng thái" className="mt-4">
          <FlatList
            data={reportStatuses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FilterItem
                label={item.name}
                isActive={selectedStatus === item.id}
                onPress={() => setSelectedStatus(item.id)}
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

export default ReportParams;
