import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoutButton from '~/components/screen/profile-screen/logout-button';
import ProfileHeader from '~/components/screen/profile-screen/profile-header';
import ProfileMenu from '~/components/screen/profile-screen/profile-menu';
import ProfileStats from '~/components/screen/profile-screen/profile-stats';
import Skeleton from '~/components/ui/skeleton';
import { useUserQuery } from '~/hooks/user/use-user';

const ProfileScreen = () => {
  const { currentUserQuery } = useUserQuery();

  const { data, isLoading } = currentUserQuery;

  if (isLoading) {
    return (
      <SafeAreaView className="gap-4 px-2">
        <Skeleton height={250} />
        <Skeleton height={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </SafeAreaView>
    );
  }

  return (
    <View className="relative h-full">
      <TouchableOpacity className="absolute left-4 top-4 z-10 p-2" onPress={() => router.back()}>
        <Feather size={20} name="arrow-left" />
      </TouchableOpacity>
      <ScrollView>
        <View
          className="gap-4"
          style={{
            paddingTop: 30,
          }}>
          <ProfileHeader
            image={data?.value.avatarUrl}
            name={data?.value.name}
            role={data?.value.role}
            user={data?.value}
          />
          <ProfileStats
            bookingsCount={data?.value.totalRented || 0}
            income={data?.value.balance || 0}
            totalCar={data?.value.totalCar || 0}
            totalRent={data?.value.totalRent || 0}
            totalRented={data?.value.totalRented || 0}
          />
          <ProfileMenu id={data?.value.id || ''} />
        </View>
        <View className="">
          <LogoutButton />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
