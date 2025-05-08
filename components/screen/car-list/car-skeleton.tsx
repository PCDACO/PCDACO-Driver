import { View } from 'react-native';

import Skeleton from '~/components/ui/skeleton';

const CarSkeleton = () => {
  return (
    <View className="flex-1 gap-2">
      {/* Search bar skeleton */}
      <View className="flex-row gap-2">
        <Skeleton height={40} className="flex-1" />
      </View>

      {/* Car list skeletons */}
      {[1, 2, 3, 4].map((item) => (
        <View key={item} className="rounded-lg bg-white p-4 dark:bg-slate-300">
          {/* Car image skeleton */}
          <Skeleton height={200} borderRadius={12} className="mb-4" />

          {/* Car details skeletons */}
          <View className="gap-2">
            <Skeleton height={24} width="70%" />
            <Skeleton height={20} width="50%" />
            <View className="mt-2 flex-row gap-2">
              <Skeleton height={32} width={80} />
              <Skeleton height={32} width={80} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CarSkeleton;
