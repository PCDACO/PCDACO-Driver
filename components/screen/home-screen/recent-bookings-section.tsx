import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import BookBadgeStatus from '~/components/screen/book-list/book-badge-status';
import { BookResponseList } from '~/constants/models/book.model';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface RecentBookingsSectionProps {
  bookings: BookResponseList[];
}

export const RecentBookingsSection: React.FC<RecentBookingsSectionProps> = ({ bookings }) => {
  const router = useRouter();

  return (
    <View className="mb-6 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">{translate.home.recentBookings}</Text>
        <TouchableOpacity onPress={() => router.push('/booking')}>
          <Text className="text-blue-600">{translate.common.seeAll}</Text>
        </TouchableOpacity>
      </View>
      {bookings.length > 0 ? (
        <View className="gap-2">
          {bookings.map((booking) => (
            <CardBasic
              key={booking.id}
              className="rounded-lg bg-white p-4 shadow-sm"
              onPress={() =>
                router.push({
                  pathname: '/(screen)/booking/detail/[id]',
                  params: { id: booking.id },
                })
              }>
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="font-semibold text-gray-900">{booking.carName}</Text>
                  <Text className="text-gray-600">
                    {new Date(booking.startTime).toLocaleDateString()} -{' '}
                    {new Date(booking.endTime).toLocaleDateString()}
                  </Text>
                </View>
                <BookBadgeStatus status={booking.status} />
              </View>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-gray-600">
                  {translate.booking.totalAmount}: {booking.totalAmount.toLocaleString()} VND
                </Text>
                <Text className="text-gray-600">
                  {translate.booking.distance}: {booking.totalDistance} km
                </Text>
              </View>
            </CardBasic>
          ))}
        </View>
      ) : (
        <CardBasic className="items-center justify-center gap-2 rounded-lg bg-white p-6">
          <Feather name="alert-circle" size={24} color={COLORS.light.grey5} />
          <Text className="text-center font-semibold text-gray-400">
            {translate.home.noRecentBookings}
          </Text>
        </CardBasic>
      )}
    </View>
  );
};
