import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import BookContact from '~/components/screen/book-detail/book-contact';
import BookHeader from '~/components/screen/book-detail/book-header';
import BookInfo from '~/components/screen/book-detail/book-info';
import BookPayment from '~/components/screen/book-detail/book-payment';
import CarInfo from '~/components/screen/book-detail/car-info';
import DriverInfo from '~/components/screen/book-detail/driver-info';
import { BookingStatusEnum } from '~/constants/enums';
import { useApproveOrRejectBooking } from '~/hooks/book/use-approve-or-reject-booking';
import { useBookingDetailQuery } from '~/hooks/book/use-book';
import { useLocation } from '~/hooks/plugins/use-location';
import { COLORS } from '~/theme/colors';

const BookingScreen = () => {
  const { location } = useLocation();
  const { id } = useLocalSearchParams();
  const { data: bookingDetail, isLoading } = useBookingDetailQuery(id as string);
  const { handleApproveOrRejectBooking, handleStartTrip, handleComplete } =
    useApproveOrRejectBooking({
      id: id as string,
    });

  const bookDetail = bookingDetail?.value;

  if (isLoading || !bookingDetail) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className="relative h-full">
      <BookHeader id={id as string} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" flex-1 gap-2 p-2" style={{ paddingBottom: 100 }}>
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
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 z-20 flex-row gap-2 bg-white p-4">
        {bookDetail?.booking.status !== BookingStatusEnum.Ongoing &&
          bookDetail?.booking.status !== BookingStatusEnum.Completed &&
          bookDetail?.booking.status !== BookingStatusEnum.Cancelled && (
            <TouchableOpacity
              onPress={() => {
                handleApproveOrRejectBooking(false);
              }}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-background p-4 dark:border-gray-700">
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
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4">
              <Feather name="check-circle" size={20} color={COLORS.white} />
              <Text className="text-background">Thanh toán</Text>
            </TouchableOpacity>
          )}

        {bookDetail?.booking.status === BookingStatusEnum.ReadyForPickup &&
          bookDetail.payment.isPaid && (
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4"
              onPress={() => {
                handleStartTrip({
                  latitude: location?.coords.latitude || 0,
                  longitude: location?.coords.longitude || 0,
                });
              }}>
              <Feather name="check-circle" size={20} color={COLORS.white} />
              <Text className="text-background">Bắt đầu chuyến đi</Text>
            </TouchableOpacity>
          )}
        {bookDetail?.booking.status === BookingStatusEnum.Ongoing && bookDetail.payment.isPaid && (
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4"
            onPress={handleComplete}>
            <Feather name="check-circle" size={20} color={COLORS.white} />
            <Text className="text-background">Hoàn thành chuyến đi</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BookingScreen;
