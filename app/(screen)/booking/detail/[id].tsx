import { Feather, FontAwesome5 } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import {
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import BookContact from '~/components/screen/book-detail/book-contact';
import BookHeader from '~/components/screen/book-detail/book-header';
import BookInfo from '~/components/screen/book-detail/book-info';
import BookPayment from '~/components/screen/book-detail/book-payment';
import CarInfo from '~/components/screen/book-detail/car-info';
import DriverInfo from '~/components/screen/book-detail/driver-info';
import FeedbackCard from '~/components/screen/book-detail/feedback';
import { BookingStatusEnum } from '~/constants/enums';
import { useApproveOrRejectBooking } from '~/hooks/book/use-approve-or-reject-booking';
import { useBookingDetailQuery } from '~/hooks/book/use-book';
import { useBottomSheet } from '~/hooks/plugins/use-bottom-sheet';
import { COLORS } from '~/theme/colors';

const BookingScreen = () => {
  const { id } = useLocalSearchParams();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { data: bookingDetail, isLoading, refetch } = useBookingDetailQuery(id as string);
  const { handleApproveOrRejectBooking, handleComplete } = useApproveOrRejectBooking({
    id: id as string,
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const snapPoints = React.useMemo(() => ['1%', '10%'], []);
  const { sheetRef, isSheetOpen, handleSnapPress, handleSheetChange, handleClosePress } =
    useBottomSheet({ snapPoints });

  const bookDetail = bookingDetail?.value;

  if (isLoading || !bookingDetail) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      enabled>
      <View className="relative h-full">
        <BookHeader onPress={() => handleSnapPress(1)} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'android' ? 300 : 100,
          }}
          keyboardDismissMode="on-drag">
          <View className="flex-1 gap-2 p-2">
            <CarInfo
              car={
                bookDetail?.car || {
                  id: '',
                  modelName: '',
                  licensePlate: '',
                  color: '',
                  seat: 0,
                  transmissionType: '',
                  fuelType: '',
                  carImageUrl: [],
                }
              }
            />
            <DriverInfo
              owner={
                bookDetail?.owner || {
                  email: '',
                  id: '',
                  name: '',
                  phone: '',
                  avatarUrl: '',
                }
              }
            />
            <BookInfo
              booking={
                bookDetail?.booking || {
                  startTime: new Date(),
                  endTime: new Date(),
                  note: '',
                  status: '',
                  totalDistance: 0,
                  actualReturnTime: new Date(),
                  isRefund: false,
                  refundDate: new Date(),
                  refundAmount: 0,
                  preInspectionPhotos: {
                    carKey: [],
                    exteriorCar: [],
                    fuelGauge: [],
                    parkingLocation: [],
                    trunkSpace: [],
                  },
                  postInspectionPhotos: {
                    fuelGaugeFinal: [],
                    cleanliness: [],
                    scratches: [],
                    tollFees: [],
                  },
                }
              }
            />
            <BookPayment
              payment={
                bookDetail?.payment || {
                  basePrice: 0,
                  platformFee: 0,
                  excessDay: 0,
                  excessDayFee: 0,
                  totalAmount: 0,
                  isPaid: false,
                }
              }
            />

            <BookContact id={bookDetail?.id || ''} />

            {(bookDetail?.booking.status === BookingStatusEnum.Done ||
              bookDetail?.booking.status === BookingStatusEnum.Completed) && (
              <FeedbackCard id={bookDetail?.id || ''} feedback={bookDetail?.feedbacks} />
            )}
          </View>
        </ScrollView>

        {/* Button Action */}
        <View className="z-1 absolute bottom-0 left-0 right-0 flex-row gap-2 bg-white p-4">
          {bookDetail?.booking.status !== BookingStatusEnum.Ongoing &&
            bookDetail?.booking.status !== BookingStatusEnum.Completed &&
            bookDetail?.booking.status !== BookingStatusEnum.Cancelled &&
            bookDetail?.booking.status !== BookingStatusEnum.Done && (
              <TouchableOpacity
                onPress={() => {
                  handleApproveOrRejectBooking(false);
                }}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-background p-2 dark:border-gray-700">
                <Feather name="x-circle" size={20} color={COLORS.black} />
                <Text className="text-foreground">Hủy bỏ đặt xe</Text>
              </TouchableOpacity>
            )}

          {(bookDetail?.booking.status === BookingStatusEnum.Approved ||
            bookDetail?.booking.status === BookingStatusEnum.ReadyForPickup) &&
            !bookDetail.payment.isPaid && (
              <TouchableOpacity
                onPress={() => {
                  handleApproveOrRejectBooking(true);
                }}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2">
                <Feather name="check-circle" size={20} color={COLORS.white} />
                <Text className="text-background">Thanh toán</Text>
              </TouchableOpacity>
            )}

          {bookDetail?.booking.status === BookingStatusEnum.ReadyForPickup &&
            bookDetail.payment.isPaid && (
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2"
                onPress={() => {
                  router.push({
                    pathname: '/(screen)/(signature)/book/[id]',
                    params: { id: id as string },
                  });
                }}>
                <Feather name="check-circle" size={20} color={COLORS.white} />
                <Text className="text-background">Bắt đầu chuyến đi</Text>
              </TouchableOpacity>
            )}

          {bookDetail?.booking.status === BookingStatusEnum.Ongoing &&
            bookDetail.payment.isPaid && (
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2"
                onPress={handleComplete}>
                <Feather name="check-circle" size={20} color={COLORS.white} />
                <Text className="text-background">Hoàn thành chuyến đi</Text>
              </TouchableOpacity>
            )}
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backdropComponent={
            isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
          }
          onChange={handleSheetChange}>
          <BottomSheetView className="relative z-30 flex-1 bg-white dark:bg-slate-300">
            <View className="gap-2 px-4">
              <View className="flex-row items-center justify-center gap-2">
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: '/booking/inspection/view',
                      params: { id: id as string },
                    });
                  }}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                  <FontAwesome5 name="car" size={20} color={COLORS.black} />
                  <Text className="text-foreground">Trạng thái xe</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: '/booking/report/[id]',
                      params: { id: id as string },
                    });
                  }}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-foreground p-2 dark:border-gray-700">
                  <FontAwesome5 name="flag" size={20} color={COLORS.white} />
                  <Text className="text-background">Báo cáo</Text>
                </Pressable>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookingScreen;
