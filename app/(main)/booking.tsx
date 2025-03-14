import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import Loading from '~/components/plugins/loading';
import { useBookingListQuery } from '~/hooks/book/use-book';

const BookingScreen: FunctionComponent = () => {
  const { data, isLoading } = useBookingListQuery({ limit: 10 });

  console.log('data', data);

  if (isLoading) {
    return (
      <View className="h-screen">
        <Loading />
      </View>
    );
  }

  return (
    <View>
      <Text>Booking</Text>
    </View>
  );
};

export default BookingScreen;
