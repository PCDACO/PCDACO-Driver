import { ScrollView, View } from 'react-native';

import Skeleton from '~/components/ui/skeleton';

const LicenseFormSkeleton = () => {
  return (
    <ScrollView className="h-screen px-4 py-6">
      <View className="space-y-4">
        {/* Thông tin bằng lái */}
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <Skeleton className="h-12 w-full rounded-md" />

        {/* Hình ảnh bằng lái */}
        <Skeleton className="mt-6 h-5 w-1/2" />
        <Skeleton className="h-40 w-full rounded-md" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <Skeleton className="h-40 w-full rounded-md" />
      </View>
    </ScrollView>
  );
};

export default LicenseFormSkeleton;
