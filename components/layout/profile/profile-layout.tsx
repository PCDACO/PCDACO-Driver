import React from 'react';
import { View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Text } from '~/components/nativewindui/Text';

interface ProfileLayoutProps {
  image?: string;
  title?: string;
  subtitle?: string;
  size?: Size;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ image, title, subtitle, size }) => {
  return (
    <View className="flex-row items-center gap-4">
      <Avatar alt={title ? title : 'example'}>
        {image && <AvatarImage source={{ uri: image }} />}
        {title && (
          <AvatarFallback>
            <Text>{title.charAt(2).toUpperCase()}</Text>
          </AvatarFallback>
        )}
      </Avatar>

      <View className="gap-2">
        {title && <Text className="text-lg font-medium">{title}</Text>}
        {subtitle && <Text className="text-foreground/60 text-sm">{subtitle}</Text>}
      </View>
    </View>
  );
};

export default ProfileLayout;
