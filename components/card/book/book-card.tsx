import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import BookBody from './book-body';
import BookFooter from './book-footer';
import BookHeader from './book-header';

import CardBasic from '~/components/plugins/card-basic';
import { BookResponseList } from '~/constants/models/book.model';
import { cn } from '~/lib/cn';

interface BookCardProps {
  booking: BookResponseList;
}

const BookCard: FunctionComponent<BookCardProps> = ({ booking }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/booking/detail/[id]',
      params: { id: booking.id },
    });
  };

  return (
    <CardBasic
      className={cn(
        'my-1 gap-2',
        booking.isPaid ? ' border-l-4 border-l-green-500' : ' border-l-4 border-l-red-500'
      )}
      onPress={handlePress}>
      <BookHeader
        carName={booking.carName || ''}
        status={booking.status || ''}
        id={booking.id || ''}
        isPaid={booking.isPaid || false}
        ownerName={booking.ownerName || ''}
        driverName={booking.driverName || ''}
      />
      <View className="h-0.5 w-full bg-gray-200" />

      <BookBody
        startTime={booking.startTime || ''}
        endTime={booking.endTime || ''}
        actualReturnTime={booking.actualReturnTime || ''}
      />

      <View className="h-0.5 w-full bg-gray-200" />
      <BookFooter
        totalAmount={booking.totalAmount || 0}
        totalDistance={booking.totalDistance || 0}
      />
    </CardBasic>
  );
};

export default BookCard;
