import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { UserResponse } from '~/constants/models/user.model';
import { useUserMutation } from '~/hooks/user/use-user';

interface ProfileHeaderProps {
  image?: string;
  name?: string;
  role?: string;
  user?: UserResponse;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ image, name, role, user }) => {
  const { updateUserAvatarMutation } = useUserMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>(image);

  const handleUpdateAvatar = async () => {
    const avatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (avatar.canceled) return;

    if (!user?.id || !avatar.assets[0].uri) return;

    const newImage = {
      uri: avatar.assets[0].uri,
      name: avatar.assets[0].fileName,
      type: avatar.assets[0].mimeType,
    } as unknown as File;

    setAvatar(avatar.assets[0].uri);
    updateUserAvatarMutation.mutate({ id: user?.id, avatar: newImage });
  };

  return (
    <View className="px-4 ">
      <View className="items-center">
        <View className="relative mb-2">
          {avatar || avatar === '' ? (
            <Avatar
              alt="avatar"
              className="h-24 w-24 rounded-full border-4"
              accessibilityLabel="Profile">
              <AvatarImage source={{ uri: avatar }} />
              <AvatarFallback>
                <TextUI className="text-4xl">{name?.charAt(0).toLocaleUpperCase()}</TextUI>
              </AvatarFallback>
            </Avatar>
          ) : (
            <View className="h-24 w-24 rounded-full border-4">
              <TextUI className="text-4xl">{name?.charAt(0).toLocaleUpperCase()}</TextUI>
            </View>
          )}
          <TouchableOpacity
            className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-sm"
            onPress={handleUpdateAvatar}>
            <Feather size={20} name="camera" />
          </TouchableOpacity>
        </View>

        <View className="items-center gap-0.5">
          {name && <Text className="text-xl font-bold text-gray-900">{name}</Text>}
          {role && (
            <View className="flex-row items-center gap-2">
              <Feather size={20} name="user" color="#8E8E93" />
              <Text className="text-base text-muted">Tài xế</Text>
            </View>
          )}
          <Text className="mt-2 italic text-gray-500">"Chọn xe chuẩn, hành trình trọn vẹn"</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
