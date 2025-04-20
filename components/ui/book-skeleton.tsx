import { View } from 'react-native';

import Skeleton from '~/components/ui/skeleton';

const BookingDetailSkeleton = () => {
  return (
    <View className="flex-1 gap-4 bg-white">
      {/* Car Info */}
      <Skeleton height={120} borderRadius={12} />
      {/* Driver Info */}
      <Skeleton height={100} borderRadius={12} />
      {/* Booking Info */}
      <Skeleton height={160} borderRadius={12} />
      {/* Payment Info */}
      <Skeleton height={100} borderRadius={12} />
    </View>
  );
};

export default BookingDetailSkeleton;
