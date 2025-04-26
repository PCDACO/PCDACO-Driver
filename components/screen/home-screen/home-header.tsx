import { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import Description from '~/components/ui/description';
import Skeleton from '~/components/ui/skeleton';
import Subtitle from '~/components/ui/subtitle';
import { UserResponse } from '~/constants/models/user.model';

interface HomeHeaderProps {
  user: Partial<UserResponse>;
}

const HomeHeaderSkeleton = () => {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
      <View className="flex-row items-center gap-2">
        <Skeleton width={48} height={48} borderRadius={24} />
        <View>
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
        </View>
      </View>
    </View>
  );
};

const HomeHeader: FunctionComponent<HomeHeaderProps> = ({ user }) => {
  if (!user) {
    return <HomeHeaderSkeleton />;
  }

  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
      <View className="flex-row items-center gap-2">
        <Avatar alt={user.name || ''}>
          <AvatarImage source={{ uri: user.avatarUrl || '' }} />
          <AvatarFallback>
            <Text>{user.name?.charAt(0) || ''}</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Subtitle title={user.name || ''} />
          <Description title={user.email || ''} />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
