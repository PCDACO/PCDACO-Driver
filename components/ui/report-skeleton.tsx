import { View } from 'react-native';

import Skeleton from '~/components/ui/skeleton';

const ReportSkeleton = () => {
  return (
    <View className="flex-1 gap-4 bg-white p-4">
      {/* Report Header */}
      <View className="flex-row items-center justify-between">
        <Skeleton width={120} height={24} borderRadius={12} />
        <Skeleton width={80} height={24} borderRadius={12} />
      </View>
      {/* Report Content */}
      <Skeleton height={80} borderRadius={12} />
      {/* Report Footer */}
      <View className="flex-row items-center justify-between">
        <Skeleton width={100} height={20} borderRadius={8} />
        <Skeleton width={60} height={20} borderRadius={8} />
      </View>
    </View>
  );
};

export default ReportSkeleton;
