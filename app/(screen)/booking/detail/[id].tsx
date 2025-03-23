import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { useBookingDetailQuery } from '~/hooks/book/use-book';

const BookingDetail: FunctionComponent = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: booking, isLoading } = useBookingDetailQuery(id as string);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Booking Detail {id}</Text>
    </View>
  );
};

export default BookingDetail;
