import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import ReportForm from '~/components/form-ui/report-form';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextNative } from '~/components/nativewindui/Text';
import Backdrop from '~/components/plugins/back-drop';
import ErrorScreen from '~/components/screen/report-edit/status/error-screen';
import LoadingScreen from '~/components/screen/report-edit/status/loading-screen';
import SuccessScreen from '~/components/screen/report-edit/status/success-screen';
import { BookingReportTypeNumber } from '~/constants/enums';
import { useReportForm } from '~/hooks/report/use-report-form';
import { COLORS } from '~/theme/colors';

const ReportScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '55%'], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  const { form, isLoading, isSuccess, isError, onSubmit } = useReportForm({ id: id as string });

  const reportTypes = [
    { value: BookingReportTypeNumber.Conflict, label: 'Xung đột' },
    { value: BookingReportTypeNumber.Accident, label: 'Tai nạn' },
    { value: BookingReportTypeNumber.FineNotice, label: 'Thông báo phạt' },
    { value: BookingReportTypeNumber.Damage, label: 'Hư hỏng' },
    { value: BookingReportTypeNumber.Maintenance, label: 'Bảo trì' },
    { value: BookingReportTypeNumber.Other, label: 'Khác' },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen id={id as string} />;
  }

  if (isSuccess) {
    return <SuccessScreen id={id as string} />;
  }

  return (
    <View className="h-full flex-1">
      <View className="mt-4 px-2">
        <ReportForm
          form={form}
          onOpenReportTypeSheet={() => handleSnapPress(1)}
          reportTypes={reportTypes}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 z-10 bg-white p-4 dark:bg-slate-300">
        <Button onPress={onSubmit}>
          <Feather name="check-circle" size={20} color={COLORS.white} />
          <TextNative>Gửi báo cáo</TextNative>
        </Button>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold">Chọn loại báo cáo</Text>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                className="border-b border-gray-200 py-3 dark:border-gray-700"
                onPress={() => {
                  form.setValue('reportType', type.value);
                  handleClosePress();
                }}>
                <Text className="text-foreground">{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ReportScreen;
